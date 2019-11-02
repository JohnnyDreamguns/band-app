import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';
import { AlbumPage, mapStateToProps, mapDispatchToProps } from '../index';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { GET_ALBUM_BY_ID, CLEAR_ALBUM_PAGE } from '../constants';

const store = configureStore({}, history);

const renderer = new ShallowRenderer();

const mockFetchAlbumById = jest.fn();
const mockClearAlbumpage = jest.fn();

const props = {
  albumId: 2,
  loading: false,
  album: {
    name: 'Album Name',
    released: '2009'
  },
  band: {
    id: 1,
    name: 'Band Name'
  },
  getAlbumById: mockFetchAlbumById,
  clearAlbumpage: mockClearAlbumpage
};

beforeEach(() => {
  mockFetchAlbumById.mockReset();
  mockClearAlbumpage.mockReset();
});

const mockState = {
  albumPage: {
    loading: true,
    albumId: 3
  },
  data: {
    bands: {
      1: {
        id: 1,
        name: 'A Band'
      }
    },
    albums: {
      3: {
        id: 3,
        name: 'An Album',
        band: 1
      }
    }
  }
};

describe('<AlbumPage />', () => {
  describe('component', () => {
    it('should match the snapshot', () => {
      renderer.render(<AlbumPage {...props} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show loading indicator', () => {
      renderer.render(<AlbumPage {...props} loading={true} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show no content if band data is missing', () => {
      renderer.render(<AlbumPage {...props} band={undefined} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show no content if album data is missing', () => {
      renderer.render(<AlbumPage {...props} album={undefined} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should call fetchAlbumById when mounted', () => {
      mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <AlbumPage {...props} />
          </ConnectedRouter>
        </Provider>
      );
      expect(mockFetchAlbumById.mock.calls[0][0]).toBe(props.albumId);
    });

    it('should call clearAlbumpage when unmounted', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <AlbumPage {...props} />
          </ConnectedRouter>
        </Provider>
      );
      wrapper.unmount();
      expect(mockClearAlbumpage.mock.calls.length).toBe(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should return the correct data', () => {
      const ownProps = {
        match: {
          params: {
            albumId: 3
          }
        }
      };
      expect(mapStateToProps(mockState, ownProps)).toEqual({
        albumId: 3,
        loading: true,
        album: { id: 3, name: 'An Album', band: 1 },
        band: { id: 1, name: 'A Band' }
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch thunk when getAlbumById is called', () => {
      const mockDispatch = jest.fn();
      const { getAlbumById } = mapDispatchToProps(mockDispatch);
      getAlbumById(3);

      expect(typeof mockDispatch.mock.calls[0][0]).toEqual('function');
    });

    it('should dispatch CLEAR_ALBUM_PAGE action when clearAlbumpage is called', () => {
      const mockDispatch = jest.fn();
      const { clearAlbumpage } = mapDispatchToProps(mockDispatch);
      clearAlbumpage();

      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: CLEAR_ALBUM_PAGE
      });
    });
  });
});
