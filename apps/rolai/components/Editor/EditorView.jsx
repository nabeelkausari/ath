import cx from 'classnames';
import dynamic from 'next/dynamic';
import React from 'react';

import { config } from './config';

const FroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg/FroalaEditorView'),
    ]);
    return values[0];
  },
  {
    loading: () => <p>Loading..</p>,
    ssr: false,
  }
);

const EditorView = ({ content, controlled, editorClassName = '' }) => (
  <div
    className={cx([
      {
        'editor-features-controlled': controlled,
      },
      editorClassName,
    ])}
  >
    <FroalaEditorView model={content} config={config} />
  </div>
);

export default EditorView;
