import React, { useEffect, useRef } from "react";

const ChatBot = () => {
  const botRef = useRef(null);

  useEffect(() => {
    const scriptId = "dialogflow-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (botRef.current) {
        const botShadow = botRef.current.shadowRoot;
        if (botShadow) {
          const chatElement = botShadow.querySelector("df-messenger-chat");
          if (chatElement) {
            const chatShadow = chatElement.shadowRoot;
            if (chatShadow) {
              const userInput = chatShadow.querySelector("df-messenger-user-input");
              if (userInput) {
                userInput.addEventListener("keyup", (event) => {
                  if (event.key === "Enter") {
                    console.log("User Input Sent:", userInput.value);
                  }
                });
                clearInterval(interval);
              }
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <df-messenger
      ref={botRef}
      chat-title="DoubtsWallah"
      agent-id="6564faf2-08ae-4b93-8e0d-9dbfd032bea2"
      language-code="en"
    ></df-messenger>
  );
};

export default ChatBot;
