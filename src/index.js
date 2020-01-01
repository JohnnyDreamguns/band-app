import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './store/store';

const MOUNT_NODE = document.getElementById('root');

export const renderToDom = () => {
  ReactDOM.render(
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>,
    MOUNT_NODE
  );
};
renderToDom();
