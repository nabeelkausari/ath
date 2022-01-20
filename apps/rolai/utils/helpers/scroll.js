import { useEffect, useState } from 'react';

export const SCROLL_DIRECTION_DOWN = 'SCROLL_DIRECTION_DOWN';
export const SCROLL_DIRECTION_UP = 'SCROLL_DIRECTION_UP';
export const SCROLL_DIRECTION_NONE = 'SCROLL_DIRECTION_NONE';

export const useScrollDirection = (callback) => {
  const handleTouchStart = ({ wheelDeltaX, wheelDeltaY }) => {
    if (wheelDeltaY > 10 || wheelDeltaX > 10) callback(-1);
    else if (wheelDeltaY < -10 || wheelDeltaX < -10) callback(1);
    else if (wheelDeltaY > -5 || wheelDeltaX < 5) callback(undefined);
  };
  useEffect(() => {
    const elem = document.getElementById('calendar-scroll');
    if (elem) elem.addEventListener('wheel', handleTouchStart);
    return () => elem.removeEventListener('wheel', handleTouchStart);
  }, []);
};

export const useScrollPosition = (callback) => {
  const handleScroll = () => {
    callback(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
};
