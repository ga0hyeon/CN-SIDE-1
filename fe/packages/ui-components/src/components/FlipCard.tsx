import React, { RefObject, forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import "../assets/font/font.css";

interface FlipCardProps {
  front?: React.ReactNode;
  frontColor?: string;
  back?: React.ReactNode;
  backColor?: string;
  type?: "circle" | "square";
  onFront?: () => void;
  onBack?: () => void;
  onFlip?: () => void;
}

const Container = styled.div<{
  frontColor?: string;
  backColor?: string;
  type?: "circle" | "square";
  width?: number;
}>`
  width: 156px;
  height: 156px;
  perspective: 1100px;
  

  .flip-card {
    position:absolute;
    padding:13px;
    width: 100px;
    height: 100px;
    transition: 1s;
    transform-style: preserve-3d;
    font-family: "Neo Dgm", cursive;
  }

  .flip-front,
  .flip-back {
    margin:-26px;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: "#000";
    border-radius: ${({ type }) => (type === "circle" ? "50%" : "0")};
    border: 0.1875em solid #0f1c3f;
    box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
  }

  .flip-front {
    background: ${({ frontColor }) =>
      frontColor != undefined ? frontColor : "white"};
  }

  .flip-back {
    background: ${({ backColor }) =>
      backColor != undefined ? backColor : "#f0f0f0"};
    transform: rotateY(180deg);
  }

  .flip-fliped {
    transform: rotateY(180deg);
  }
`;

export const FlipCard = forwardRef(({
  type,
  front,
  frontColor,
  back,
  backColor,
  onFront,
  onBack,
  onFlip,
  ...props
}: FlipCardProps, ref) => {  
  const [flip, setFlip] = useState(false);
  
  const handleClick = () => {
    setFlip(!flip);

    if (flip) onFront && onFront();
    else onBack && onBack();

    onFlip && onFlip();
  };

  const doFlip = () => {
    handleClick();
  }

  useImperativeHandle(ref, () => ({
    doFlip,
  }));

  return (
    <Container
      type={type}
      frontColor={frontColor}
      backColor={backColor}
      onClick={() => handleClick()}
    >
      <div
        className={["flip-card", flip ? "flip-fliped" : ""].join(" ")}
        
      >
        <div className="flip-front">{front}</div>
        <div className="flip-back">{back}</div>
      </div>
    </Container>
  );
});
