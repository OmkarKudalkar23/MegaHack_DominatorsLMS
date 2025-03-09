import React, { useState, useEffect } from "react";

const docs = {
    frontend: {
        React: {
            text: "React is a JavaScript library for building user interfaces.",
            video: "https://www.youtube.com/embed/Ke90Tje7VS0"
        },
        Vue: {
            text: "Vue.js is a progressive framework for building user interfaces.",
            video: "https://www.youtube.com/embed/4deVCNJq3qc"
        },
        Angular: {
            text: "Angular is a platform for building mobile and desktop web applications.",
            video: "https://www.youtube.com/embed/3qBXWUpoPHo"
        },
        Svelte: {
            text: "Svelte is a radical new approach to building user interfaces.",
            video: "https://www.youtube.com/embed/rv3Yq-B8qp4"
        }
    },
    backend: {
        NodeJS: {
            text: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
            video: "https://www.youtube.com/embed/TlB_eWDSMt4"
        },
        Django: {
            text: "Django is a high-level Python web framework that encourages rapid development.",
            video: "https://www.youtube.com/embed/F5mRW0jo-U4"
        },
        Flask: {
            text: "Flask is a micro web framework written in Python.",
            video: "https://www.youtube.com/embed/Z1RJmh_OqeA"
        },
        RubyOnRails: {
            text: "Ruby on Rails is a server-side web application framework written in Ruby.",
            video: "https://www.youtube.com/embed/fmyvWz5TUWg"
        },
        SpringBoot: {
            text: "Spring Boot makes it easy to create stand-alone, production-grade Spring applications.",
            video: "https://www.youtube.com/embed/9SGDpanrc8U"
        }
    }
};

const FileToSpeech = () => {
    const [fileContent, setFileContent] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [category, setCategory] = useState("frontend");
    const [language, setLanguage] = useState("React");
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            setSelectedVoice(availableVoices[0] || null);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setFileContent(e.target.result);
            reader.readAsText(file);
        }
    };

    const speakText = () => {
        if (!fileContent.trim()) return;
        
        const words = fileContent.split(" ");
        let wordIndex = 0;
        setHighlightIndex(0);

        const utterance = new SpeechSynthesisUtterance(fileContent);
        utterance.voice = selectedVoice;
        
        utterance.onboundary = (event) => {
            if (event.name === "word") {
                setHighlightIndex(wordIndex);
                wordIndex++;
            }
        };

        utterance.onend = () => setHighlightIndex(-1);

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="p-6 bg-[#1a1e32] text-white rounded-lg shadow-xl max-w-3xl mx-auto border border-blue-500">
            <h2 className="text-2xl font-extrabold mb-4 text-center text-blue-400">
                Full-Stack Documentation Reader
            </h2>

            <div className="mb-4">
                <label className="block font-semibold text-blue-300">Select Category:</label>
                <select
                    className="w-full p-3 mt-1 rounded-lg bg-[#0f172a] text-white border border-blue-500"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setLanguage(Object.keys(docs[e.target.value])[0]);
                    }}
                >
                    {Object.keys(docs).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold text-blue-300">Select Language:</label>
                <select
                    className="w-full p-3 mt-1 rounded-lg bg-[#0f172a] text-white border border-blue-500"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {Object.keys(docs[category]).map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            <input
                type="file"
                accept=".txt"
                className="mt-3 w-full p-2 bg-[#0f172a] text-white border border-blue-500 rounded-lg cursor-pointer"
                onChange={handleFileUpload}
            />

            <div className="mt-4 p-3 h-40 overflow-auto bg-[#0f172a] border border-blue-500 rounded-lg text-white text-lg leading-6">
                {fileContent
                    ? fileContent.split(" ").map((word, index) => (
                        <span key={index} className={index === highlightIndex ? "bg-blue-500 text-black px-1 rounded-md" : ""}>
                            {word} {" "}
                        </span>
                    ))
                    : "Upload a text file to display here..."}
            </div>

            <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                onClick={speakText}
            >
                Read Aloud
            </button>

            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2 text-blue-400">Video Guide</h3>
                <iframe
                    width="100%"
                    height="315"
                    src={docs[category][language].video}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg border border-blue-500"
                ></iframe>
            </div>
        </div>
    );
};

export default FileToSpeech;
