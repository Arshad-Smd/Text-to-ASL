import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Request.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import axios from "axios";

const Request = () => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "build/webgl/project-asl.loader.js",
    dataUrl: "build/webgl/project-asl.data.unityweb",
    frameworkUrl: "build/webgl/project-asl.framework.js.unityweb",
    codeUrl: "build/webgl/project-asl.wasm.unityweb",
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [prevTrans, setPrevTrans] = useState(""); // Store previous transcript
  const [wordQueue, setWordQueue] = useState([]); // Queue for new words
  const [isProcessing, setIsProcessing] = useState(false); // Control animation sequence

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="errorDiv">
        <h1>Browser doesn't support speech recognition😥😣.</h1>
      </div>
    );
  }

  // Handle new words when transcript updates
  useEffect(() => {
    if (transcript !== prevTrans) {
      const currentWords = transcript.trim().split(" ").filter((word) => word.trim() !== ""); // Clean and split
      const prevWords = prevTrans.trim().split(" ").filter((word) => word.trim() !== "");

      const newWordsArray = currentWords.slice(prevWords.length); // Get new words spoken

      if (newWordsArray.length > 0) {
        setWordQueue((prevQueue) => [...prevQueue, ...newWordsArray]); // Add new words to queue
      }

      setPrevTrans(transcript); // Update previous transcript
    }
  }, [transcript, prevTrans]);

  // Dedicated queue processor to process words one by one
  useEffect(() => {
    if (!isProcessing && wordQueue.length > 0) {
      setIsProcessing(true); // Mark processing as started
      processQueue(); // Process the word queue
    }
  }, [wordQueue]);

  // Function to process the word queue
  const processQueue = async () => {
    if (wordQueue.length > 0) {
      const word = wordQueue[0]; // Get the first word in the queue
      const fetchedWord = await fetchWords(word); // Await the fetched word from API
      if (fetchedWord) {
        handleClickSpawnEnemies(fetchedWord); // Trigger animation
      } else {
        handleClickSpawnEnemies("book");
      }
      setTimeout(() => {
        setWordQueue((prevQueue) => prevQueue.slice(1)); // Remove the processed word
        setIsProcessing(false); // Mark processing as done, allowing the next word to be processed
      }, 2500); // 2-second delay between animations
    }
  };

  // Fetch word from API
  async function fetchWords(word) {
    const nword = "";
    try {
      const response = await axios.get(`http://localhost:5000/search?word=${word}`);
      return response.data.word; // Assuming 'word' is the field with the result
    } catch (error) {
      console.error("Error fetching word:", error);
      return ""; // Return empty string on error
    }
  }

  // Send the animation trigger to Unity
  const handleClickSpawnEnemies = (word) => {
    sendMessage("all_done", "PlayAnimation", word); // Send word to Unity for animation
  };

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="request-container">
      <div className="voice-cont">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <p className="transcript">
          {transcript || "Speak by pressing the start button."}
        </p>
        <div className="btn-group">
          <button
            onClick={handleStart}
            className="rec-button"
            aria-label="Start listening"
            disabled={listening}
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className="rec-button"
            aria-label="Stop listening"
            disabled={!listening}
          >
            Stop
          </button>
          <button onClick={resetTranscript} className="rec-button" aria-label="Reset transcript">
            Reset
          </button>
        </div>
      </div>
      <div className="model-cont">
        <Unity className="unity-container" unityProvider={unityProvider} 
        style={{ width: "100%", height: "400px", maxWidth: "1200px", borderRadius: "10px" }}
         />
      </div>
    </div>
  );
};

export default Request;
