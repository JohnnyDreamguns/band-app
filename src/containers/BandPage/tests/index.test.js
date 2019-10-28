import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';
import { BandPage, mapStateToProps, mapDispatchToProps } from '../index';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { GET_BAND_BY_ID, CLEAR_BAND_PAGE } from '../constants';

const store = configureStore({}, history);

const renderer = new ShallowRenderer();

const mockGetBandById = jest.fn();
const mockClearBandpage = jest.fn();

const props = {
  bandId: 2,
  loading: false,
  albums: [
    {
      id: 1,
      name: 'Album Name'
    }
  ],
  band: {
    id: 1,
    name: 'Band Name',
    bio: 'Band description'
  },
  getBandById: mockGetBandById,
  clearBandpage: mockClearBandpage
};

beforeEach(() => {
  mockGetBandById.mockReset();
  mockClearBandpage.mockReset();
});

const mockState = {
  bandPage: {
    loading: true,
    bandId: 2,
    albums: [3, 4]
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
    }
  }
};

describe('<BandPage />', () => {
  describe('component', () => {
    it('should match the snapshot', () => {
      renderer.render(<BandPage {...props} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show loading indicator', () => {
      renderer.render(<BandPage {...props} loading={true} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show no content if band data is missing', () => {
      renderer.render(<BandPage {...props} band={undefined} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should show no albums content if album data is missing', () => {
      renderer.render(<BandPage {...props} albums={undefined} />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('should call getBandById when mounted', () => {
      mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BandPage {...props} />
          </ConnectedRouter>
        </Provider>
      );
      expect(mockGetBandById.mock.calls[0][0]).toBe(props.bandId);
    });

    it('should call clearBandpage when unmounted', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BandPage {...props} />
          </ConnectedRouter>
        </Provider>
      );
      wrapper.unmount();
      expect(mockClearBandpage.mock.calls.length).toBe(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should return the correct data', () => {
      const ownProps = {
        match: {
          params: {
            bandId: 2
          }
        }
      };
      expect(mapStateToProps(mockState, ownProps)).toEqual({
        bandId: 2,
        loading: true,
        band: { id: 2, name: 'A Band' },
        albums: [
          { id: 3, name: 'An Album', band: 2 },
          { id: 4, name: 'Another Album', band: 3 }
        ]
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch GET_BAND_BY_ID when getBandById is called', () => {
      const mockDispatch = jest.fn();
      const { getBandById } = mapDispatchToProps(mockDispatch);
      getBandById(2);

      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: GET_BAND_BY_ID,
        payload: 2
      });
    });

    it('should dispatch CLEAR_BAND_PAGE action when clearBandpage is called', () => {
      const mockDispatch = jest.fn();
      const { clearBandpage } = mapDispatchToProps(mockDispatch);
      clearBandpage();

      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: CLEAR_BAND_PAGE
      });
    });
  });
});
