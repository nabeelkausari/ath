import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import React from 'react';

import useStyles from './CheckBox.styles';

const CheckBoxLabel = (props) => {
  const styles = useStyles();
  const { option } = props;
  return (
    <Typography color="textSecondary" className={styles.labelContainer}>
      {option?.label}
      {option?.count !== undefined && option?.count !== 0 && (
        <Typography mx={1} className={styles.listCount}>
          {option?.count}
        </Typography>
      )}
    </Typography>
  );
};

const CheckBox = ({ options, onChange, ...props }) => {
  const styles = useStyles();

  return (
    <FormGroup row className={styles.group}>
      {options?.map((option, i) => {
        return (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={option.value || false}
                onChange={onChange}
                label={option.label}
                id={option.id || option.type}
                disabled={option.disabled}
              />
            }
            label={<CheckBoxLabel option={option} />}
            className={styles.checkboxLabel}
          />
        );
      })}
    </FormGroup>
  );
};
export default CheckBox;
