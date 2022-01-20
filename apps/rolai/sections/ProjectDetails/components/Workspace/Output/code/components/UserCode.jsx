import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchUserCode,
  fetchUserLearnPython,
  fetchUserLearnR,
} from '../../../../../../../store/workspace/steps/actions';
import FileViewer from '../../results/components/FileViewer';

const generateFileViewers = (code_files) =>
  code_files.map((codeFile) => (
    <FileViewer
      key={codeFile._links.code_file.href}
      file_link={codeFile._links.code_file}
      function_language={codeFile.function_language}
      code_type={codeFile.code_type}
    />
  ));

const UserCode = ({ code_primary, code_secondary, secondary, results }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserCode(results, secondary));
    dispatch(fetchUserLearnR(results, secondary));
    dispatch(fetchUserLearnPython(results, secondary));
  }, []);
  return (
    <div>
      {!secondary ? (
        <div className="code-wrapper">
          {code_primary &&
            code_primary.ath_code &&
            code_primary.ath_code.code_files !== undefined && (
              <div>
                <div className="code-block">
                  {generateFileViewers(code_primary.ath_code.code_files)}
                </div>
              </div>
            )}
          {code_primary &&
            code_primary.r_code &&
            code_primary.r_code.code_files !== undefined && (
              <div>
                <div className="code-block">
                  {generateFileViewers(code_primary.r_code.code_files)}
                </div>
              </div>
            )}
          {code_primary &&
            code_primary.python_code &&
            code_primary.python_code.code_files !== undefined && (
              <div>
                <div className="code-block">
                  {generateFileViewers(code_primary.python_code.code_files)}
                </div>
              </div>
            )}
        </div>
      ) : (
        <div className="code-wrapper">
          {code_secondary &&
            code_secondary.ath_code &&
            code_secondary.ath_code.code_files !== undefined && (
              <div>
                <div className="code-block">
                  {generateFileViewers(code_secondary.ath_code.code_files)}
                </div>
              </div>
            )}
          {code_secondary &&
            code_secondary.r_code &&
            code_secondary.r_code.code_files !== undefined && (
              <div>
                <div className="code-block">
                  {generateFileViewers(code_secondary.r_code.code_files)}
                </div>
              </div>
            )}
          {code_secondary &&
            code_secondary.python_code &&
            code_secondary.python_code.code_files !== undefined && (
              <div>
                <div className="code-block">
                  {generateFileViewers(code_secondary.python_code.code_files)}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default UserCode;
