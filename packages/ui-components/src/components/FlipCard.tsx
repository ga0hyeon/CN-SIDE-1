import React, { useState } from "react";
import styled from "styled-components";
import "../assets/font/font.css";

interface FlipCardProps {
  front?: React.ReactNode;
  frontColor?: string;
  back?: React.ReactNode;
  backColor?: string;
  title?: string;
  titleColor?: string;
  secondary?: string;
  type: "circle" | "square";
  onFront?: () => void;
  onBack?: () => void;
  onFlip?: () => void;
}

const Container = styled.div<{
  frontColor?: string;
  backColor?: string;
  titleColor?: string;
  type?: "circle" | "square";
}>`
  width: 100px;
  height: 100px;
  position: relative;
  perspective: 1100px;
  margin: 2rem;

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 1s;
    transform-style: preserve-3d;
    font-family: "Neo Dgm", cursive;
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: "#000";
    border-radius: ${({ type }) => (type === "circle" ? "50%" : "0")};
    border: 0.1875em solid #0f1c3f;
    box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
  }

  .front {
    background: ${({ frontColor }) =>
      frontColor != undefined ? frontColor : "white"};
  }

  .back {
    background: ${({ backColor }) =>
      backColor != undefined ? backColor : "#f0f0f0"};
    transform: rotateY(180deg);
  }

  .flip {
    transform: rotateY(180deg);
  }
`;

export const FlipCard = ({
  type,
  front,
  frontColor,
  back,
  backColor,
  title,
  titleColor,
  secondary,
  onFront,
  onBack,
  onFlip,
  ...props
}: FlipCardProps) => {
  console.log(frontColor);
  const [flip, setFlip] = useState(false);
  const handleClick = () => {
    setFlip(!flip);

    if (flip) onFront && onFront();
    else onBack && onBack();

    onFlip && onFlip();
  };

  return (
    <Container
      className={[flip ? "flip" : ""].join(" ")}
      type={type}
      frontColor={frontColor}
      backColor={backColor}
      titleColor={titleColor}
    >
      <div
        className={["card", flip ? "flip" : ""].join(" ")}
        onClick={() => handleClick()}
      >
        <div className="front">{front}</div>
        <div className="back">{back}</div>
      </div>
    </Container>
  );
};
