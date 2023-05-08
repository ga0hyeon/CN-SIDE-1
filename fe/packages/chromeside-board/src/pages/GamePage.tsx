import { useState } from "react";
import "../App.css";
import { EnterButton as EnterButton } from "ui-components";
import { useNavigate } from "react-router-dom";
import HalliGalli from "halli-galli";

function GamePage() {
  return (
    <div className="App">
      <HalliGalli></HalliGalli>
    </div>
  );
}

export default GamePage;
