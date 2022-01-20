import { useRouter } from 'next/router';
import React from 'react';

import Disscussions from '../../../../sections/CourseStructure/components/Disscussions/Disscussions';
import Performance from '../../../../sections/CourseStructure/components/Performance/Performance';
import StructureLayout from '../../../../sections/CourseStructure/components/StructureLayout/StructureLayout';

const DisscussionTab = () => {
  const router = useRouter();

  return (
    <StructureLayout>
      <Disscussions course_id={router?.query?.course_id} />
    </StructureLayout>
  );
};

export default DisscussionTab;
