import React from 'react';
import { connect } from 'react-redux';
import { selectMessages } from './selectors';

export const MessageDialog = ({ messages }) => (
  <React.Fragment>
    {messages.error && (
      <div className={'notify-box error'}>{messages.error}</div>
    )}
    {messages.info && <div className={'notify-box info'}>{messages.info}</div>}
  </React.Fragment>
);

export const mapStateToProps = state => {
  return {
    messages: selectMessages(state)
  };
};

export default connect(mapStateToProps)(MessageDialog);
