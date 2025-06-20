import React, { useContext } from 'react';
import { dataContext, prevUser } from '../context/UserContext';

function Chat() {
  const {
    input, setInput,
    prevInput, setPrevInput,
    feature, setFeature,
    showResult, setShowResult,
    prevFeature, setPrevFeature
  } = useContext(dataContext);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = prevUser.imgUrl;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="chat-page">


      <div className="user">
        {prevFeature === "upimg" && prevUser.imgUrl && (
          <img src={prevUser.imgUrl} alt="uploaded" />
        )}
        <span>{prevUser.prompt || "You asked something..."}</span>
      </div>

      {/* 🤖 AI SECTION */}
      <div className="ai">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="ai bot"
          width={40}
        />

        {prevFeature === "genimg" ? (
          !showResult ? (
            <span>Promage is generating your image...</span>
          ) : (
            <div className="genimg-preview">
              <img
                src={prevUser.imgUrl}
                alt="Generated"
                style={{ maxWidth: "35%", borderRadius: "10px", marginTop: "10px" }}
              />
              <button className="downloadBtn" onClick={handleDownload}>Download Image</button>
            </div>
          )
        ) : (
          !showResult ? (
            <span>Promage is generating a response...</span>
          ) : (
            <span>{showResult}</span>
          )
        )}
      </div>
    </div>
  );
}

export default Chat;
  
