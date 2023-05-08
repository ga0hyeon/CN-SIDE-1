import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Timer } from "./Timer";

export default {
  title: "Example/Timer",
  component: Timer,
  argTypes: {
    position: {
      options: ["top", "center", "bottom"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

const onTimeout = () => {
  alert("TEST!!");
};

export const Basic = Template.bind({});
Basic.args = {
  time: 40,
  color: "red",
  opacity: 0.2,
  size: 120,
  position: "center",
  onTimeout: onTimeout,
};