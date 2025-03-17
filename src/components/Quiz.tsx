
import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import confetti from "canvas-confetti";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    id: 1,
    question: "How much water does it take to produce 1 pound of beef?",
    options: [
      "100 gallons",
      "500 gallons",
      "1,800 gallons",
      "2,400 gallons"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which of these foods has the highest protein content per 100g?",
    options: [
      "Tofu",
      "Lentils",
      "Seitan",
      "Chickpeas"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What percentage of global greenhouse gas emissions come from animal agriculture?",
    options: [
      "5%",
      "14.5%",
      "25%",
      "35%"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "How many gallons of water can you save by skipping one beef burger?",
    options: [
      "100 gallons",
      "300 gallons",
      "660 gallons",
      "1000 gallons"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which plant-based milk has the lowest environmental impact?",
    options: [
      "Almond milk",
      "Oat milk",
      "Soy milk",
      "Coconut milk"
    ],
    correctAnswer: 1
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = calculateScore();
      if (score === questions.length) {
        triggerConfetti();
      }
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="quiz">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
            Test Your Vegan Knowledge
          </h2>

          <div className="bg-secondary/20 dark:bg-secondary/5 rounded-xl p-8">
            {!showResults ? (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>Score: {calculateScore()}/{questions.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup
                  value={selectedAnswers[currentQuestion]?.toString()}
                  onValueChange={(value) => handleAnswer(parseInt(value))}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-secondary/10 dark:hover:bg-secondary/10 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <label
                        htmlFor={`option-${index}`}
                        className="text-gray-700 dark:text-gray-300 flex-grow cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>

                <Button
                  className="w-full mt-8 bg-primary hover:bg-primary/90"
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                >
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            ) : (
              <div className="animate-scale-in text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Quiz Complete!
                </h3>
                <p className="text-4xl font-bold text-primary mb-8">
                  Your Score: {calculateScore()}/{questions.length}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {calculateScore() === questions.length
                    ? "🎉 Perfect score! You're a vegan expert!"
                    : "Great effort! Keep learning about veganism!"}
                </p>
                <Button
                  onClick={resetQuiz}
                  className="bg-primary hover:bg-primary/90"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
