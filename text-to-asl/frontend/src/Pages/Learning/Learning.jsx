import React from "react";
import "./Learning.css";
import LearningBanner from "../../assets/learning_banner.mp4";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
const Learning = () => {
    const navigate = useNavigate();
  return (
    <div className="learning">
      <div className="left">
        <h2 className="title">Welcome, Back!</h2>
      </div>
      <div className="right">
        <h3 className="title">Your learning progress now</h3>
        <div className="progress-cont">
            <div onClick={() => navigate("/learning/test")}>
                <h4 className="subtitle">Basic</h4>
                <ProgressBar completed={30} isLabelVisible={false} />
            </div>
            <div>
                <h4 className="subtitle">Intermediate</h4>
                <ProgressBar completed={10} isLabelVisible={false}/>
            </div>
            <div>
                <h4 className="subtitle">Advanced</h4>
                <ProgressBar completed={0} isLabelVisible={false}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
