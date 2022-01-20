import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React from 'react';

import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import CardSkeleton from './CardSkeleton/CardSkeleton';
import useStyles from './MyOrganisationSection.styles';

const MyOrganisationSection = ({
  viewAll = false,
  hideArrows = false,
  Component = () => null,
  items = [],
  loading,
  cardHeight = 300,
  viewAllLink,
  header,
  create_new = false,
}) => {
  const styles = useStyles();
  const xl = useMediaQuery('(min-width:1920px)');

  return (
    <CarouselProvider
      visibleSlides={xl ? 4 : 3}
      totalSlides={items.length}
      step={1}
      naturalSlideWidth={400}
      naturalSlideHeight={cardHeight}
      isPlaying={false}
      className={styles.learningTrack}
    >
      <SectionHeader
        customHeader={header}
        linkHref={viewAllLink}
        viewAll={viewAll}
        hideArrows={hideArrows}
        count={items?.length}
        create_new={create_new}
      />
      {loading ? (
        <CardSkeleton cards={xl ? 4 : 3} viewAll={viewAll} />
      ) : viewAll ? (
        <Box className={styles.cardList}>
          {items && items.map((item, i) => <Component key={i} item={item} />)}
          <Card className="hidden" />
          {xl && <Card className="hidden" />}
        </Box>
      ) : (
        <Slider>
          {items &&
            items.map((item, i) => (
              <Slide key={i}>
                <Component item={item} />
              </Slide>
            ))}
        </Slider>
      )}
    </CarouselProvider>
  );
};

export default MyOrganisationSection;
