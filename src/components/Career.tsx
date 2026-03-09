import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Systems Developer</h4>
                <h5>Saturday AI</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Developed an advanced local AI assistant featuring Face Recognition, Real-time Voice Interaction, and Reflection Engine (Memory) capabilities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Immersive Web Engineer</h4>
                <h5>NeonVerse / CryptoSentinel</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Created an immersive 3D metaverse platform with real-time multiplayer interaction using WebGL and Three.js. Built an AI-powered Web3 security dashboard for real-time threat detection.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>IPdorm & More</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building futuristic property management systems, custom UI clones, and minimalist productivity apps. Constantly exploring modern web frameworks and integrating cutting-edge AI features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
