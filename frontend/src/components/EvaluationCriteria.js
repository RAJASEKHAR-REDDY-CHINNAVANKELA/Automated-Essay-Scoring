import React from 'react';

const EvaluationCriteria = () => {
  return (
    <div className="min-h-screen bg-[#f4c28e] text-gray-800 flex flex-col">
      <nav className="bg-gradient-to-r from-red-600 via-orange-500 to-red-700 shadow-xl rounded-lg m-8 p-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="flex items-center py-2 px-2 text-white">
                <span className="font-bold text-2xl">AES System</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1 ml-auto">
              <a href="/" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Home</a>
              <a href="/signup" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Sign Up</a>
              <a href="/signin" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Sign In</a>
              <a href="#/essay-submission" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Submit Essay</a>
              <a href="/evaluation-criteria" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Evaluation Criteria</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-extrabold mb-6">Evaluation Criteria</h1>

          {/* Holistic Rating for Source-Based Writing */}
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Holistic Rating for Source-Based Writing</h2>
            <h3 className="text-xl font-bold mb-2">Score of 6</h3>
            <p className="mb-4">
              An essay in this category demonstrates clear and consistent mastery, although it may have a few minor errors.
              A typical essay effectively and insightfully develops a point of view on the issue and demonstrates outstanding
              critical thinking; the essay uses clearly appropriate examples, reasons, and other evidence taken from the source text(s)
              to support its position; the essay is well organized and clearly focused, demonstrating clear coherence and smooth progression of ideas;
              the essay exhibits skillful use of language, using a varied, accurate, and apt vocabulary and demonstrates meaningful variety in sentence structure;
              the essay is free of most errors in grammar, usage, and mechanics.
            </p>
            <h3 className="text-xl font-bold mb-2">Score of 5</h3>
            <p className="mb-4">
              An essay in this category demonstrates reasonably consistent mastery, although it will have
              occasional errors or lapses in quality. A typical essay effectively develops a point of view on the issue and
              demonstrates strong critical thinking; the essay generally uses appropriate examples, reasons, and other
              evidence taken from the source text(s) to support its position; the essay is well organized and focused,
              demonstrating coherence and progression of ideas; the essay exhibits facility in the use of language, using
              appropriate vocabulary and demonstrates variety in sentence structure; the essay is generally free of most errors in
              grammar, usage, and mechanics.
            </p>
            <h3 className="text-xl font-bold mb-2">Score of 4</h3>
            <p className="mb-4">
              An essay in this category demonstrates adequate mastery, although it will have lapses in
              quality. A typical essay develops a point of view on the issue and demonstrates competent critical thinking;
              the essay uses adequate examples, reasons, and other evidence taken from the source text(s) to support its
              position; the essay is generally organized and focused, demonstrating some coherence and progression of ideas;
              the essay may demonstrate inconsistent facility in the use of language, using generally appropriate vocabulary
              and demonstrates some variety in sentence structure; the essay may have some errors in grammar, usage, and mechanics.
            </p>
            <h3 className="text-xl font-bold mb-2">Score of 3</h3>
            <p className="mb-4">
              An essay in this category demonstrates developing mastery and is marked by ONE OR
              MORE of the following weaknesses: develops a point of view on the issue, demonstrating some critical
              thinking, but may do so inconsistently or use inadequate examples, reasons, or other evidence taken from the
              source texts to support its position; the essay is limited in its organization or focus, or may demonstrate some
              lapses in coherence or progression of ideas; the essay may demonstrate facility in the use of language,
              but sometimes uses weak vocabulary or inappropriate word choice and/or lacks variety or demonstrates
              problems in sentence structure; the essay may contain an accumulation of errors in grammar, usage, and mechanics.
            </p>
            <h3 className="text-xl font-bold mb-2">Score of 2</h3>
            <p className="mb-4">
              An essay in this category demonstrates little mastery and is flawed by ONE OR MORE of
              the following weaknesses: develops a point of view on the issue that is vague or seriously limited and
              demonstrates weak critical thinking; the essay provides inappropriate or insufficient examples, reasons, or
              other evidence taken from the source text to support its position; the essay is poorly organized and/or focused,
              or demonstrates serious problems with coherence or progression of ideas; the essay displays very little facility
              in the use of language, using very limited vocabulary or incorrect word choice and/or demonstrates frequent
              problems in sentence structure; the essay contains errors in grammar, usage, and mechanics so serious that
              meaning is somewhat obscured.
            </p>
            <h3 className="text-xl font-bold mb-2">Score of 1</h3>
            <p className="mb-4">
              An essay in this category demonstrates very little or no mastery and is severely flawed by
              ONE OR MORE of the following weaknesses: develops no viable point of view on the issue, or provides little
              or no evidence to support its position; the essay is disorganized or unfocused, resulting in a disjointed or
              incoherent essay; the essay displays fundamental errors in vocabulary and/or demonstrates severe flaws in
              sentence structure; the essay contains pervasive errors in grammar, usage, or mechanics that persistently
              interfere with meaning.
            </p>
          </div>

          {/* Holistic Rating for Independent Writing */}
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Holistic Rating for Independent Writing</h2>

            <h3 className="text-xl font-bold mb-2">Score of 6</h3>
            <p className="mb-4">
              An essay in this category demonstrates clear and consistent mastery, although it may have a few minor errors.
              A typical independent essay effectively develops a compelling and insightful position on an issue and demonstrates
              outstanding critical thinking; the essay uses clearly appropriate reasons and examples to support its position;
              the essay is well organized and focused, demonstrating clear coherence and smooth progression of ideas;
              the essay exhibits skillful use of language, using a varied, accurate, and apt vocabulary, and demonstrates
              meaningful variety in sentence structure; the essay is free of most errors in grammar, usage, and mechanics.
            </p>

            <h3 className="text-xl font-bold mb-2">Score of 5</h3>
            <p className="mb-4">
              An essay in this category demonstrates reasonably consistent mastery, although it will have occasional
              errors or lapses in quality. A typical independent essay effectively develops a position on the issue and
              demonstrates strong critical thinking; the essay generally uses appropriate reasons and examples to support
              its position; the essay is well organized and focused, demonstrating coherence and progression of ideas;
              the essay exhibits facility in the use of language, using appropriate vocabulary and demonstrating variety in
              sentence structure; the essay is generally free of most errors in grammar, usage, and mechanics.
            </p>

            <h3 className="text-xl font-bold mb-2">Score of 4</h3>
            <p className="mb-4">
              An essay in this category demonstrates adequate mastery, although it will have lapses in quality. A typical
              independent essay develops a position on the issue and demonstrates competent critical thinking; the essay uses
              adequate reasons and examples to support its position; the essay is generally organized and focused,
              demonstrating some coherence and progression of ideas; the essay may demonstrate inconsistent facility in the
              use of language, using generally appropriate vocabulary, and demonstrating some variety in sentence structure;
              the essay may have some errors in grammar, usage, and mechanics.
            </p>

            <h3 className="text-xl font-bold mb-2">Score of 3</h3>
            <p className="mb-4">
              An essay in this category demonstrates developing mastery and is marked by ONE OR MORE of the following
              weaknesses: develops a position on the issue, demonstrating some critical thinking, but may do so inconsistently
              or use inadequate reasons or examples to support its position; the essay is limited in its organization or focus,
              or may demonstrate some lapses in coherence or progression of ideas; the essay may demonstrate facility in the
              use of language, but sometimes uses weak vocabulary or inappropriate word choice, and/or lacks variety or
              demonstrates problems in sentence structure; the essay may contain an accumulation of errors in grammar, usage,
              and mechanics.
            </p>

            <h3 className="text-xl font-bold mb-2">Score of 2</h3>
            <p className="mb-4">
              An essay in this category demonstrates little mastery and is flawed by ONE OR MORE of the following weaknesses:
              develops a position on the issue that is vague or seriously limited and demonstrates weak critical thinking;
              the essay provides inappropriate or insufficient reasons or examples to support its position; the essay is poorly
              organized and/or focused, or demonstrates serious problems with coherence or progression of ideas; the essay
              displays very little facility in the use of language, using very limited vocabulary or incorrect word choice, and/or
              demonstrates frequent problems in sentence structure; the essay contains errors in grammar, usage, and mechanics
              so serious that meaning is somewhat obscured.
            </p>

            <h3 className="text-xl font-bold mb-2">Score of 1</h3>
            <p className="mb-4">
              An essay in this category demonstrates very little or no mastery and is severely flawed by ONE OR MORE of the
              following weaknesses: develops no viable position on the issue, or provides little or no reasons or examples to
              support its position; the essay is disorganized or unfocused, resulting in a disjointed or incoherent essay;
              the essay displays fundamental errors in vocabulary and/or demonstrates severe flaws in sentence structure;
              the essay contains pervasive errors in grammar, usage, or mechanics that persistently interfere with meaning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCriteria;
