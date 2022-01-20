import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  pdfViewer: {
    position: 'relative',
    ' & .react-pdf__Page': {
      '&> div': {
        width: '100% !important',
        height: 'auto !important',
        '& svg': {
          width: '100% !important',
          height: 'auto !important',
        },
      },
    },
    '& .react-pdf__Document': {
      '& .react-pdf__Page': {
        '& canvas': {
          width: '100% !important',
          height: 'auto !important',
          borderRadius: 8,
        },
      },
    },
  },
  downloadPdf: {
    '& a': {
      width: 40,
      height: 40,
      zIndex: 9,
      position: 'fixed',
      bottom: theme.spacing(8),
      right: theme.spacing(12.5),
      borderRadius: 50,
      background: theme.palette.primary.main,
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  pdfViewerError: {
    padding: theme.spacing(2),
    fontSize: 14,
    '& > a': {
      color: 'black',
      fontWeight: 500,
    },
  },
}));

export default useStyles;
