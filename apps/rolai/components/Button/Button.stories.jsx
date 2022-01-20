import React from 'react';

import Button from './Button';

export default {
  title: 'LeapsUi/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};
