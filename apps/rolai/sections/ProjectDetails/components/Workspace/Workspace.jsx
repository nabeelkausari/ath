import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GlobalDialog from '../../../../components/GlobalDialog/GlobalDialog';
import { getMyProfile, isLoggedIn } from '../../../../store/auth/actions';
import {
  getAllCollaborators,
  getAllUsers,
  getProjectCollaborators,
} from '../../../../store/collaborators/actions';
import { updateCurrentLesson } from '../../../../store/courses/actions';
import { clearSolve } from '../../../../store/workspace/actions';
import { getContentData } from '../../../CourseStructure/components/ModuleLessons/ModuleLessons';
import useStyles from './Workspace.styles';
import WorkspaceBody from './WorkspaceBody/WorkspaceBody';
import WorkspaceHeader from './WorkspaceHeader/WorkspaceHeader';

const Workspace = ({ children }) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { my_profile_succeeded, my_profile, is_logged_in, is_logged_in_check } =
    useSelector((state) => state.auth);
  const { fetch_all_users_succeeded } = useSelector(
    (state) => state.collaborators
  );

  useEffect(() => {
    dispatch(isLoggedIn());

    return () => dispatch(clearSolve());
  }, []);

  useEffect(() => {
    if (is_logged_in_check && !is_logged_in) {
      return router.push('/');
    }
  }, [is_logged_in_check, is_logged_in]);

  useEffect(() => {
    if (is_logged_in && !my_profile) {
      dispatch(getMyProfile());
    }
  }, [is_logged_in, my_profile]);

  useEffect(() => {
    if (fetch_all_users_succeeded)
      getProjectCollaborators(router?.query?.project_id);
  }, [fetch_all_users_succeeded]);

  return (
    <>
      <GlobalDialog />
      <WorkspaceHeader />
      <WorkspaceBody className={styles.tabPanel}>{children}</WorkspaceBody>
    </>
  );
};

export default Workspace;
