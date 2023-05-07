import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FlipCard } from "./FlipCard";

export default {
  title: "Example/FlipCard",
  component: FlipCard,
  argTypes: {
    type: {
      options: ["circle", "square"],
      control: { type: 'radio' },
    } ,
    frontColor: { control: "color" },
    backColor: { control: "color" },
  },
} as ComponentMeta<typeof FlipCard>;

const Template: ComponentStory<typeof FlipCard> = (args) => (
  <FlipCard {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  front: <h1>앞면</h1>,
  frontColor: "tomato",
  back: <h1>뒷면</h1>,
  backColor: "royalblue",
};

export const Circle = Template.bind({});
Circle.args = {
  front: <h1>앞면</h1>,
  frontColor: "tomato",
  back: <h1>뒷면</h1>,
  backColor: "royalblue",
  type: "circle",
};
