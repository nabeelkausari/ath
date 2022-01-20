import React, { useEffect, useState } from 'react';

const Error = ({ error_link, download }) => {
  const [processing, setProcessing] = useState(true);
  const [processed, setProcessed] = useState(true);
  const [errorText, setErrorText] = useState(null);
  useEffect(() => {
    if (!download) {
      setProcessing(false);
      setProcessed(true);
      return;
    }
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    fetch(error_link.href, { method: 'GET', headers })
      .then((response) => response.text())
      .then((error_text) => {
        setProcessing(false);
        setProcessed(true);
        setErrorText(error_text);
      });
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <p style={{ margin: 0 }}>{errorText}</p>
    </div>
  );
};

export default Error;
