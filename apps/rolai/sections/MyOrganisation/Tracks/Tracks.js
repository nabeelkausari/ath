import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CapIcon, EnrolledIcon, RightArrow } from '../../../common/images';
import Button from '../../../components/Button';
import Level from '../../../components/Level/Level';
import { enrollTrack } from '../../../store/tracks/actions';
import { isLoading } from '../../../utils/helpers/helperFunctions';
import MyOrganisationSection from '../MyOrganisationSection/MyOrganisationSection';
import useStyles from './Tracks.styles';

export const TrackEnroller = ({ link, id }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [enrolling, setEnrolling] = useState(null);
  const tracks = useSelector((state) => state.tracks);

  const handleClick = () => {
    setEnrolling(true);
    dispatch(enrollTrack(link, id));
  };

  useEffect(() => {
    if (tracks?.enroll_track_failed || tracks?.enroll_track_succeeded) {
      setEnrolling(false);
    }
  }, [tracks?.enroll_track_failed, tracks?.enroll_track_succeeded]);

  return (
    <LoadingButton
      loading={enrolling}
      variant="contained"
      onClick={handleClick}
      endIcon={<Image src={RightArrow} width={12} height={9} />}
      className={styles.cardButtons}
    >
      Enroll Now
    </LoadingButton>
  );
};

const TrackCard = ({ item: track }) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography
            color="textPrimary"
            component="h4"
            className={styles.header}
            title={track?.title}
          >
            {track.title}
          </Typography>
          {track.enrolled && (
            <Typography variant="subtitle2" className={styles.enrolled}>
              <img src={EnrolledIcon?.src} className={styles.enrolledIcon} />
              <div>Enrolled</div>
            </Typography>
          )}
        </Box>
        <Box mt={1} display="flex">
          {track?.level && <Level level={track?.level} />}
          <Typography
            className={styles.highlights}
            color="textSecondary"
            variant="caption"
          >
            <img src={CapIcon?.src} className={styles.courseIcon} />
            {track.description}
          </Typography>
        </Box>
      </CardContent>
      <CardContent className={styles.description}>
        <Typography
          variant="body2"
          component="p"
          className={styles.content}
        >
          {track.overview}
        </Typography>
      </CardContent>
      <CardActions className={styles.trackActions}>
        {track.enrolled ? (
          <Link
            href={
              track?.last_accessed_course_id
                ? `/courses/${track?.last_accessed_course_id}/lesson/overview`
                : `/tracks/${track.track_id}#courses`
            }
            passHref
          >
            <Button
              component="a"
              variant="contained"
              className={styles.cardButtons}
            >
              Resume
            </Button>
          </Link>
        ) : (
          <TrackEnroller id={track.track_id} link={track._links.enroll} />
        )}
        <Link href={`/tracks/${track.track_id}`} passHref>
          <Button
            component="a"
            variant="outlined"
            className={styles.cardButtons}
          >
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const TracksSection = ({ viewAll, hideArrows }) => {
  const tracks = useSelector((state) => state.tracks);

  if (!tracks) return null;

  const loading =
    isLoading(tracks.my_org_tracks_requested) &&
    (!tracks.my_org_tracks || tracks.my_org_tracks.length === 0);

  return (
    <MyOrganisationSection
      Component={TrackCard}
      loading={loading}
      items={tracks?.my_org_tracks}
      viewAll={viewAll}
      hideArrows={hideArrows}
      cardHeight={355}
      viewAllLink="/my-organization/tracks"
      header="Learning Tracks"
    />
  );
};

export default TracksSection;
