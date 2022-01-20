import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Input from '../../../../../../components/Forms/Input';
// import { renameUdf } from '../../redux/actions';
import { FunctionItem } from './FunctionItem';
// import { UDFActions } from './UDFActions';

export const UDF = ({ fx, onFunctionClick }) => {
  const dispatch = useDispatch();
  const { functions, rename_udf_succeeded } = useSelector((state) => state.workspace);
  const [activeRenameFieldRef, setActiveRenameFieldRef] = useState(null);
  const [activeRenameFieldValue, setActiveRenameFieldValue] = useState('');
  const active_function = functions?.execution?.current_function;

  const resetActiveRename = () => {
    setActiveRenameFieldRef(null);
    setActiveRenameFieldValue('');
  };

  useEffect(() => {
    resetActiveRename();
  }, [rename_udf_succeeded]);

  // const toggleRename = (fx) => {
  //   let cur_ref = fx._links.self.href;
  //   if (cur_ref === activeRenameFieldRef) {
  //     resetActiveRename();
  //   } else {
  //     setActiveRenameFieldRef(fx._links.self.href);
  //     setActiveRenameFieldValue(fx.name);
  //   }
  // };

  // const saveUdfRename = (link, ref) => {
  //   dispatch(renameUdf(link, activeRenameFieldValue, ref));
  // };
  //
  // const handleUdfNameChange = (name, value) => {
  //   setActiveRenameFieldValue(value);
  // };

  if (!fx.udf) return null;
  return (
    <>
      {fx._links.self.href !== activeRenameFieldRef ? (
        <FunctionItem
          onFunctionClick={onFunctionClick}
          active_function={active_function}
          fx={fx}
        />
      ) : (
        <div className="fx-list__udf-rename-active">
          {/*<Input*/}
          {/*  type="input"*/}
          {/*  value={activeRenameFieldValue}*/}
          {/*  placeholder="Udf Name"*/}
          {/*  onChange={handleUdfNameChange}*/}
          {/*  space_below={false}*/}
          {/*/>*/}
        </div>
      )}

      {/*<UDFActions*/}
      {/*  fx={fx}*/}
      {/*  activeRenameFieldRef={activeRenameFieldRef}*/}
      {/*  toggleRename={toggleRename}*/}
      {/*  saveUdfRename={saveUdfRename}*/}
      {/*/>*/}
    </>
  );
};
