import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import noResultsIcon from '../../assets/icons/no-results.svg';
import Layout from '../../components/Layout';
import ExploreCourseCard from '../../sections/Explore/ExploreCourseCard/ExploreCourseCard';
import ExploreFilter from '../../sections/Explore/ExploreFilter/ExploreFilter';
import ExploreProjectCard from '../../sections/Explore/ExploreProjectCard/ExploreProjectCard';
import ExploreSection from '../../sections/Explore/ExploreSection/ExploreSection';
import ExploreTrackCard from '../../sections/Explore/ExploreTrackCard/ExploreTrackCard';
import FilterIndicator from '../../sections/Explore/FilterIndicator/FilterIndicator';

const useStyles = makeStyles((theme) => ({
  listLayout: {
    display: 'flex',
    backgroundColor: '#F8F9FB',
  },
  listLayoutLeft: {
    minWidth: 342,
    background: alpha(theme.palette.common.white, 1),
  },
  listLayoutRight: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    overflow: 'auto',
    minHeight: '70vh',
    maxWidth: 900,
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1200,
    },
    margin: '0 auto',
    paddingBottom: theme.spacing(5),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
}));

function Explore() {
  const styles = useStyles();
  const { explore_all } = useSelector((state) => state.explore);
  const CARD_HEIGHTS = {
    COURSE: 260,
    CASE: 270,
    TRACK: 190,
  };
  const renderComponent = (type) => {
    switch (type) {
      case 'COURSE':
        return ExploreCourseCard;
      case 'CASE':
        return ExploreProjectCard;
      case 'TRACK':
        return ExploreTrackCard;
      default:
        return () => null;
    }
  };
  return (
    <Layout
      maxWidth={false}
      fixed={false}
      title="Explore | Rolai"
      className={styles.listLayout}
      isFooter={false}
    >
      <Box className={styles.body}>
        <FilterIndicator />
        <Box className={styles.main}>
          <div className={styles.listLayoutLeft}>
            <ExploreFilter filters={explore_all?.filters} />
          </div>
          <div className={styles.listLayoutRight}>
            {explore_all?.sections?.every(
              (section) => section.data.length === 0
            ) && (
              <Box
                display="flex"
                flex={1}
                width="100%"
                height="70vh"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Image src={noResultsIcon} width={120} height={150} />
                <Typography fontSize={24} fontWeight="medium" variant="h4">
                  Sorry! No Results Found :(
                </Typography>
                <Typography fontSize={14} variant="p">
                  Please try searching with a different keyword.
                </Typography>
              </Box>
            )}
            {explore_all?.sections &&
              explore_all.sections.map((section, i) => (
                <ExploreSection
                  key={i}
                  title={section.resourceTitle}
                  items={section.data}
                  cardHeight={CARD_HEIGHTS[section.resourceType]}
                  component={renderComponent(section.resourceType)}
                />
              ))}
          </div>
        </Box>
      </Box>
    </Layout>
  );
}

export default Explore;
