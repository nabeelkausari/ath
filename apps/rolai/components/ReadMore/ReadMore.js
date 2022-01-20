import cx from 'classnames';
import debounce from 'lodash/debounce';
import React, { useEffect, useRef, useState } from 'react';

const ELLIPSES = '…';
const SPACE_CHARACTER = ' ';
const READ_MORE_LABEL = 'Read More';
const SHOW_LESS_LABEL = 'Show Less';

const ReadMore = ({
  text = '',
  lineHeight = 1.5,
  numberOfLines = 2,
  flexibleContainer = true,
  showLessButton = true,
  readMoreLabel = READ_MORE_LABEL,
  showLessLabel = SHOW_LESS_LABEL,
  ellipses = ELLIPSES,
  className,
}) => {
  const [state, setState] = useState({
    showingAllText: false,
    readMoreText: text,
    readMoreAction: null,
  });
  const { showingAllText, readMoreText, readMoreAction } = state;
  const readMoreWrapper = useRef(null);
  let maxHeight = numberOfLines * lineHeight;
  let style = {
    lineHeight,
    maxHeight: !!showingAllText ? 'none' : `${maxHeight}em`,
  };

  useEffect(() => {
    _updateContent();
    if (flexibleContainer) {
      window.addEventListener('resize', _handleResize);
    }

    return () => {
      if (flexibleContainer) {
        window.removeEventListener('resize', _handleResize, false);
      }
    };
  }, []);

  useEffect(() => {
    _updateContent();

    console.log(
      readMoreWrapper.current?.scrollHeight,
      readMoreWrapper.current?.offsetHeight,
      readMoreText
    );
  }, [
    readMoreText,
    readMoreWrapper?.current?.scrollHeight,
    readMoreWrapper?.current?.offsetHeight,
  ]);

  const _getHasTooMuchContent = () => {
    return (
      readMoreWrapper.current.scrollHeight >
      readMoreWrapper.current.offsetHeight
    );
  };

  const _handleResize = debounce(() => {
    if (!!showingAllText) return;

    setState({ ...state, readMoreText: text, readMoreAction: null });
    setTimeout(() => _cleanupResize());
  }, 200);

  const _cleanupResize = () => {
    if (!!showingAllText) {
      _toggleReadMore(showingAllText, true);
    }
    _updateContent();
  };
  useEffect(() => {
    console.log('showing all text: ', showingAllText);
  }, [showingAllText]);

  const _toggleReadMore = (showAllTxt, forceHide) => {
    const _showingAllText = !!forceHide || !!showAllTxt;
    const _readMoreAction = _getActionElement(!_showingAllText);
    const _readMoreText = _showingAllText ? readMoreText : text;

    setState({
      ...state,
      readMoreText: _readMoreText,
      readMoreAction: _readMoreAction,
      showingAllText: !_showingAllText,
    });
  };

  const _updateContent = () => {
    const hasTooMuchContent = _getHasTooMuchContent();

    if (hasTooMuchContent) {
      const _readMoreAction = _getActionElement(showingAllText);
      let teaserWordsArray = readMoreText.trim().split(SPACE_CHARACTER);
      teaserWordsArray.pop();
      const trimmedText = `${teaserWordsArray.join(SPACE_CHARACTER)}`;
      const _readMoreText = `${trimmedText}${ellipses}`;

      setState({
        ...state,
        readMoreText: _readMoreText,
        readMoreAction: _readMoreAction,
      });
    }
  };

  const _getActionElement = (showingAllText) => {
    let buttonLabel = showingAllText ? showLessLabel : readMoreLabel;

    if (showingAllText && !showLessButton) {
      return;
    }

    return (
      <button
        onClick={() => _toggleReadMore(showingAllText)}
        className="read-more__button"
      >
        {buttonLabel}
      </button>
    );
  };

  return (
    <div
      style={style}
      className={cx(['read-more', className])}
      ref={readMoreWrapper}
    >
      {readMoreText} {readMoreAction}
    </div>
  );
};

export default ReadMore;
