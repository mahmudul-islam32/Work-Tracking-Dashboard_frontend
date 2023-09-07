// MessageDisplay.js
import React, { useEffect, useState } from "react";

export const MessageDisplay = ({ message, messageType, closeMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically close the message after 3 seconds
    const timer = setTimeout(() => {
      closeMessage();
    }, 3000);

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, [closeMessage]);

  const closeAndHide = () => {
    setIsVisible(false);
    setTimeout(() => {
      closeMessage();
    }, 500); // Wait for the slide-out animation to finish before actually closing
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div
            className={`message-container ${
              isVisible ? "show" : "hide"
            } ${messageType}`}
            onAnimationEnd={() => {
              if (!isVisible) closeMessage();
            }}
            onClick={closeAndHide}
          >
            <div className={`message ${messageType}`}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
