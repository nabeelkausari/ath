import Box from '@mui/material/Box';
import React, { useEffect, useRef, useState } from 'react';

const SampleComponent = ({ children, onOutClick }) => {
  // const [clickedOutside, setClickedOutside] = useState(false);
  // const myRef = useRef();

  // const handleClickOutside = (e) => {
  //   if (
  //     !document.getElementById('__next').contains(e.target) ||
  //     e.target.classList.contains('MuiBackdrop-root')
  //   )
  //     return;
  //   if (!myRef.current.contains(e.target)) {
  //     onOutClick();
  //     e.stopPropagation();
  //   }
  // };

  // //   const handleClickInside = () => setOpen(true);

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => document.removeEventListener('click', handleClickOutside);
  // });

  return (
    <Box zIndex={1200}>
      <Box
        onClick={onOutClick}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1199,
        }}
      ></Box>
      {children}
    </Box>
  );
};

export default SampleComponent;
