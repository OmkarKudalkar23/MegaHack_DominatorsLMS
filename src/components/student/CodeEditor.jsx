import React, { useState } from "react";
import Editor from "@monaco-editor/react"; // Monaco Editor for better coding experience

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your JavaScript code here");

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-4">Online Code Editor</h1>
      <div className="w-full max-w-4xl h-[500px] border border-gray-700 rounded-lg overflow-hidden">
        <Editor
          height="500px"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
