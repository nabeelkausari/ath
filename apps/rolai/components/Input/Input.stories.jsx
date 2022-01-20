import React from 'react';

import Input from './Input';
export default {
  title: 'LeapsUi/Input',
  component: Input,
};

const Template = (args) => <Input {...args}>Button</Input>;

export const Text = Template.bind({});
Text.args = {
  type: 'text',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
};
