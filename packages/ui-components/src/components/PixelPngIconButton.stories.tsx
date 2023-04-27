import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PixelPngIconButton } from "./PixelPngIconButton";
import HomeIcon from "../assets/icons/home.png";
import PlayIcon from "../assets/icons/play.png";
import ArrowIcon from "../assets/icons/pointer.png";
import SettingIcon from "../assets/icons/setting.png";
import ChatIcon from "../assets/icons/chat.png";

export default {
  title: "Example/PixelPngIconButton",
  component: PixelPngIconButton,

  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PixelPngIconButton>;

const Template: ComponentStory<typeof PixelPngIconButton> = (args) => (
  <PixelPngIconButton {...args} />
);

export const Home = Template.bind({});
Home.args = {
  imageUrl: HomeIcon,
};

export const Play = Template.bind({});
Play.args = {
  imageUrl: PlayIcon,
};

export const Arrow = Template.bind({});
Arrow.args = {
  imageUrl: ArrowIcon,
};

export const Setting = Template.bind({});
Setting.args = {
  imageUrl: SettingIcon,
};

export const Chat = Template.bind({});
Chat.args = {
  imageUrl: ChatIcon,
};

export const Orange = Template.bind({});
Orange.args = {
  imageUrl: HomeIcon,
  backgroundColor: "#f19d01",
};

export const Size = Template.bind({});
Size.args = {
  imageUrl: HomeIcon,
  size: 20,
};
