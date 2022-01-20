import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../components/Layout';
import ProjectDetails from '../../../sections/ProjectDetails/ProjectDetails/ProjectDetails';
import { clearCase, getCase } from '../../../store/cases/actions';

function Projects() {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { project } = useSelector((state) => state.cases);

  useEffect(() => {
    if (my_profile_succeeded && query?.project_id) {
      dispatch(getCase(query.project_id));
    }
  }, [my_profile_succeeded, query?.project_id]);

  useEffect(() => {
    return () => dispatch(clearCase());
  }, []);

  return (
    <>
      <Layout
        isBanner={false}
        container={false}
        title={project.name ? `${project.name} | Rolai` : 'Rolai'}
      >
        <ProjectDetails />
      </Layout>
    </>
  );
}

export default Projects;
