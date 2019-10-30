import { selectMessages } from '../selectors';

const mockState = {
  messages: {
    mockProp: 'Mock!'
  }
};

describe('MessageDialog selectors', () => {
  describe('selectMessages', () => {
    it('should return the correct state', () => {
      expect(selectMessages(mockState)).toEqual(mockState.messages);
    });
  });
});
