import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import NoteBook from '../../sections/CourseStructure/components/NoteBook/NoteBook';
import { fetchNotebook } from '../../store/workspace/console/actions';

function ConsoleNoteBook() {
  const dispatch = useDispatch();
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { current_lesson } = useSelector((state) => state.courses);
  //   const link = current_lesson?._links?.notebook_console;
  const link = {
    accept: 'application/json',
    href: '/noteBook/3/user/5/console',
    method: 'GET',
  };
  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(fetchNotebook(link));
    }
  }, [my_profile_succeeded]);
  return (
    <Layout maxWidth="lg" title="Console | Rolai">
      <NoteBook />
    </Layout>
  );
}

export default ConsoleNoteBook;
