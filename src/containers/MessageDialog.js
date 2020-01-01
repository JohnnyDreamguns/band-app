import React from 'react';
import MessageDialog from '../components/MessageDialog';
import { useMessages } from '../hooks/useMessages';

const MessageDialogContainer = () => {
  const { messages } = useMessages();

  const props = {
    messages
  };

  return <MessageDialog {...props} />;
};

export default MessageDialogContainer;
