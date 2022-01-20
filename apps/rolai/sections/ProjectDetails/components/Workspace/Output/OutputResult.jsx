// import { css } from '@emotion/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccordionPanel from '../../../../../components/AccordionPanel/AccordionPanel';
// import { BeatLoader, ClipLoader } from 'react-spinners';
import EditorView from '../../../../../components/Editor/EditorView';
import { getFunctionDesc } from '../../../../../store/workspace/steps/actions';
// import { RightArrowIcon } from '../../../../../common/images';
import { chunkArray } from '../../../../../utils/helpers/helperFunctions';
import Result from './Result';

const Tooltip = ({ children }) => <>{children}</>;

// const override = css`
//   border-color: var(--highlight-primary);
// `;

const OutputResult = ({
  secondary,
  results,
  print_ref,
  expanded = false,
  step_details = false,
  styles = {},
}) => {
  const dispatch = useDispatch();
  const { steps, datasets } = useSelector((state) => state.workspace);
  const function_desc_loading = steps?.fetch_function_desc_requested;
  const tables = datasets?.list?.tables || {};

  useEffect(() => {
    if (!results.function_description) {
      dispatch(getFunctionDesc(results.function_url, secondary));
    }
  }, []);

  const getParameters = (parameter) => {
    if (parameter[0] === '[') {
      let modifiedParamString = parameter.substring(1, parameter.length - 1);
      return modifiedParamString.split(',');
    } else {
      return [parameter];
    }
  };
  return (
    <>
      <div className="flyout-container__desc-accordion" style={styles}>
        <AccordionPanel
          expanded={expanded}
          title="Input Selections & Parameters"
        >
          <div className="flyout-container__accordion-content">
            <div className="flyout-container__desc-wrapper">
              <div className="flyout-container__desc-title">
                Step Description
              </div>
              <div className="flyout-container__desc">
                {results.description}
              </div>
            </div>

            <div className="flyout-container__selected-columns-wrapper">
              <div className="flyout-container__selected-columns">
                <div className="flyout-container__desc-title">
                  Input Selections
                </div>
                <div className="flyout-container__add-info-wrapper flyout-container__add-info-wrapper--2 ">
                  {Object.keys(results.selections).map((selection) => {
                    return (
                      <>
                        <div className="flyout-container__parameter">
                          Table: {tables[selection]}
                        </div>
                        {chunkArray(results.selections[selection], 3).map(
                          (row, isd) => {
                            return (
                              <div
                                key={isd}
                                className="flyout-container__columns-selected-row"
                              >
                                {row.map((column, i) => (
                                  <Tooltip placement="top" text={column.key}>
                                    <span
                                      key={i}
                                      className="flyout-container__add-info-item"
                                    >
                                      {column.key}&nbsp;
                                    </span>
                                  </Tooltip>
                                ))}
                              </div>
                            );
                          }
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            {Object.keys(results.parameters).length !== 0 && (
              <div className="flyout-container__parameters">
                <div className="flyout-container__add-info-title flyout-container__add-info-title--1">
                  Parameters
                </div>
                {Object.keys(results.parameters).map((parameter, pi) => {
                  return (
                    <div
                      key={pi}
                      className="flyout-container__parameter-wrapper"
                    >
                      <div className="flyout-container__parameter">
                        {parameter}
                      </div>
                      <div className="flyout-container__add-info-wrapper">
                        {getParameters(results.parameters[parameter]).map(
                          (parameter, i) => {
                            return (
                              <Tooltip placement="top" text={parameter}>
                                <span
                                  key={i}
                                  className="flyout-container__add-info-item flyout-container__add-info-item--1"
                                >
                                  {parameter}
                                </span>
                              </Tooltip>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {function_desc_loading ? (
              <div className="flyout-container__add-info-wrapper--1">
                <div className="flyout-container__add-info-title ">
                  Function Description
                </div>
                <div className="flyout-container__function-description">
                  {/*<BeatLoader*/}
                  {/*  css={override}*/}
                  {/*  color={'var(--highlight-primary)'}*/}
                  {/*  loading={function_desc_loading}*/}
                  {/*  size={10}*/}
                  {/*/>*/}
                </div>
              </div>
            ) : (
              results.function_description && (
                <div className="flyout-container__add-info-wrapper--1">
                  <div className="flyout-container__add-info-title ">
                    Function Description
                  </div>
                  <div className="flyout-container__function-description">
                    <EditorView
                      content={results.function_description.text}
                      controlled
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </AccordionPanel>
      </div>
      <div className="flyout-container__results" ref={print_ref}>
        {results.results !== undefined &&
          results.results.length > 0 &&
          results.results.map((item, i) => (
            <Result name={item.name} key={i} _links={item._links} />
          ))}
      </div>
    </>
  );
};

export default OutputResult;
