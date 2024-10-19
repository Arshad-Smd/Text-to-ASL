import React from "react";
import "./Banner.css";
import BannerBg from "../../assets/banner_bg.mp4";
import FullBannerBg from "../../assets/banner_2_3_4_bg.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <div className='banner-1'>
        <video src={BannerBg} loop autoPlay muted></video>
        <div className='content'>
          <h2 className='title'>
            Break Communication Barriers with <br /> HearAid
          </h2>
          <p>
            Empower the deaf and hard of hearing communities with real-time sign language 
            translation. HearAid brings accessible communication to everyone, making the world
            a more inclusive place.
          </p>
          <div className='btn-group'>
            <button>Features</button><button>About Us</button>
          </div>
        </div>
      </div>
      <div className="bg-wrapper">
        <div className="banner-2">
          <div className="cont">
            <h3 className="title">Our Solution</h3>
            <p>
              HearAid is a revolutionary application designed to translate spoken language 
              into sign language in real-time. It uses cutting-edge AI to enable seamless 
              communication between hearing and non-hearing individuals, breaking down language barriers.
            </p>
            <div className="content">
              <div className="cont">
                <h4 className="subtitle">How HearAid Works</h4>
                <p>
                  Our system uses speech recognition, advanced NLP techniques, and Unity to interpret 
                  spoken words and translate them into sign language animations. HearAid 
                  is built with accessibility in mind, ensuring that communication can be 
                  understood by all, regardless of hearing ability.
                </p>
                <Link className="link">Learn more -{">"}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-3">
          {/* <div className="cont">
            <h3 className="title">Real-Time Translation</h3>
            <p>
              HearAid provides instant sign language interpretation, enabling real-time 
              conversations without the need for a human interpreter. This technology 
              ensures inclusivity in everyday interactions, from casual conversations to business meetings.
            </p>
            <Link className="link">Discover more -{">"}</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
