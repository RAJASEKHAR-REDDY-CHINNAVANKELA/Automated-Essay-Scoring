from flask import Flask, request, jsonify, Response
import os
from flask_cors import CORS
from roberta_model import predict_score
import openai
import logging
import pyttsx3

app = Flask(__name__)
CORS(app)


openai.api_key = """"your-openai-key"""


logging.basicConfig(level=logging.DEBUG)

def generate_feedback(essay, score, essay_type="source_based"):
    logging.debug("Starting feedback generation...")
    rubric_source_based = """
    Holistic Rating for Source-Based Writing

    SCORE OF 6: An essay in this category demonstrates clear and consistent mastery, although it may have a few minor errors. A typical essay effectively and insightfully develops a point of view on the issue and demonstrates outstanding critical thinking; the essay uses clearly appropriate examples, reasons, and other evidence taken from the source text(s) to support its position; the essay is well organized and clearly focused, demonstrating clear coherence and smooth progression of ideas; the essay exhibits skillful use of language, using a varied, accurate, and apt vocabulary and demonstrates meaningful variety in sentence structure; the essay is free of most errors in grammar, usage, and mechanics.

    SCORE OF 5: An essay in this category demonstrates reasonably consistent mastery, although it will have occasional errors or lapses in quality. A typical essay effectively develops a point of view on the issue and demonstrates strong critical thinking; the essay generally uses appropriate examples, reasons, and other evidence taken from the source text(s) to support its position; the essay is well organized and focused, demonstrating coherence and progression of ideas; the essay exhibits facility in the use of language, using appropriate vocabulary and demonstrates variety in sentence structure; the essay is generally free of most errors in grammar, usage, and mechanics.

    SCORE OF 4: An essay in this category demonstrates adequate mastery, although it will have lapses in quality. A typical essay develops a point of view on the issue and demonstrates competent critical thinking; the essay generally uses adequate examples, reasons, and other evidence taken from the source text(s) to support its position; the essay is generally organized and focused, demonstrating some coherence and progression of ideas; the essay may demonstrate inconsistent facility in the use of language, using generally appropriate vocabulary and demonstrates some variety in sentence structure; the essay may have some errors in grammar, usage, and mechanics.

    SCORE OF 3: An essay in this category demonstrates developing mastery and is marked by ONE OR MORE of the following weaknesses: develops a point of view on the issue, demonstrating some critical thinking, but may do so inconsistently or use inadequate examples, reasons, or other evidence taken from the source text(s) to support its position; the essay is limited in its organization or focus, or may demonstrate some lapses in coherence or progression of ideas; the essay may demonstrate facility in the use of language, but sometimes uses weak vocabulary or inappropriate word choice and/or lacks variety or demonstrates problems in sentence structure; the essay may contain an accumulation of errors in grammar, usage, and mechanics.

    SCORE OF 2: An essay in this category demonstrates little mastery and is flawed by ONE OR MORE of the following weaknesses: develops a point of view on the issue that is vague or seriously limited, and demonstrates weak critical thinking; the essay provides inappropriate or insufficient examples, reasons, or other evidence taken from the source text to support its position; the essay is poorly organized and/or focused, or demonstrates serious problems with coherence or progression of ideas; the essay displays very little facility in the use of language, using very limited vocabulary or incorrect word choice and/or demonstrates frequent problems in sentence structure; the essay contains errors in grammar, usage, and mechanics so serious that meaning is somewhat obscured.

    SCORE OF 1: An essay in this category demonstrates very little or no mastery and is severely flawed by ONE OR MORE of the following weaknesses: develops no viable point of view on the issue, or provides little or no evidence to support its position; the essay is disorganized or unfocused, resulting in a disjointed or incoherent essay; the essay displays fundamental errors in vocabulary and/or demonstrates severe flaws in sentence structure; the essay contains pervasive errors in grammar, usage, or mechanics that persistently interfere with meaning.
    """
    rubric_independent_writing = """
    Holistic Rating for Independent Writing

    SCORE OF 6: An essay in this category demonstrates clear and consistent mastery, although it may have a few minor errors. A typical essay effectively and insightfully develops a point of view on the issue and demonstrates outstanding critical thinking, using clearly appropriate examples, reasons, and other evidence to support its position; the essay is well organized and clearly focused, demonstrating clear coherence and smooth progression of ideas; the essay exhibits skillful use of language, using a varied, accurate, and apt vocabulary and demonstrates meaningful variety in sentence structure; the essay is free of most errors in grammar, usage, and mechanics.

    SCORE OF 5: An essay in this category demonstrates reasonably consistent mastery, although it will have occasional errors or lapses in quality. A typical essay effectively develops a point of view on the issue and demonstrates strong critical thinking, generally using appropriate examples, reasons, and other evidence to support its position; the essay is well organized and focused, demonstrating coherence and progression of ideas; the essay exhibits facility in the use of language, using appropriate vocabulary, and demonstrates variety in sentence structure; the essay is generally free of most errors in grammar, usage, and mechanics.

    SCORE OF 4: An essay in this category demonstrates adequate mastery, although it will have lapses in quality. A typical essay develops a point of view on the issue and demonstrates competent critical thinking; the essay uses adequate examples, reasons, and other evidence to support its position; the essay is generally organized and focused, demonstrating some coherence and progression of ideas; the essay may demonstrate inconsistent facility in the use of language, using generally appropriate vocabulary and demonstrates some variety in sentence structure; the essay may have some errors in grammar, usage, and mechanics.

    SCORE OF 3: An essay in this category demonstrates developing mastery and is marked by ONE OR MORE of the following weaknesses: develops a point of view on the issue, demonstrating some critical thinking, but may do so inconsistently or use inadequate examples, reasons, or other evidence to support its position; the essay is limited in its organization or focus, or may demonstrate some lapses in coherence or progression of ideas; the essay may demonstrate facility in the use of language, but sometimes uses weak vocabulary or inappropriate word choice and/or lacks variety or demonstrates problems in sentence structure; the essay may contain an accumulation of errors in grammar, usage, and mechanics.

    SCORE OF 2: An essay in this category demonstrates little mastery and is flawed by ONE OR MORE of the following weaknesses: develops a point of view on the issue that is vague or seriously limited, and demonstrates weak critical thinking; the essay provides inappropriate or insufficient examples, reasons, or other evidence to support its position; the essay is poorly organized and/or focused, or demonstrates serious problems with coherence or progression of ideas; the essay displays very little facility in the use of language, using very limited vocabulary or incorrect word choice and/or demonstrates frequent problems in sentence structure; the essay contains errors in grammar, usage, and mechanics so serious that meaning is somewhat obscured.

    SCORE OF 1: An essay in this category demonstrates very little or no mastery and is severely flawed by ONE OR MORE of the following weaknesses: develops no viable point of view on the issue, or provides little or no evidence to support its position; the essay is disorganized or unfocused, resulting in a disjointed or incoherent essay; the essay displays fundamental errors in vocabulary and/or demonstrates severe flaws in sentence structure; the essay contains pervasive errors in grammar, usage, or mechanics that persistently interfere with meaning.
    """
    if essay_type == "source_based":
        rubric = rubric_source_based
    else:
        rubric = rubric_independent_writing
    prompt = f"The following essay has been scored as a {score} out of 6 based on the provided rubric. Please provide feedback that aligns with this score and highlight specific mistakes directly within the essay text:\n\n{essay}\n\nRubric:\n{rubric}\n\nFeedback (include highlights of specific mistakes):"

    logging.debug("Prompt for OpenAI:\n%s", prompt)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert in evaluating essays."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=4000
    )
    feedback = response['choices'][0]['message']['content'].strip()
    logging.debug("Generated feedback: %s", feedback)
    return feedback


