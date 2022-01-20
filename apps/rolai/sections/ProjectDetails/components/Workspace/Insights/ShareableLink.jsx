import Button from '@mui/material/Button';
import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import { ShareIcon } from '../../../../../common/images';
import {
  getShareableLink,
  resetShareableLink,
} from '../../../../../store/collaborators/actions';
import { notify } from '../../../../../utils/helpers/notification';

const ShareableLink = ({ className }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [validityRequired, setValidityRequired] = useState(true);
  const [days, setDays] = useState(7);

  const { shareable_link } = useSelector((state) => state.collaborators);

  useEffect(() => {
    return () => {
      if (shareable_link) {
        dispatch(resetShareableLink());
      }
    };
  }, []);

  const handleOpen = () => setOpen(!open);
  const handleValidity = () => setValidityRequired(!validityRequired);
  const handleDays = (e) => setDays(e.target.value);

  return (
    <div className={cx(['shareable', className])}>
      <Button
        startIcon={<Image src={ShareIcon} width={12} height={12} />}
        variant="link"
        onClick={handleOpen}
      >
        Share Link
      </Button>

      {open && (
        <div className="shareable__box">
          <div className="shareable__box--get">
            <div className="shareable__box--get-validity">
              <input
                onChange={handleValidity}
                checked={validityRequired}
                type="checkbox"
              />
              <span>Link Valid for : </span>
              <input min={1} onChange={handleDays} value={days} type="number" />
              <span> Days</span>
            </div>
            <Button
              variant="outlined"
              onClick={() =>
                dispatch(getShareableLink(validityRequired && days))
              }
            >
              Get Link
            </Button>
          </div>

          {shareable_link && (
            <div className="shareable__box--copy">
              <input value={shareable_link} readOnly />
              <CopyToClipboard
                onCopy={() => notify.success('Link Copied to clipboard')}
                text={shareable_link}
              >
                <Button variant="contained">Copy Link</Button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShareableLink;
