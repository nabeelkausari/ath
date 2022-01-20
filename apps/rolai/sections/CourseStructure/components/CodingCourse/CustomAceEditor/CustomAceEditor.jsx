import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import React from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';

import { onConsoleEditorDataChange } from '../../../../../store/courses/coding_course/actions';
import useStyles from './CustomAceEditor.styles';

const AceEditor = dynamic(
  async () => {
    const reactAce = await import('react-ace');
    await import('ace-builds/src-noconflict/ext-language_tools');
    await import('ace-builds/src-noconflict/mode-python');
    await import('ace-builds/src-noconflict/theme-tomorrow');
    let ace = require('ace-builds/src-min-noconflict/ace');
    ace.config.set(
      'basePath',
      'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/'
    );
    ace.config.setModuleUrl(
      'ace/mode/javascript_worker',
      'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-javascript.js'
    );
    return reactAce;
  },
  {
    ssr: false,
  }
);

const CustomAceEditor = ({
  value = '',
  readOnly = false,
  fullScreen = false,
  onCodeChange = (e) => dispatch(onConsoleEditorDataChange(e)),
  ...props
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <Box
      className={cx([styles.editorWrapper, fullScreen && styles.fullScreen])}
    >
      <AceEditor
        placeholder=""
        mode="python"
        theme="tomorrow"
        name="blah2"
        onLoad={() => {}}
        onChange={onCodeChange}
        fontSize="11"
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          readOnly: readOnly,
        }}
      />
    </Box>
  );
};

export default CustomAceEditor;
