import React from 'react';

import CardDetails from '../../../CourseDetails/CardDetails/CardDetails';

const Courses = ({ courses = [] }) =>
  courses.map((course, index) => {
    return (
      <div key={index} className="card-wrapper">
        <div className="leftcard">
          <div className={`border-line ${index === 0 ? 'hidden' : ''}`} />
          <div className="label">{index + 1}</div>
          <div
            className={`border-line ${
              index === courses.length - 1 ? 'hidden' : ''
            }`}
          />
        </div>
        <div className="rightside">
          <CardDetails course={course} isTrack={true} />
        </div>
      </div>
    );
  });

export default Courses;
