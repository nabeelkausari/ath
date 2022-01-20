import {
  DatasetsIcon,
  QuizIcon,
  ReadingMaterialIcon,
  VideosIcon,
} from '../../common/images';

export const courseType = {
  PDF: {
    name: 'Reading Material',
    icon1: ReadingMaterialIcon,
  },
  QUIZ: { name: 'Quiz', icon1: QuizIcon },
  VIDEO: { name: 'Videos', icon1: VideosIcon },
  SOLVE: { name: 'Solve', icon1: DatasetsIcon },
  APPLY: { name: 'Apply', icon1: DatasetsIcon },
  CASE: { name: 'Case', icon1: DatasetsIcon },
  CODING_CASE: { name: 'Coding Case', icon1: DatasetsIcon },
  ALL: { name: 'All' },
};
