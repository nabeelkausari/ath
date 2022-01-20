import React, { Component } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { connect } from 'react-redux';

import { getCaseCollaborators } from '../../../../../../../utils/helpers/helperFunctions';
import { swapTags } from '../utils';

const initialState = {
  value: '',
  prevValue: '',
  recipients: [],
};

class CommentMentions extends Component {
  state = initialState;

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  setValue = (value) =>
    this.setState({ value: swapTags(value), prevValue: value });

  setRecipients = (id) => {
    if (this.state.recipients.indexOf(id) > -1) return;
    this.setState(({ recipients }) => ({ recipients: [...recipients, id] }));
  };

  getCollaborators = () => {
    const { collaborators_list, current_case } = this.props;
    let collaborators = getCaseCollaborators(
      collaborators_list,
      current_case?.case_collaborators?.list,
      current_case?.info?.case_creator_id
    );

    return collaborators.map((user) => ({
      id: user.user_id,
      display: user.name,
    }));
  };

  clearValue = () => this.setState(initialState);
  getComment = () => this.state.value;
  getRecipients = () => this.state.recipients;

  render() {
    const { prevValue } = this.state;
    return (
      <MentionsInput
        value={prevValue}
        onChange={(e, value) => this.setValue(value)}
        className="mentions"
        allowSuggestionsAboveCursor
        ignoreAccents
      >
        <Mention
          trigger="@"
          markup="@{{__id__||__display__}}"
          data={this.getCollaborators()}
          className="mentions__mention"
          onAdd={this.setRecipients}
        />
      </MentionsInput>
    );
  }
}

export default connect(({ collaborators, cases }) => ({
  collaborators_list: collaborators?.list || [],
  current_case: cases.project,
}))(CommentMentions);
