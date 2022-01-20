import cx from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Tooltip from '../../../../../../components/Tooltip/Tooltip';

export const FunctionItem = ({
  fx,
  searchItem,
  searchDetails,
  onFunctionClick,
}) => {
  const dispatch = useDispatch();
  const { functions } = useSelector((state) => state.workspace);
  const active_function = functions?.execution?.current_function;

  const showProDetails =
    fx.is_active && fx.is_premium && !fx.premium_executable;

  const disabled = !fx.is_active || fx.is_restricted;

  const executable = fx.is_premium
    ? !disabled && fx.premium_executable
    : !disabled;

  const handleClick = () => {
    onFunctionClick(fx, executable);
    if (showProDetails) {
      // dispatch(setProDetailsFlyout());
    }
  };

  const getTooltipContent = (f) => {
    if (!f.is_active) {
      return 'Coming soon...';
    }
    if (f.is_premium) {
      return fx.premium_executable
        ? `${f.name} (Pro)`
        : 'Available in LEAPS Pro';
    }

    if (f.is_restricted) {
      return 'Restricted';
    }

    return f.name;
  };

  return (
    // <Tooltip placement="top" text={getTooltipContent(fx)}>
    <button
      className={cx(
        'no-btn',
        'fx-list__subtitle',
        {
          'fx__search-items': searchItem,
        },
        {
          'fx-active': active_function.function_id === fx.function_id,
        },
        {
          'fx-disabled': disabled,
        }
      )}
      onClick={handleClick}
    >
      {searchItem ? (
        <>
          <span className="fx__search-name">{fx.name}</span>
          <span className="fx__search-category">
            {`${searchDetails.sub_category} -> ${searchDetails.category}`}
          </span>
        </>
      ) : (
        fx.name
      )}
    </button>
    // </Tooltip>
  );
};
