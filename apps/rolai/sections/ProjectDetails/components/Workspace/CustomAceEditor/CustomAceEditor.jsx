import Box from '@mui/material/Box';
import React from 'react';
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";

import useStyles from './CustomAceEditor.styles';

const CustomAceEditor = () => {
  const styles = useStyles();

  return (
      <Box className={styles.editorWrapper}>
          CustomAceEditor
        {/* <AceEditor
            placeholder="Placeholder Text"
            mode="python"
            theme="github"
            name="blah2"
            // onLoad={()=>onLoad}
            // onChange={()=>onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={false}
            highlightActiveLine={true}
            value={`function onLoad(editor) {
            console.log("i've loaded");
            }`}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}
        /> */}
      </Box>
  );
};

export default CustomAceEditor;
