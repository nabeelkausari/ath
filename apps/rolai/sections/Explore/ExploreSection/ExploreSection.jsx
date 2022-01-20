import useMediaQuery from '@mui/material/useMediaQuery';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React from 'react';

import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import useStyles from './ExploreSection.styles';

const ExploreSection = ({
  title,
  items = [],
  cardHeight = 200,
  component: Component = () => null,
}) => {
  const styles = useStyles();
  const xl = useMediaQuery('(min-width:1920px)');

  if (items.length === 0) return null;
  return (
    <div className={styles.sliderContainer}>
      <CarouselProvider
        visibleSlides={xl ? 4 : 3}
        totalSlides={items.length}
        step={1}
        naturalSlideWidth={400}
        naturalSlideHeight={cardHeight}
        isPlaying={false}
      >
        <SectionHeader
          customHeader={title}
          viewAll={true}
          count={items.length}
        />
        <Slider className={styles.slider}>
          {items.map((item, i) => (
            <Slide className={styles.slider} key={i} index={i}>
              <Component item={item} />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default ExploreSection;
