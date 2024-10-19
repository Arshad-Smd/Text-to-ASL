// src/components/CarouselWithQuiz.jsx
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselWithQuiz.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { IoSparklesOutline } from "react-icons/io5";

import you from "../../assets/you.mp4";
import mom from "../../assets/mom.mp4";
import tired from "../../assets/tired.mp4";
import drink from "../../assets/drink.mp4";
import milk from "../../assets/milk.mp4";


const slides = [
  {
    title: "You",
    description: "Point directly at the person you are addressing with your index finger.",
    gif: you,
  },
  {
    title: "Mom",
    description: `Place your thumb on your chin with an open hand (like a "5" handshape), fingers spread wide.`,
    gif: mom,
  },
  {
    title: "Tired",
    description: " Place both hands on your chest with bent fingers, then drop your shoulders slightly as you move your hands down, showing fatigue.",
    gif: tired,
  },
  {
    title: "Drink",
    description: " Mimic holding a cup with your hand and move it towards your mouth as if taking a drink.",
    gif: drink,
  },
  {
    title: "Milk",
    description: "Open and close your hand in a fist-like motion, mimicking the action of milking a cow.",
    gif: milk,
  },
];

const Quiz = ({ onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const correctAnswer = 2; // Set index of correct answer (0-based index)

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }

    if (selectedOption === correctAnswer) {
      setFeedback("congratulations");
      onAnswerSelected(true);
    } else {
      setFeedback("incorrect");
      onAnswerSelected(false);
    }
  };

  return (
    <div className="quiz">
      <h2>Quiz Question</h2>
      <p>Which option is correct?</p>
      <ul>
        {["Option 1", "Option 2", "Option 3", "Option 4"].map(
          (option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="quiz"
                  value={index}
                  onChange={() => setSelectedOption(index)}
                  checked={selectedOption === index}
                />
                {option}
              </label>
            </li>
          )
        )}
      </ul>
      <button onClick={handleSubmit}>Submit Answer</button>
      {feedback && (
        <div
          className={
            feedback === "congratulations" ? "congratulations" : "incorrect"
          }
        >
          {feedback === "congratulations"
            ? "Congratulations! You selected the correct answer!"
            : "Sorry, that's incorrect. Try again."}
        </div>
      )}
    </div>
  );
};

const CarouselWithQuiz = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const navigate = useNavigate();

  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setQuizResult("Congratulations! You selected the correct answer!");
    } else {
      setQuizResult("Sorry, that's incorrect. Try again.");
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === slides.length - 1) {
      // Move to the end slide which triggers the quiz
      setCurrentSlide(currentSlide + 1);
      setShowQuiz(true);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    if (index === slides.length) {
      setShowQuiz(true);
    }
  };

  return (
    <div className="carousel-container">
      {!showQuiz ? (
        <>
          <Carousel
            showThumbs={false}
            showArrows={false} // Hide default arrows
            selectedItem={currentSlide}
            onChange={handleSlideChange}
            showStatus={false}
            infiniteLoop={false}
            useKeyboardArrows
            autoPlay={false}
            swipeable
            emulateTouch
          >
            {slides.map((slide, index) => (
              <div className="slide" key={index}>
                <div className="top-bar">
                  <div
                    className="top-bar-progress"
                    style={{ width: `${((index + 1) / slides.length) * 100}%` }}
                  ></div>
                </div>
                <h3 className="slide-title">{slide.title} <span>
                <IoSparklesOutline />
                    <p>New Word</p>
                    </span></h3>
                <div className="slide-content">
                  <p className="slide-description">{slide.description}</p>
                  <video alt={`Slide ${index + 1} GIF`}
                    className="slide-gif" src={slide.gif} loop autoPlay></video>
                </div>
              </div>
            ))}

            {/* Optional: Remove the end-slide if using showQuiz logic */}
            {/* <div className="slide end-slide">
              <h3 className="slide-title">Ready for a Quiz?</h3>
              <p className="slide-description">Click next to take the quiz.</p>
            </div> */}
          </Carousel>
          {/* "Back" Button Positioned at Top-Left */}
          {currentSlide > 0 && (
            <button
              className="back-button"
              onClick={handleBack}
              aria-label="Go to previous slide"
            >
              Back
            </button>
          )}
          {/* "Next" Button Positioned at Bottom-Right */}
          <button
            className="next-button"
            onClick={handleNext}
            aria-label="Go to next slide"
          >
            Next
          </button>
        </>
      ) : (
        <>
          {quizResult ? (
            <div className="quiz-result">
              <h2>{quizResult}</h2>
              <button
                className="learn-again-button"
                onClick={() => navigate("/learning/test")}
              >
                Learn Again
              </button>
            </div>
          ) : (
            <Quiz onAnswerSelected={handleAnswerSelected} />
          )}
        </>
      )}
    </div>
  );
};

export default CarouselWithQuiz;
