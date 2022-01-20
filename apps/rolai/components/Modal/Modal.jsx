import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import React from 'react';

import Login from '../../sections/Login/Login';
import useStyles from './Modal.styles';

export default function TransitionsModal({ closeModal, Component, open }) {
  const styles = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={styles.paper}>{Component}</div>
    </Modal>
  );
}
