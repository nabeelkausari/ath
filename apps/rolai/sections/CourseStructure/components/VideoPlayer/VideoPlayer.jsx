import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showDialog } from '../../../../store/global/actions';
import useStyles from './VideoPlayer.styles';

const VideoPlayer = ({ link, src, controls, ...props }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isVideoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    if (src) checkVideoLoaded();
  }, [src]);

  const checkVideoLoaded = () => {
    let video = document.getElementById('video-player-element');
    if (video?.readyState !== 4 && video?.readyState !== 3) {
      setTimeout(checkVideoLoaded, 1000);
    } else {
      setVideoLoading(false);
    }
  };

  const handleOpenConsole = async () => {
    let video = document.getElementById('video-player-element');
    if (
      'pictureInPictureEnabled' in document &&
      document.pictureInPictureEnabled &&
      !video.disablePictureInPicture
    ) {
      try {
        await video
          .requestPictureInPicture()
          .catch((err) => console.error(err));
        handleRedirectUrl();
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(
        showDialog({
          options: {
            title: 'Information',
            subtitle:
              'Open the video in Picture-in-Picture mode to view the video as you practice on the console.',
            yes_button: {
              text: 'Continue',
              onClick: () => {
                dispatch(getModeData(mode, modeData));
                return true;
              },
            },
            no_button: {
              text: 'Close',
            },
            items_centered: true,
          },
        })
      );
      handleRedirectUrl();
    }
  };

  const handleRedirectUrl = () => {
    window.open('/notebook', '_blank', 'noreferrer');
  };

  return (
    <Box className={styles.videoPlayer}>
      {/* <Box className={styles.consoleBtn}>
        <Typography>
          Learn & Apply - practice on the go
        </Typography>
        <Button
          onClick={handleOpenConsole}
          variant="contained"
          size="xl"
          id="PiP"
          className="open_console__btn"
          // disabled = {isVideoLoading}
        >
          OPEN CODING CONSOLE
        </Button>
      </Box> */}
      <video
        controls
        id="video-player-element"
        className={styles.videoPlayerVideo}
      >
        <source src={link} />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoPlayer;
