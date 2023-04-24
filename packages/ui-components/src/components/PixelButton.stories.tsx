import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PixelButton } from "./PixelButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/PixelButton",
  component: PixelButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PixelButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PixelButton> = (args) => (
  <PixelButton {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "PixelButton",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "PixelButton",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "PixelButton",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "PixelButton",
};
