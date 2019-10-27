import { renderToDom } from '../index';
import ReactDOM from 'react-dom';

jest.mock('react-dom');

describe('index', () => {
  it('should call renderToDom', () => {
    renderToDom();
    expect(ReactDOM.render).toBeCalled();
  });
});
