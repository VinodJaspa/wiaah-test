import React from "react";
import "./sppiner-loader.css"; // Assuming you have styles for the loader

export default function FormSubmitLoader() {
  return (
    <div className="form-submit-overlay">
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
    </div>
  );
}
