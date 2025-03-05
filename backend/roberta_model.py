import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Download necessary NLTK resources
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('omw-1.4')

# Set paths for loading the model and tokenizer
model_save_path = 'backend/saved_roberta_model'
tokenizer = RobertaTokenizer.from_pretrained(model_save_path)
model = RobertaForSequenceClassification.from_pretrained(model_save_path)
model.eval()

# Set the device to GPU if available, otherwise CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Initialize the NLTK stemmer and lemmatizer
stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

# Preprocess the essay
def preprocess_and_augment(text):
    # Expand common contractions
    contractions_dict = {"can't": "cannot", "won't": "will not", "n't": " not"}
    for contraction, full_form in contractions_dict.items():
        text = re.sub(contraction, full_form, text)

    # Lowercase the text
    text = text.lower()

    # Remove URLs, HTML tags, and non-alphabetic characters
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Tokenize the text (using the correct tokenizer)
    tokens = word_tokenize(text)

    # Remove stopwords
    tokens = [word for word in tokens if word not in stopwords.words('english')]

    # Lemmatize the tokens
    lemmatized_tokens = [lemmatizer.lemmatize(word) for word in tokens]

    # Stem the lemmatized tokens
    stemmed_text = ' '.join([stemmer.stem(word) for word in lemmatized_tokens])

    return stemmed_text

# Tokenize the essay for the model
def tokenize_essay(essay):
    inputs = tokenizer(essay, padding=True, truncation=True, max_length=256, return_tensors="pt")
    return inputs.to(device)

# Predict the score of the essay
def predict_score(essay):
    # Preprocess the essay
    processed_essay = preprocess_and_augment(essay)

    # Tokenize the processed essay
    inputs = tokenize_essay(processed_essay)

    # Get model predictions
    with torch.no_grad():
        outputs = model(**inputs)

    # Get the predicted score (adjusting for score scale 1-6)
    prediction = torch.argmax(outputs.logits, dim=1).item() + 1  # Adjust for score scale starting at 1

    # Ensure the prediction is within the valid range [1, 6]
    return min(max(prediction, 1), 6)

# Main entry point to predict an example essay
if __name__ == "__main__":
    new_essay = """The face on Mars is just a natural landform. It was not created by aliens. If it was created by aliens, Then the discovery would benefit NASA. I can help you to understand why it is just a landform and not an alien artifact.

    The face was just another Martian mesa, common enough around Cydonia, only this one had unusual shadows to make it look like a face. Eighteen years after the face was discovered, we sent Michael Malin and his Mars Orbiter camera team to take a picture ten times sharper of the face. In the picture, It was revealed that it was just a natural landform. There was no alien monument after all. Later, there was a second picture taken up close even more than before. There were no signs of alien existence around the landform.

    After looking at all the pictures taken and research found, we can conclude that there was no alien monument to begin with. Like I said, it was just another natural landform. Has you understanding about the face changed."""

    # Predict the score for the new essay
    predicted_score = predict_score(new_essay)
    print(f"The predicted score for the essay is: {predicted_score}")
