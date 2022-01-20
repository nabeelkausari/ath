import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMaterial, saveMaterial } from '../../store/material/actions';
import Button from '../Button';
import Editor from '../Editor/Editor';
import EditorView from '../Editor/EditorView';

const Material = ({
  material_link,
  update_link,
  controlled,
  course_content = false,
  editorClassName,
}) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState('');
  const {
    by_uri,
    fetch_material_succeeded,
    update_material_succeeded,
    update_material_requested,
    fetch_material_requested,
  } = useSelector((state) => state.material);
  const show_edit_button = !editing && update_link;

  useEffect(() => {
    if (!by_uri[material_link?.href]) {
      dispatch(fetchMaterial(material_link));
    } else {
      handleSetContent();
    }
  }, [JSON.stringify(material_link)]);

  useEffect(() => {
    if (fetch_material_succeeded || update_material_succeeded) {
      handleSetContent();
    }
  }, [fetch_material_succeeded, update_material_succeeded]);

  const handleSetContent = () => {
    setContent(by_uri[material_link?.href]?.text);
  };

  const hideEditor = () => {
    handleSetContent();
    setEditing(false);
  };

  const editMaterial = () => {
    setEditing(true);
  };

  const handleSaveMaterial = () => {
    dispatch(saveMaterial(update_link, content, material_link?.href));
    hideEditor();
  };

  if (!material_link) return null;

  return (
    <div
      className={cx('course-material', {
        'course-material--course-content': course_content,
      })}
    >
      {/*<Loader loading={fetch_material_requested} is_component={true} />*/}
      {update_link && (
        <div className="course-material__actions-wrapper">
          {show_edit_button && (
            <Button
              variant="outlined"
              size="sm"
              onClick={editMaterial}
              className="course-material__btn--edit"
            >
              Edit
            </Button>
          )}
          {editing && (
            <Button
              variant="outlined"
              size="sm"
              onClick={hideEditor}
              className="course-material__btn--cancel"
            >
              Cancel
            </Button>
          )}
          {editing && (
            <Button
              size="sm"
              onClick={handleSaveMaterial}
              className="course-material__btn--save"
            >
              Save
            </Button>
          )}
        </div>
      )}

      <div
        className={cx('course-material__editor-wrapper', {
          'editor-features-controlled': controlled,
        })}
      >
        {update_material_requested ? (
          <p>Updating...</p>
        ) : editing ? (
          <Editor
            content={content}
            controlled={controlled}
            handleContentChange={setContent}
            editorClassName={editorClassName}
          />
        ) : (
          <EditorView
            content={content}
            controlled={controlled}
            editorClassName={editorClassName}
          />
        )}
      </div>
    </div>
  );
};

export default Material;
