import { useRouter } from 'next/router';
import React from 'react';

import MyLibrary from '../../../../sections/CourseStructure/components/MyLibrary/MyLibrary';
import StructureLayout from '../../../../sections/CourseStructure/components/StructureLayout/StructureLayout';

const CourseMyLibrary = () => {
  const router = useRouter();

  return (
    <StructureLayout>
      <MyLibrary course_id={router?.query?.course_id} />
    </StructureLayout>
  );
};

export default CourseMyLibrary;
