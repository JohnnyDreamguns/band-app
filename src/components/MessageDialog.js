import React from 'react';

const MessageDialog = ({ messages }) => (
  <React.Fragment>
    {messages.error && (
      <div className={'notify-box error'}>{messages.error}</div>
    )}
    {messages.info && <div className={'notify-box info'}>{messages.info}</div>}
  </React.Fragment>
);

export default React.memo(MessageDialog);
