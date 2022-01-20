import React from 'react';

import TransitionsModal from './Modal';

export default {
  title: 'LeapsUI/Modal',
  component: TransitionsModal,
};

const Template = (args) => <TransitionsModal {...args} />;

export const handleModalOpen = Template.bind({});
handleModalOpen.args = {
  open: true,
};

export const handleModalClose = Template.bind({});
handleModalClose.args = {
  open: false,
};
