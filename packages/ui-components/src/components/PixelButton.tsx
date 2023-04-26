import React from "react";
import styled from "styled-components";
import "../assets/font/font.css";
import { darkerRgb } from "../utils/ColorUtil";

interface PixelButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  fontSize? : number;
  label: string;
  onClick?: () => void;
}

const PixelizeButton = styled.button<{ backgroundColor?: string, fontSize?:number }>`
  font-size: ${({ fontSize }) => fontSize!=undefined?`${fontSize}px`:"24px"};
  font-family: "Neo Dgm", cursive;
  padding: 0 20px;
  height: "70px";
  background: ${({ backgroundColor }) => backgroundColor || "#06c1de"};
  border: 0px;
  position: relative;
  box-shadow: inset -4px 2px 1px 1px grey, inset -4px -2px 1px 1px lightgray,
    inset 4px 0px 1px 1px lightgray;

  :hover {
    cursor: pointer;
    background: ${({ backgroundColor }) =>
      darkerRgb(backgroundColor, 0.1) || "#06b7d1"};
  }

  :active {
    top: 5px;
    box-shadow: -4px 2px 1px 1px grey, -4px -2px 1px 1px lightgray,
      4px 0px 1px 1px lightgray;
  }

  ::after {
    content: "";
    background: black;
    position: absolute;
    left: -2.5%;
    top: 0;
    width: 105%;
    height: 100%;
    z-index: -1;
  }

  ::before {
    content: "";
    background: black;
    position: absolute;
    left: 0;
    top: -5%;
    width: 100%;
    height: 113%;
    z-index: -1;
  }
`;

export const PixelButton = ({
  backgroundColor,
  fontSize,
  label,
  onClick,
  ...props
}: PixelButtonProps) => {
  
  return (
    <PixelizeButton
      type="button"
      className={["btn"].join(" ")}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      {...props}
      onClick={() => onClick && onClick()}
    >
      {label}
    </PixelizeButton>
  );
};
