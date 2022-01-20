import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import TrackDetails from '../../sections/TrackDetails/TrackDetails/TrackDetails';
import { clearTrack, getTrack } from '../../store/tracks/actions';

function Tracks() {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { track } = useSelector((state) => state.tracks);

  useEffect(() => {
    if (my_profile_succeeded && query?.track_id) {
      dispatch(getTrack(query.track_id));
    }
  }, [my_profile_succeeded, query?.track_id]);

  useEffect(() => {
    return () => dispatch(clearTrack());
  }, []);

  return (
    <>
      <Layout
        isBanner={false}
        container={false}
        title={track.title ? `${track.title} | Rolai` : 'Rolai'}
      >
        <TrackDetails />
      </Layout>
    </>
  );
}

export default Tracks;
