import React, { useEffect, useRef, useState } from 'react';

import { fetchLinkDirectly } from '../../../../../../../utils/api/fetch';
// import { icon_copy } from '../../../../../../../common/images';

const FileViewer = ({ function_language, code_type, file_link }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const copyCodeRef = useRef();

  useEffect(() => {
    readTextFile(file_link);
  }, [file_link]);

  const readTextFile = (file) => {
    fetchLinkDirectly(file)
      .then((response) => response.text())
      .then((t) => setText(t))
      .catch((reason) => console.log(reason.message))
      .finally(() => setLoading(false));
  };
  // const copyToClipboard = () => {
  //   copyCodeRef.current.select();
  //   document.execCommand('copy');
  // };

  const getLanguage = (fx_name, code_type) => {
    if (fx_name === undefined) {
      switch (code_type) {
        case 'LEARNRCODE':
          return 'R';
        case 'LEARNPYTHONCODE':
          return 'Python';
        default:
          return '';
      }
    }

    return fx_name;
  };
  return (
    <div className="file-container">
      <div className="file-container__header">
        <span className="language">
          Language : {getLanguage(function_language, code_type)}
        </span>
        <div className="copy">
          <textarea
            className="file-container__text-area-for-copy"
            value={text}
            onChange={console.log}
            ref={copyCodeRef}
          />
          {/*<img src={icon_copy} onClick={copyToClipboard} alt="copy" />*/}
        </div>
      </div>
      {loading ? (
        <div className="text">Loading...</div>
      ) : (
        <div className="text">{text === '' ? 'No Code Here' : text}</div>
      )}
    </div>
  );
};

export default FileViewer;
