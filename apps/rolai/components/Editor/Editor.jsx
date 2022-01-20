import cx from 'classnames';
import dynamic from 'next/dynamic';
import React from 'react';

import { config as defaultConfig } from './config';

const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg'), // must be first import since we are doing values[0] in return
      import('froala-editor/js/froala_editor.pkgd.min.js'),
      import('froala-editor/js/plugins.pkgd.min.js'),
      import('froala-editor/js/plugins/align.min.js'),
      import('froala-editor/js/plugins/char_counter.min.js'),
      import('froala-editor/js/plugins/code_beautifier.min.js'),
      import('froala-editor/js/plugins/code_view.min.js'),
      import('froala-editor/js/plugins/colors.min.js'),
      import('froala-editor/js/plugins/draggable.min.js'),
      import('froala-editor/js/plugins/edit_in_popup.min.js'),
      import('froala-editor/js/plugins/emoticons.min.js'),
      import('froala-editor/js/plugins/entities.min.js'),
      import('froala-editor/js/plugins/file.min.js'),
      import('froala-editor/js/plugins/font_family.min.js'),
      import('froala-editor/js/plugins/font_size.min.js'),
      import('froala-editor/js/plugins/forms.min.js'),
      import('froala-editor/js/plugins/fullscreen.min.js'),
      import('froala-editor/js/plugins/help.min.js'),
      import('froala-editor/js/plugins/image.min.js'),
      import('froala-editor/js/plugins/image_manager.min.js'),
      import('froala-editor/js/plugins/inline_class.min.js'),
      import('froala-editor/js/plugins/inline_style.min.js'),
      import('froala-editor/js/plugins/inline_style.min.js'),
      import('froala-editor/js/plugins/line_breaker.min.js'),
      import('froala-editor/js/plugins/line_height.min.js'),
      import('froala-editor/js/plugins/link.min.js'),
      import('froala-editor/js/plugins/lists.min.js'),
      import('froala-editor/js/plugins/paragraph_format.min.js'),
      import('froala-editor/js/plugins/paragraph_style.min.js'),
      import('froala-editor/js/plugins/print.min.js'),
      import('froala-editor/js/plugins/quick_insert.min.js'),
      import('froala-editor/js/plugins/quote.min.js'),
      import('froala-editor/js/plugins/save.min.js'),
      import('froala-editor/js/plugins/special_characters.min.js'),
      import('froala-editor/js/plugins/table.min.js'),
      import('froala-editor/js/plugins/url.min.js'),
      import('froala-editor/js/plugins/video.min.js'),
      import('froala-editor/js/plugins/word_paste.min.js'),
    ]);
    return values[0];
  },
  {
    loading: () => <p>Loading..</p>,
    ssr: false,
  }
);

const Editor = ({
  content,
  controlled,
  handleContentChange,
  onBlur,
  config,
  editorClassName = '',
}) => (
  <FroalaEditor
    className={cx([
      {
        'editor-features-controlled': controlled,
      },
      editorClassName,
    ])}
    tag="textarea"
    model={content}
    onModelChange={handleContentChange}
    config={{
      ...defaultConfig,
      ...config,
      events: {
        ...defaultConfig.events,
        blur: () => {
          onBlur && onBlur();
        },
      },
    }}
  />
);

export default Editor;
