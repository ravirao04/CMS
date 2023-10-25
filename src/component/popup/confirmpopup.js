import React from "react";
import "./Popup.css";
export const Popup = ({ text, yesPopup, closePopup }) => {
    return (
        <div className="popup-container">
            <div className="popup-body">
                <h1>{text}</h1>
                <div horizontal layout style={{
                    marginTop:"40px",
                    marginLeft:"100px",
                    marginRight:"100px",
                    "text-align": "center",
                    "display": "flex",
                    "flex-direction": "row",
                    "flex-wrap": "nowrap",
                    "justify-content": "center",
                    "align-items": "center",
                    "gap":"10px"
                }}>
                    <button onClick={yesPopup}>Yes</button>
                    <button onClick={closePopup}>No</button>
                </div>

            </div>
        </div>);
};