import { selectFirstBand } from '../response';

const mockResponse = {
  results: [
    {
      band: 2
    }
  ]
};

describe('response selectors', () => {
  describe('selectFirstBand', () => {
    it('should return the correct state', () => {
      expect(selectFirstBand(mockResponse)).toEqual(2);
    });
  });
});
