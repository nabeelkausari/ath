import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showDialog } from '../../../../store/global/actions';
import { discardNotebook } from '../../../../store/workspace/console/actions';
import useStyles from './NoteBook.styles';

const NoteBook = ({ consoleLink, ...props }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [isUrlLoading, setUrlLoading] = useState(true);
  const [discardConsole, setDiscardConsole] = useState(false);
  const {
    notebook_data: { title, path, _links },
    discard_notebook_requested,
    discard_notebook_succeeded,
    fetch_notebook_succeeded,
  } = useSelector((state) => state.workspace.console);
  const [showConsole, setShowConsole] = useState(true);

  useEffect(() => {
    if (consoleLink) {
      dispatch(
        showDialog({
          options: {
            title: 'Are you sure you want to reload the original notebook?',
            subtitle:
              'All the local changes made in the notebook will be lost.',
            yes_button: {
              text: 'Confirm',
              onClick: () => {
                discardConsoleData;
              },
            },
            no_button: {
              text: 'Close',
              onClick: () => {
                () => setDiscardConsole(false);
              },
            },
            items_centered: true,
          },
        })
      );
    }
  }, [consoleLink]);
  useEffect(() => {
    if (fetch_notebook_succeeded) {
      setUrlLoading(false);
    }
    if (discard_notebook_requested) {
      setUrlLoading(true);
    }
    if (discard_notebook_succeeded) {
      setShowConsole(false);
      setTimeout(() => {
        setShowConsole(true);
        setUrlLoading(false);
      }, 2000);
    }
  }, [
    fetch_notebook_succeeded,
    discard_notebook_requested,
    discard_notebook_succeeded,
  ]);

  useEffect(() => {
    if (discardConsole) {
    }
  }, [discardConsole]);
  const discardConsoleData = () => {
    setDiscardConsole(!discardConsole);
    dispatch(discardNotebook(_links?.reset_notebook));
  };

  return (
    <div className="console-container_window mobile-case">
      {isUrlLoading && (
        <div>
          <h3 className="loader_content">
            <p>Please wait.....</p>
            <p>Console is loading.....</p>
          </h3>
          {/* <Loader loading={ isUrlLoading }/> */}
        </div>
      )}
      {!isUrlLoading && (
        <div className="console-container--sub-header">
          <div className="console-container--sub-header__content">
            <h4>{title ? title : 'Practice Notebook'}</h4>
          </div>
          <button
            className="actions-container__discard-btn"
            onClick={() => setDiscardConsole(!discardConsole)}
            disabled={discard_notebook_requested}
          >
            Reset Notebook
          </button>
        </div>
      )}
      {showConsole && (
        <div className="console-container">
          <iframe
            title="console"
            src={path}
            id="myIFrame"
            className="ath-console"
          />
        </div>
      )}
    </div>
  );
};

export default NoteBook;
