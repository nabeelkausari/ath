import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import React from 'react';

import useStyles from './Breadcrumbs.styles';

const Breadcrumbs = ({ links, activeTitle }) => {
  const styles = useStyles();
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      className={styles.root}
      aria-label="breadcrumb"
    >
      {links &&
        links.map((link, i) => (
          <NextLink key={i} href={link.href} passHref>
            <Link underline="hover" color="primary">
              {link.title}
            </Link>
          </NextLink>
        ))}
      <Typography color="text.primary">{activeTitle}</Typography>
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
