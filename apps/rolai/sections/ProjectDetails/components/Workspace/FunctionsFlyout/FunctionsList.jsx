import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FunctionItem } from './FunctionItem';
import SearchInput from './SearchInput';
import { UDF } from './UDF';

const FunctionsList = ({
  className,
  onSelect,
  onClose,
  closeSelection,
  showClose,
  searchText = '',
}) => {
  const [innerSearchText, setInnerSearchText] = useState('');
  const { functions } = useSelector((state) => state.workspace);
  const [subCategories, setSubCategories] = useState(
    functions?.execution?.current_function_category?.sub_categories || []
  );

  const { items, fetch_suggestions_succeeded } = functions?.suggestions;
  const { name } = functions?.execution?.current_function_category;

  useEffect(() => {
    if (innerSearchText) {
      closeSelection();
      const filtered = {};
      functions?.execution?.current_function_category?.sub_categories.forEach(
        (sub_category) => {
          sub_category.functions_list.forEach((fx) => {
            if (fx.name.toLowerCase().includes(innerSearchText.toLowerCase())) {
              if (filtered[sub_category.name]) {
                filtered[sub_category.name] = [
                  ...filtered[sub_category.name],
                  fx,
                ];
              } else {
                filtered[sub_category.name] = [fx];
              }
            }
          });
        }
      );
      if (Object.keys(filtered).length > 0) {
        setSubCategories(
          Object.keys(filtered).map((category) => ({
            name: category,
            functions_list: filtered[category],
          }))
        );
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories(
        functions?.execution?.current_function_category?.sub_categories
      );
    }
  }, [innerSearchText]);

  useEffect(() => {
    if (name) {
      closeSelection();
      setSubCategories(
        functions?.execution?.current_function_category?.sub_categories
      );
    }
  }, [name]);

  useEffect(() => {
    setSubCategories(
      functions?.execution?.current_function_category?.sub_categories
    );
  }, [
    JSON.stringify(
      functions?.execution?.current_function_category?.sub_categories
    ),
  ]);

  return (
    <div className={className}>
      {showClose && (
        <div onClick={onClose} className="flyout-close">
          <CloseIcon />
        </div>
      )}
      {!searchText && (
        <SearchInput
          className="flyout-search"
          value={innerSearchText}
          onChange={(e) => setInnerSearchText(e.target.value)}
        />
      )}
      {searchText !== '' && fetch_suggestions_succeeded
        ? items.map(({ function_obj, ...searchDetails }, i) => (
            <FunctionItem
              key={i}
              fx={function_obj}
              onFunctionClick={(e) => onSelect(e, function_obj)}
              searchItem
              searchDetails={searchDetails}
            />
          ))
        : subCategories &&
          subCategories.map((sub_category, i) => (
            <div className="fx-list__item" key={i}>
              <h4 className="fx-list__title">{sub_category.name}</h4>
              {sub_category.functions_list &&
                sub_category.functions_list.map((fx, i) => {
                  return (
                    <div key={i} className="fx-list__item-wrapper">
                      {fx.udf ? (
                        <UDF fx={fx} onFunctionClick={onSelect} />
                      ) : (
                        <FunctionItem
                          fx={fx}
                          onFunctionClick={(e) => onSelect(e, fx)}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
    </div>
  );
};

export default FunctionsList;
