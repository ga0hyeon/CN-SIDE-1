import { useState, useEffect } from "react";
import styled from "styled-components";
import "../assets/font/font.css";

interface TimerProps {
  time?: number;
  color?: string;
  opacity?: number;
  size?: number;
  position?: "top" | "center" | "bottom";
  onTimeout: () => void;
}

const TimerLabel = styled.div<{
  color?: string;
  opacity?: number;
  size?: number;
  position?: "top" | "center" | "bottom";
}>`
  font-family: "Neo Dgm", cursive;
  color: ${({ color }) => color};
  font-size: ${({ size }) => `${size}px`};
  opacity: ${({ opacity }) => opacity};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: -1;
  align-items: ${({ position }) =>
    position === "center"
      ? "center"
      : position === "top"
      ? "flex-start"
      : "flex-end"};
  display: -webkit-flex;
  -webkit-align-item: center;
  -webkit-justify-content: center;
`;

export const Timer = ({
  time = 3,
  color = "white",
  opacity = 1,
  size = 100,
  position = "top",
  onTimeout,
  ...props
}: TimerProps) => {
  const [remainTime, setRemainTime] = useState<number>(time);

  useEffect(() => {
    if (remainTime > 0) {
      const timerId = setTimeout(() => {
        setRemainTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeout();
    }
  }, [remainTime]);

  useEffect(() => {
    setRemainTime(time);
  }, [time]);

  return (
    <>
      {remainTime > 0 && (
        <TimerLabel
          color={color}
          opacity={opacity}
          size={size}
          position={position}
          {...props}
        >
          {remainTime}
        </TimerLabel>
      )}
    </>
  );
};