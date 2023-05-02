import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PixelButton } from "./PixelButton";

export default {
  title: "Example/PixelButton",
  component: PixelButton,

  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PixelButton>;

const Template: ComponentStory<typeof PixelButton> = (args) => (
  <PixelButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "PixelButton",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "한글 글씨체 테스트",
};

export const Size = Template.bind({});
Size.args = {
  label: "Game Start",
  fontSize: 120,
  backgroundColor: "#f19d01",
};


export const Orange = Template.bind({});
Orange.args = {
  label: "Game Start",
  backgroundColor: "#f19d01",
};
