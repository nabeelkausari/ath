import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchConsole,
  unSetConsoleUrl,
} from '../../../../../store/workspace/console/actions';
import useStyles from './Console.styles';
// import Loader from "../../../../../components/Loader";
// import ConsoleIntro from "./ConsoleIntro";

const Console = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const consoleFetchInterval = useRef(null);
  const { console } = useSelector((state) => state.workspace);
  const {
    fetch_console_succeeded,
    fetch_console_error,
    console_url,
    no_console_url,
    console_loading,
  } = console;

  useEffect(() => {
    consoleFetchInterval.current = setInterval(
      () => dispatch(fetchConsole()),
      2000
    );

    window.onbeforeunload = () => {
      return null;
    };

    return () => {
      dispatch(unSetConsoleUrl());
      clearInterval(consoleFetchInterval.current);
    };
  }, []);

  useEffect(() => {
    // if (
    //   (fetch_scenario_details_succeeded &&
    //     fetch_scenario_details_succeeded !==
    //     prevProps.fetch_scenario_details_succeeded) ||
    //   (fetch_solve_details_succeeded &&
    //     fetch_solve_details_succeeded !==
    //     prevProps.fetch_solve_details_succeeded)
    // ) {
    //   fetchConsole();
    // }

    // if (reload_console !== prevProps.reload_console) {
    //   this.forceUpdate();
    // }

    if (
      fetch_console_succeeded ||
      fetch_console_error ||
      (no_console_url && consoleFetchInterval.current)
    ) {
      clearInterval(consoleFetchInterval.current);
    }
  }, [
    fetch_console_succeeded,
    fetch_console_error,
    no_console_url,
    consoleFetchInterval.current,
  ]);

  return (
    <div className={styles.console}>
      {/*<Loader loading={console_loading || fetch_solve_details_loading} />*/}
      {console_loading ? (
        <CardSkeleton />
      ) : (
        console_url && (
          <iframe
            title="console"
            src={console_url}
            id="myIFrame"
            className="ath-console"
          />
        )
      )}
    </div>
  );
};

export default Console;

const CardSkeleton = () => {
  return (
    <Box height={300} margin={4}>
      <Skeleton
        variant="rectangular"
        style={{ margin: '10px' }}
        // width={'100%'}
        height={50}
      />
      <Skeleton
        variant="rectangular"
        style={{ margin: '10px' }}
        // width={'100%'}
        height={50}
      />
      <Skeleton
        variant="rectangular"
        style={{ margin: '10px' }}
        // width={'100%'}
        height={300}
      />
    </Box>
  );
};
