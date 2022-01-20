import MuiButton from '@mui/material/Button';
import PropTypes from 'prop-types';

const Button = ({ color, variant, children, size, ...props }) => {
  return (
    <MuiButton size={size} color={color} variant={variant} {...props}>
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  variant: 'contained',
  onClick: undefined,
};

export default Button;
