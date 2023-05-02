import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PixelIconButton } from "./PixelIconButton";

export default {
  title: "Example/PixelIconButton",
  component: PixelIconButton,
  argTypes: {
    type: {
      options: ["home", "play", "arrow", "setting", "chat"],
      control: { type: 'radio' },
    } ,
  },
} as ComponentMeta<typeof PixelIconButton>;

const Template: ComponentStory<typeof PixelIconButton> = (args) => (
  <PixelIconButton {...args} />
);


export const Home = Template.bind({});
Home.args = {
  type: "home",
  size: 20,
  backgroundColor: "#f19d01",
};
