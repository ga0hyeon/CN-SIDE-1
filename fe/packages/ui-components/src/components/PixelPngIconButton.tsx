import React, { ReactComponentElement } from "react";
import styled from "styled-components";
import "../assets/font/font.css";
import { darkerRgb } from "../utils/ColorUtil";

interface PixelPngIconButtonProps {
  size?: number;
  imageUrl?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const PixelizeButton = styled.button<{
  backgroundColor?: string;
  size?: number;
}>`
  font-size: 1.2em;
  font-family: "Neo Dgm", cursive;
  padding: 0 20px;
  height: ${({ size }) => (size != undefined ? `${size + 35}px` : "70px")};
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

const Icon = styled.img<{ size?: number }>`
  width: ${({ size }) => {
    console.log(size);
    return size != undefined ? `${size}px` : "40px";
  }};
  height: ${({ size }) => (size != undefined ? `${size}px` : "40px")};
`;

export const PixelPngIconButton = ({
  size,
  imageUrl,
  backgroundColor,
  onClick,
  ...props
}: PixelPngIconButtonProps) => {
  return (
    <PixelizeButton
      type="button"
      className={["btn"].join(" ")}
      backgroundColor={backgroundColor}
      size={size}
      {...props}
      onClick={() => onClick && onClick()}
    >
      <Icon src={imageUrl} size={size} />
    </PixelizeButton>
  );
};
