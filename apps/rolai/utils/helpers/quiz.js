import { pad } from './pad';

export const getMinutesLeft = (time_left) =>
  pad(Math.floor(time_left / 60) || 0, 2);

export const getSecondsLeft = (time_left) => pad(time_left % 60 || 0, 2);

export const getQuizProgressValue = (time_left, actual_time) => 100 - (time_left / actual_time) * 100
