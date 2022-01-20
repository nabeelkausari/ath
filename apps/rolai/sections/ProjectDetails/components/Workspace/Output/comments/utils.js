import { css } from '@emotion/react';
import _clone from 'lodash/clone';
import _escapeRegExp from 'lodash/escapeRegExp';

import { notify } from '../../../../../../utils/helpers/notification';

export const override = css`
  display: block;
  border-color: var(--highlight-primary);
  margin-left: 1rem;
`;

export const swapTags = (text) => {
  let displayText = _clone(text);
  const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];
  tags.map((myTag) => {
    const tagData = myTag.slice(3, -2);
    const tagDataArray = tagData.split('||');
    const tagDisplayValue =
      "<span style='color: #5064E3'>" + tagDataArray[1] + '</span>';
    displayText = displayText.replace(
      new RegExp(_escapeRegExp(myTag), 'gi'),
      tagDisplayValue
    );
  });
  return displayText;
};

export const warnEmptyContent = () =>
  notify.warning('No Content', 'Please write something');
