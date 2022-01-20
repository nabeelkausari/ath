import cx from 'classnames';
import get from 'lodash/get';
import Image from 'next/image';
import React, { Component, Fragment } from 'react';

import {
  DragIcon,
  ExpandIcon,
  // DragIcon,
  FullScreenIcon,
  InfoIcon,
  PinIcon, PinIconFilled
} from "../../../../../common/images";
import Result from '../Output/Result';

class ResultComponent extends Component {
  state = {
    options_open: false,
    title_edit: false,
    title_value:
      get(this.props.pin, 'detail.title') ||
      get(this.props.pin, 'detail.step.operation_name'),
  };

  handleDropDown = () => {
    this.setState({ options_open: !this.state.options_open });
  };

  handleTitleEditClick = () => {
    this.setState({ title_edit: !this.state.title_edit });
  };

  handleTitleEditChange = (e) => {
    this.setState({ title_value: e.target.value });
  };

  onTitleFocusOut = () => {
    this.handleTitleEditClick();
    this.props.handleSaveTitle(this.state.title_value, this.props.pin);
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onTitleFocusOut();
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { title_edit } = this.state;
    if (title_edit && title_edit !== prevState.title_edit) {
      this.titleInput.focus();
    }
  }

  render() {
    const { pin, full_screen, handleFullScreen, readonly_dashboard } =
      this.props;
    const { options_open, title_edit } = this.state;
    let title_value =
      get(this.props.pin, 'detail.title') ||
      get(this.props.pin, 'detail.step.operation_name');
    return (
      <Fragment>
        <div className="card-output__header">
          <div className="card-output__header-wrapper">
            <p className="card-output__header-wrapper--title">{title_value}</p>
            <div className="card-output__header-wrapper--icons">
              <div onClick={this.handleDropDown} className="icon">
                <Image width={15} height={15} src={InfoIcon} />
              </div>
              {!readonly_dashboard && (
                <div onClick={this.props.pinStep} className="icon">
                  <Image width={15} height={15} src={PinIconFilled} />
                </div>
              )}
              <div onClick={() => handleFullScreen(pin.i)} className="icon">
                <Image src={ExpandIcon} width={15} height={15} />
              </div>
              {!readonly_dashboard && !full_screen && (
                <div className="icon draggable-element">
                  <Image src={DragIcon} width={15} height={15} />
                </div>
              )}
            </div>
          </div>

          {options_open && (
            <div className="card-output__dropdown">
              <div className="card-output__dropdown--details">
                <p className="card-output__dropdown--details-1">
                  Step {get(pin, 'detail.step.sequence_number')}
                </p>
                <p
                  className="card-output__dropdown--details-2"
                  title={get(pin, 'detail.step.operation_name')}
                >
                  Function: {get(pin, 'detail.step.operation_name')}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="card-output__content">
          {get(pin, 'detail.step.results') &&
            get(pin, 'detail.step.results').map((item, i) => (
              <Result name={item.name} key={i} _links={item._links} />
            ))}
        </div>
      </Fragment>
    );
  }
}

export default ResultComponent;