def init_engine():
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)  # Use a specific voice
    engine.setProperty('rate', 150)  # Set speech rate
    return engine


@app.route('/text_to_speech', methods=['POST'])
def text_to_speech():
    data = request.json
    feedback = data.get('feedback')

    if not feedback:
        return jsonify({'error': 'No feedback provided'}), 400

    try:
        engine = init_engine()  # Initialize with custom settings
        audio_file = 'feedback_audio.mp3'
        engine.save_to_file(feedback, audio_file)
        engine.runAndWait()

        return jsonify({'message': 'Audio feedback generated successfully.', 'audio_file': audio_file})
    except Exception as e:
        logging.error(f"Error in /text_to_speech: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/get_audio_feedback', methods=['GET'])
def get_audio_feedback():
    try:
        def generate():
            with open('feedback_audio.mp3', 'rb') as audio_file:
                data = audio_file.read(1024)
                while data:
                    yield data
                    data = audio_file.read(1024)

        return Response(generate(), mimetype="audio/mpeg")
    except Exception as e:
        logging.error(f"Error in /get_audio_feedback: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/submit_essay', methods=['POST'])
def submit_essay():
    data = request.json
    content = data.get('content')
    essay_type = data.get('essay_type', 'source_based')  # Default to 'source_based' if not provided

    logging.debug("Received essay content: %s", content)
    logging.debug("Essay type: %s", essay_type)

    if not content:
        return jsonify({'error': 'No content provided'}), 400

    try:
        # Use the RoBERTa model to predict the score
        score = predict_score(content)
        logging.debug("Predicted score: %s", score)

        # Generate feedback using the appropriate rubric
        feedback = generate_feedback(content, score, essay_type)
        logging.debug("Generated feedback: %s", feedback)

        # Define a custom message
        message = "Essay submitted successfully. Here is your score and feedback."
        logging.debug("Feedback generation complete")

        return jsonify({
            'message': message,
            'score': score,
            'feedback': feedback
        })
    except Exception as e:
        logging.error(f"Error in /submit_essay: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)