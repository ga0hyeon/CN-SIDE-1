import React from "react";

import { PixelPngIconButton } from "./PixelPngIconButton";
import HomeIcon from "../assets/icons/home.png";
import PlayIcon from "../assets/icons/play.png";
import ArrowIcon from "../assets/icons/pointer.png";
import SettingIcon from "../assets/icons/setting.png";
import ChatIcon from "../assets/icons/chat.png";

interface PixelIconButtonProps {
  type: "home" | "play" | "arrow" | "setting" | "chat";
  size?: number;
  imageUrl?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const iconList = {
  "home" : HomeIcon,
  "play" : PlayIcon,
  "arrow": ArrowIcon,
  "setting" : SettingIcon,
  "chat" : ChatIcon
}

export const PixelIconButton = ({
  type,
  ...props
}: PixelIconButtonProps) => {
  return (
    <PixelPngIconButton imageUrl={iconList[type]} {...props}></PixelPngIconButton>
  );
};
