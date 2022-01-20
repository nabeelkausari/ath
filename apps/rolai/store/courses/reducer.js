import { combineReducers } from 'redux';
import concatenateReducers from 'redux-concatenate-reducers';

import { USER_LOGOUT } from '../auth/types';
import codingReducer from './coding_course/reducer';
import quizReducer from './quiz/reducer';
import * as types from './types';

const initialState = {
  my_org_courses_requested: null,
  my_org_courses_succeeded: null,
  my_org_courses_failed: null,
  my_org_courses: [],
  enroll_course_requested: null,
  enroll_course_succeeded: null,
  enroll_course_failed: null,
  course_requested: true,
  course_failed: null,
  course_succeeded: null,
  course: {
    overview: {},
  },
  course_syllabus_requested: null,
  course_syllabus_failed: null,
  course_syllabus_succeeded: null,
  course_syllabus_overview: null,
  course_syllabus: null,
  course_reviews_requested: null,
  course_reviews_failed: null,
  course_reviews_succeeded: null,
  course_reviews: null,
  course_notes_requested: null,
  course_notes_failed: null,
  course_notes_succeeded: null,
  course_notes: {},
  lesson_notes: {
    general_notes: [],
  },
  course_bookmarks_requested: null,
  course_bookmarks_failed: null,
  course_bookmarks_succeeded: null,
  course_bookmarks: {},
  course_notes_popup: false,
  current_lesson: {},
  saved_lessons_requested: null,
  saved_lessons_succeeded: null,
  saved_lessons_failed: null,
  saved_lessons: [],
};

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.MY_ORGANIZATION_COURSES:
      return {
        ...state,
        my_org_courses_requested: true,
        my_org_courses_failed: null,
        my_org_courses_succeeded: null,
      };
    case types.TOGGLE_COURSE_NOTES_POPUP:
      return {
        ...state,
        course_notes_popup: payload,
      };
    case types.MY_ORGANIZATION_COURSES_SUCCESS:
      return {
        ...state,
        my_org_courses_requested: false,
        my_org_courses_succeeded: true,
        my_org_courses: payload,
      };
    case types.MY_ORGANIZATION_COURSES_ERROR:
      return {
        ...state,
        my_org_courses_requested: false,
        my_org_courses_succeeded: false,
        my_org_courses_failed: true,
      };
    case types.CLEAR_COURSE:
      return {
        ...state,
        course_requested: null,
        course_failed: null,
        course_succeeded: null,
        course: initialState.course,

        course_syllabus_requested: null,
        course_syllabus_failed: null,
        course_syllabus_succeeded: null,
        course_syllabus: initialState.course_syllabus,

        course_reviews_requested: null,
        course_reviews_failed: null,
        course_reviews_succeeded: null,
        course_reviews: initialState.course_reviews,
      };
    case types.GET_COURSE:
      return {
        ...state,
        course_requested: true,
        course_failed: null,
        course_succeeded: null,
      };
    case types.GET_COURSE_SUCCESS:
      return {
        ...state,
        course_requested: false,
        course_succeeded: true,
        course: payload,
      };
    case types.GET_COURSE_ERROR:
      return {
        ...state,
        course_requested: false,
        course_succeeded: false,
        course_failed: true,
      };
    case types.GET_COURSE_NOTES:
      return {
        ...state,
        course_notes_requested: true,
        course_notes_failed: null,
        course_notes_succeeded: null,
      };
    case types.GET_COURSE_NOTES_SUCCESS:
      return {
        ...state,
        course_notes_requested: false,
        course_notes_succeeded: true,
        course_notes: payload,
      };
    case types.GET_COURSE_NOTES_ERROR:
      return {
        ...state,
        course_notes_requested: false,
        course_notes_succeeded: false,
        course_notes_failed: true,
      };

    case types.GET_LESSON_NOTES_SUCCESS:
      return {
        ...state,
        lesson_notes: payload,
      };
    case types.SET_CURRENT_LESSON:
      return {
        ...state,
        current_lesson: payload,
      };
    case types.UPDATE_CURRENT_LESSON_MILESTONES:
      return {
        ...state,
        current_lesson: {
          ...state.current_lesson,
          milestones: payload,
        },
      };
    case types.ADD_LESSON_NOTES_SUCCESS: {
      return {
        ...state,
        lesson_notes: {
          ...state.lesson_notes,
          general_notes: [
            ...payload.general_notes,
            ...(state.lesson_notes.general_notes || []),
          ],
        },
        current_lesson: {
          ...state.current_lesson,
          total_notes_count: (state.current_lesson.total_notes_count || 0) + 1,
        },
      };
    }
    case types.DELETE_LESSON_NOTES_SUCCESS: {
      return {
        ...state,
        lesson_notes: {
          ...state.lesson_notes,
          general_notes: state.lesson_notes.general_notes.filter(
            (el) => el.note_id !== payload.note_id
          ),
        },
        current_lesson: {
          ...state.current_lesson,
          total_notes_count: state.current_lesson.total_notes_count
            ? state.current_lesson.total_notes_count - 1
            : 0,
        },
      };
    }
    case types.UPDATE_LESSON_NOTES_SUCCESS:
      return {
        ...state,
        lesson_notes: {
          ...state.lesson_notes,
          general_notes: state.lesson_notes.general_notes.map((el) =>
            el.note_id === payload.general_notes[0].note_id
              ? payload.general_notes[0]
              : el
          ),
        },
      };

    case types.DELETE_COURSE_NOTES_SUCCESS: {
      let notes = state.course_notes;
      let index = notes.findIndex(
        (el) => el.module_seq_id == payload.module_seq_id
      );
      notes[index].general_notes = notes[index].general_notes.filter(
        (el) => el.note_id !== payload.note_id
      );

      return {
        ...state,
        course_notes: notes,
      };
    }
    case types.UPDATE_COURSE_NOTES_SUCCESS: {
      let notes = state.course_notes;
      let index = notes.findIndex(
        (el) => el.module_seq_id == payload.module_seq_id
      );
      notes[index].general_notes = notes[index].general_notes.map((el) =>
        el.note_id === payload.general_notes[0].note_id
          ? payload.general_notes[0]
          : el
      );
      return {
        ...state,
        course_notes: notes,
      };
    }

    case types.SAVE_LESSON_SUCCESS: {
      return {
        ...state,
        saved_lessons: [...state.saved_lessons, payload],
      };
    }
    case types.UNDOSAVED_LESSON_SUCCESS: {
      return {
        ...state,
        saved_lessons: [
          ...state.saved_lessons.filter((i) => i.module_seq_id != payload),
        ],
      };
    }
    case types.CLEAR_LESSON_NOTES:
      return {
        ...state,
        lesson_notes: [],
      };

    case types.GET_COURSE_BOOKMARKS:
      return {
        ...state,
        course_bookmarks_requested: true,
        course_bookmarks_failed: null,
        course_bookmarks_succeeded: null,
      };
    case types.GET_COURSE_BOOKMARKS_SUCCESS:
      return {
        ...state,
        course_bookmarks_requested: false,
        course_bookmarks_succeeded: true,
        course_bookmarks: payload,
      };
    case types.GET_COURSE_BOOKMARKS_ERROR:
      return {
        ...state,
        course_bookmarks_requested: false,
        course_bookmarks_succeeded: false,
        course_bookmarks_failed: true,
      };
    case types.GET_COURSE_SYLLABUS:
      return {
        ...state,
        course_syllabus_requested: true,
        course_syllabus_failed: null,
        course_syllabus_succeeded: null,
      };
    case types.GET_COURSE_SYLLABUS_SUCCESS:
      const overview = [];
      const syllabus = [];
      const assessments = [];
      payload.forEach(({ module_contents, ...module }) => {
        if (module.module_type === 'ASSESSMENT') {
          assessments.push({
            ...module,
          });
        } else {
          overview.push({
            ...module,
            overview: module_contents.find((m) => m.type === 'MATERIAL'),
          });
          syllabus.push({
            ...module,
            module_contents: module_contents.filter((m) => m.type !== 'MATERIAL'),
          });
        }
      });
      return {
        ...state,
        course_syllabus_requested: false,
        course_syllabus_succeeded: true,
        course_syllabus_overview: overview,
        course_syllabus_assessments: assessments,
        course_syllabus: syllabus,
      };
    case types.GET_COURSE_SYLLABUS_ERROR:
      return {
        ...state,
        course_syllabus_requested: false,
        course_syllabus_succeeded: false,
        course_syllabus_failed: true,
      };
    case types.GET_COURSE_REVIEWS:
      return {
        ...state,
        course_reviews_requested: true,
        course_reviews_failed: null,
        course_reviews_succeeded: null,
      };
    case types.GET_COURSE_REVIEWS_SUCCESS:
      return {
        ...state,
        course_reviews_requested: false,
        course_reviews_succeeded: true,
        course_reviews: payload,
      };
    case types.GET_COURSE_REVIEWS_ERROR:
      return {
        ...state,
        course_reviews_requested: false,
        course_reviews_succeeded: false,
        course_reviews_failed: true,
      };
    case types.ENROLL_COURSE:
      return {
        ...state,
        enroll_course_requested: true,
        enroll_course_failed: null,
        enroll_course_succeeded: null,
      };
    case types.ENROLL_COURSE_SUCCESS:
      return {
        ...state,
        enroll_course_requested: false,
        enroll_course_succeeded: true,
        course: payload,
        my_org_courses: state.my_org_courses.map((course) => ({
          ...(course.code === payload.code ? payload : course),
        })),
      };
    case types.ENROLL_COURSE_ERROR:
      return {
        ...state,
        enroll_course_requested: false,
        enroll_course_succeeded: false,
        enroll_course_failed: true,
      };

    case types.GET_SAVED_LESSONS:
      return {
        ...state,
        saved_lessons_requested: true,
        saved_lessons_failed: null,
        saved_lessons_succeeded: null,
      };

    case types.SAVED_LESSONS_SUCCESS:
      return {
        ...state,
        saved_lessons_requested: false,
        saved_lessons_succeeded: true,
        saved_lessons: payload,
      };
    case types.SAVED_LESSONS_ERROR:
      return {
        ...state,
        saved_lessons_requested: false,
        saved_lessons_succeeded: false,
        saved_lessons_failed: true,
      };

    case types.UPDATE_VIEW_COUNT:
      let { module_index, lesson_id, view_count } = payload;
      let lesson_index = state.course_syllabus[
        module_index
      ].module_contents.findIndex(
        (lesson) => lesson.module_seq_id === lesson_id
      );
      return {
        ...state,
        course: {
          ...state.course,
          estimated_duration_sec:
            state.course.estimated_duration_sec -
            state.current_lesson.estimated_duration_sec,
        },
        course_syllabus: [
          ...state.course_syllabus.slice(0, module_index),
          {
            ...state.course_syllabus[module_index],
            estimated_duration_sec:
              state.course_syllabus[module_index].estimated_duration_sec -
              state.current_lesson.estimated_duration_sec,
            module_contents: [
              ...state.course_syllabus[module_index].module_contents.slice(
                0,
                lesson_index
              ),
              {
                ...state.course_syllabus[module_index].module_contents[
                  lesson_index
                ],
                data: {
                  ...state.course_syllabus[module_index].module_contents[
                    lesson_index
                  ].data,
                  view_count,
                },
              },
              ...state.course_syllabus[module_index].module_contents.slice(
                lesson_index + 1
              ),
            ],
          },
          ...state.course_syllabus.slice(module_index + 1),
        ],
        course_syllabus_overview: [
          ...state.course_syllabus_overview.slice(0, module_index),
          {
            ...state.course_syllabus_overview[module_index],
            estimated_duration_sec:
              state.course_syllabus_overview[module_index]
                ?.estimated_duration_sec -
              state.current_lesson?.estimated_duration_sec,
          },
          ...state.course_syllabus_overview.slice(module_index + 1),
        ],
        current_lesson: {
          ...state.current_lesson,
          completed: true,
          view_count,
        },
      };
    case types.UPDATE_QUIZ_COMPLETION:
      let { m_index, l_id } = payload;
      let l_index = state.course_syllabus[m_index].module_contents.findIndex(
        (lesson) => lesson.module_seq_id === l_id
      );
      return {
        ...state,
        course: {
          ...state.course,
          estimated_duration_sec:
            state.course.estimated_duration_sec -
            state.current_lesson.estimated_duration_sec,
        },
        course_syllabus: [
          ...state.course_syllabus.slice(0, m_index),
          {
            ...state.course_syllabus[m_index],
            estimated_duration_sec:
              state.course_syllabus[m_index].estimated_duration_sec -
              state.current_lesson.estimated_duration_sec,
            module_contents: [
              ...state.course_syllabus[m_index].module_contents.slice(
                0,
                l_index
              ),
              {
                ...state.course_syllabus[m_index].module_contents[l_index],
                data: {
                  ...state.course_syllabus[m_index].module_contents[l_index]
                    .data,
                  progress_status: 'COMPLETED',
                },
              },
              ...state.course_syllabus[m_index].module_contents.slice(
                l_index + 1
              ),
            ],
          },
          ...state.course_syllabus.slice(m_index + 1),
        ],
        course_syllabus_overview: [
          ...state.course_syllabus_overview.slice(0, m_index),
          {
            ...state.course_syllabus_overview[m_index],
            estimated_duration_sec:
              state.course_syllabus_overview[m_index].estimated_duration_sec -
              state.current_lesson.estimated_duration_sec,
          },
          ...state.course_syllabus_overview.slice(m_index + 1),
        ],
        current_lesson: {
          ...state.current_lesson,
          completed: true,
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default concatenateReducers([
  coursesReducer,
  combineReducers({
    quiz: quizReducer,
    coding_course: codingReducer,
  }),
]);
