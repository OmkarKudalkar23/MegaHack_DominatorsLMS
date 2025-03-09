import React, { useState } from "react";

const DebugGame = () => {
  const challenges = [
    {
      language: "Python",
      question: "Fix this function:",
      faultyCode: "def greet()\n    print(\"Hello, world!\")",
      correctAnswer: "def greet():\n    print(\"Hello, world!\")",
    },
    {
      language: "JavaScript",
      question: "Fix this function:",
      faultyCode: "function greet() {\nconsole.log(\"Hello, world!\")\n}",
      correctAnswer: "function greet() {\n    console.log(\"Hello, world!\");\n}",
    },
    {
      language: "CSS",
      question: "Fix this CSS rule:",
      faultyCode: "button {\n  background-color blue;\n  color: white;\n}",
      correctAnswer: "button {\n  background-color: blue;\n  color: white;\n}",
    },
    {
      language: "React",
      question: "Fix this React component:",
      faultyCode: "const Button = () => {\nreturn (<button>Click Me</button>);\nexport default Button;",
      correctAnswer: "const Button = () => {\n  return (<button>Click Me</button>);\n};\nexport default Button;",
    },
  ];

  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  const checkAnswer = () => {
    if (userAnswer.trim() === challenges[currentChallenge].correctAnswer.trim()) {
      setFeedback("✅ Correct! +100 points");
      setScore(score + 100);
      setBadges(badges + 1);
      nextChallenge();
    } else {
      setFeedback("❌ Incorrect! Try again.");
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setTimeout(() => {
        setCurrentChallenge(currentChallenge + 1);
        setUserAnswer("");
        setFeedback("");
      }, 1000);
    } else {
      setFeedback("🏆 Game Over! Final Score: " + score);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Debug the Code</h1>
      <div className="flex justify-center space-x-4 mb-6">
        {["Python", "JavaScript", "CSS", "React"].map((lang) => (
          <button
            key={lang}
            className={`px-4 py-2 rounded ${selectedLanguage === lang ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setSelectedLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {challenges
          .filter((challenge) => challenge.language === selectedLanguage)
          .map((challenge, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg transition-all bg-gray-800`}
            >
              <h2 className="text-xl font-bold">{challenge.language}</h2>
              <p className="mt-2">{challenge.question}</p>
              <pre className="bg-black p-3 rounded-md mt-2 whitespace-pre-wrap">
                {challenge.faultyCode}
              </pre>
              <textarea
                className="w-full p-2 mt-2 text-white rounded"
                rows="4"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the correct code here..."
              />
              <button
                className="mt-3 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                onClick={checkAnswer}
              >
                Submit
              </button>
              <p className="mt-2 text-yellow-400">{feedback}</p>
            </div>
          ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg">Score: {score}</p>
        <p className="text-lg">Badges Earned: {badges}🏆</p>
        {badges >= 2 && (
          <p className="mt-2 text-green-400">🎉 Congrats! You earned a discount on a coding course! 🎉</p>
        )}
      </div>
    </div>
  );
};

export default DebugGame;