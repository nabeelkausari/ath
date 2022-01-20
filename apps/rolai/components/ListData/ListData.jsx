import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import { TickMarkIcon } from '../../common/images';
import useStyles from './ListData.styles';

const ListData = ({
  level,
  isIcon = true,
  isNumber = false,
  customClass = '',
  data = [],
  ...props
}) => {
  const styles = useStyles();

  return (
    <>
      <Typography component={'div'}>
        <List className={styles.listView}>
          <>
            {(data || []).map((value, i) => (
              <ListItem className={cx(styles.listItem, customClass)} key={i}>
                <ListItemIcon className={styles.listIcon}>
                  {isIcon ? (
                    <Image src={TickMarkIcon} width={10} height={8} />
                  ) : isNumber ? (
                    i + 1 + '.'
                  ) : (
                    '-'
                  )}
                </ListItemIcon>
                <ListItemText
                  secondary={value ? value : null}
                  className={styles.listText}
                />
              </ListItem>
            ))}
          </>
        </List>
      </Typography>
    </>
  );
};

export default ListData;
