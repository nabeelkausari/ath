import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { DownloadIcon } from '../../../../common/images';
import useStyles from './ReadingMaterial.styles';

export const PDFError = ({ document }) => {
  const styles = useStyles();

  return (
    <div className={styles.pdfViewerError}>
      {' '}
      Error loading Pdf file. Instead you can{' '}
      <a href={document._links.download.href} target="_blank" rel="noreferrer">
        click here to download the PDF file.
      </a>
    </div>
  );
};

const ReadingMaterial = ({ link }) => {
  const styles = useStyles();
  const document = {
    _links: {
      download: {
        href: link,
      },
    },
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [docLoaded, setDocLoaded] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setDocLoaded(false);
  }
  return (
    <Box className={styles.pdfViewer}>
      <Box className={styles.downloadPdf}>
        <a
          href={document._links.download.href}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={DownloadIcon} width={20} height={20} />
        </a>
      </Box>
      <Document
        file={document._links.download.href}
        onLoadSuccess={onDocumentLoadSuccess}
        // loading={<Loader loading={docLoaded} />}
        error={<PDFError document={document}></PDFError>}
        renderMode="canvas"
      >
        {Array.from(new Array(numPages), (el, index) => {
          return (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} loading="" />
          );
        })}
      </Document>
    </Box>
  );
};

export default ReadingMaterial;
