import { useRouter } from 'next/router';
import React from 'react';

import Performance from '../../../../sections/CourseStructure/components/Performance/Performance';
import StructureLayout from '../../../../sections/CourseStructure/components/StructureLayout/StructureLayout';

const PerformanceTab = () => {
  const router = useRouter();

  return (
    <StructureLayout>
      <Performance course_id={router?.query?.course_id} />
    </StructureLayout>
  );
};

export default PerformanceTab;
