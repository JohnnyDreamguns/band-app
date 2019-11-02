import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';
import { HomePage, mapStateToProps, mapDispatchToProps } from '../index';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { LOAD_BANDS, SET_PAGE_ID, CLEAR_HOME_PAGE } from '../constants';

const store = configureStore({}, history);

const renderer = new ShallowRenderer();

const mockLoadBands = jest.fn();
const mockClearHomepage = jest.fn();

const props = {
  page: 2,
  numOfPages: 5,
  loading: false,
  bands: [
    {
      id: 1,
      name: 'Band Name',
      bio: 'Band description'
    }
  ],
  setPreviousPage: jest.fn(),
  setNextPage: jest.fn(),
  loadBands: mockLoadBands,
  clearHomepage: mockClearHomepage
};

beforeEach(() => {
  mockLoadBands.mockReset();
  mockClearHomepage.mockReset();
});

const mockState = {
  homePage: {
    loading: false,
    bands: [1, 2, 3],
    page: 1
  },
  data: {
    bands: {
      2: {
        id: 2,
        name: 'A Band'
      }
    },
    albums: {
      3: {
        id: 3,
        name: 'An Album',
        band: 2
      },
      4: {
        id: 4,
        name: 'Another Album',
        band: 3
      }
    },
    totalNumBands: 7
  }
};

describe('<HomePage />', () => {
  describe('component', () => {
    it('should match the snapshot', () => {
      renderer.render(<HomePage {...props} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show loading indicator', () => {
      renderer.render(<HomePage {...props} loading={true} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show no content if band data is missing', () => {
      renderer.render(<HomePage {...props} bands={[]} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should call loadBands when mounted', () => {
      mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <HomePage {...props} />
          </ConnectedRouter>
        </Provider>
      );
      expect(mockLoadBands.mock.calls[0][0]).toBe(props.page);
    });

    it('should call clearHomepage when unmounted', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <HomePage {...props} />
          </ConnectedRouter>
        </Provider>
      );
      wrapper.unmount();
      expect(mockClearHomepage.mock.calls.length).toBe(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should return the correct data', () => {
      expect(mapStateToProps(mockState)).toEqual({
        bands: [{ id: 2, name: 'A Band' }],
        loading: false,
        page: 1,
        numOfPages: 3
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch loadBands thunk', () => {
      const mockDispatch = jest.fn();
      const { loadBands } = mapDispatchToProps(mockDispatch);
      loadBands(1);

      expect(typeof mockDispatch.mock.calls[0][0]).toBe('function');
    });

    it('should dispatch SET_PAGE_ID when setPreviousPage is called', () => {
      const mockDispatch = jest.fn();
      const { setPreviousPage } = mapDispatchToProps(mockDispatch);
      setPreviousPage(2)();

      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: SET_PAGE_ID,
        payload: 1
      });
    });

    it('should dispatch SET_PAGE_ID when setNextPage is called', () => {
      const mockDispatch = jest.fn();
      const { setNextPage } = mapDispatchToProps(mockDispatch);
      setNextPage(2)();

      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: SET_PAGE_ID,
        payload: 3
      });
    });

    it('should dispatch CLEAR_HOME_PAGE when clearHomepage is called', () => {
      const mockDispatch = jest.fn();
      const { clearHomepage } = mapDispatchToProps(mockDispatch);
      clearHomepage();

      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: CLEAR_HOME_PAGE
      });
    });
  });
});
