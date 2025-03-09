import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";

const challenges = [
  {
    question: "Write a function that returns the sum of two numbers.",
    functionName: "sum",
    params: ["a", "b"],
    testCases: [
      { input: [2, 3], expected: 5 },
      { input: [1, 1], expected: 2 },
      { input: [-1, 1], expected: 0 }
    ]
  },
  {
    question: "Write a function that returns true if a number is even, false otherwise.",
    functionName: "isEven",
    params: ["num"],
    testCases: [
      { input: [4], expected: true },
      { input: [7], expected: false }
    ]
  }
];

const generateFunctionTemplate = (functionName, params) => {
  return `function ${functionName}(${params.join(", ")}) {
  // Write your code here
  return;
}`;
};

const CodingGame = () => {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [correctCases, setCorrectCases] = useState(0);
  const [incorrectCases, setIncorrectCases] = useState(0);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    setCode(generateFunctionTemplate(challenges[challengeIndex].functionName, challenges[challengeIndex].params));
    setTimer(60);
    setTotalCases(challenges[challengeIndex].testCases.length);
    setCorrectCases(0);
    setIncorrectCases(0);
  }, [challengeIndex]);

  useEffect(() => {
    if (timer > 0 && isRunning) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleNextChallenge();
    }
  }, [timer, isRunning]);

  const handleRunCode = () => {
    let passedCases = 0;
    let failedCases = 0;
    let results = [];

    const challenge = challenges[challengeIndex];

    try {
      // Evaluate the user's function in a safe manner
      const userFunction = new Function(`return ${code}`)();

      challenge.testCases.forEach((testCase) => {
        try {
          const actualOutput = userFunction(...testCase.input);
          const expectedOutput = testCase.expected;

          if (actualOutput === expectedOutput) {
            passedCases++;
          } else {
            failedCases++;
            results.push(`❌ ${challenge.functionName}(${testCase.input.join(", ")}) → Expected: ${expectedOutput}, Got: ${actualOutput}`);
          }
        } catch (err) {
          failedCases++;
          results.push(`⚠️ Error in execution: ${err.message}`);
        }
      });

      setCorrectCases(passedCases);
      setIncorrectCases(failedCases);
      setOutput(
        `✅ ${passedCases}/${totalCases} Test Cases Passed\n` +
        (results.length > 0 ? results.join("\n") : "")
      );

      if (passedCases === totalCases) {
        setScore((prev) => prev + 100);
        handleNextChallenge();
      }
    } catch (error) {
      setOutput(`⚠️ Code Error: ${error.message}`);
    }
  };

  const handleNextChallenge = () => {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex((prev) => prev + 1);
    } else {
      alert(`🎉 All challenges completed!\nFinal Score: ${score}`);
      setIsRunning(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4">💻 Coding Game</h1>
      <motion.p className="text-lg font-semibold mb-2" animate={{ scale: 1.1 }}>
        Challenge {challengeIndex + 1} of {challenges.length}
      </motion.p>
      <p className="text-center mb-4">{challenges[challengeIndex].question}</p>
      <p className="text-red-400 font-bold">⏳ Time Left: {timer}s</p>
      <p className="text-green-400 font-bold">🏆 Score: {score}</p>
      <p className="text-blue-400">✅ {correctCases}/{totalCases} Test Cases Passed</p>
      <p className="text-yellow-400">❌ {incorrectCases}/{totalCases} Test Cases Failed</p>
      <Editor height="300px" defaultLanguage="javascript" theme="vs-dark" value={code} onChange={setCode} />
      <motion.button 
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRunCode}
      >🚀 Run Code</motion.button>
      <motion.div 
        className="bg-gray-800 p-4 mt-4 rounded-lg shadow-lg w-full"
        animate={{ opacity: [0, 1] }}
      >
        <p className="font-semibold">Output:</p>
        <pre className="text-yellow-300 text-sm mt-2">{output}</pre>
      </motion.div>
    </motion.div>
  );
};

export default CodingGame;
