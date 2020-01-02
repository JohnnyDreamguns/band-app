import { catchErrors } from '../catchErrors';

describe('catchErrors', () => {
  it('should return data if promise is resolved', async () => {
    expect(await catchErrors(Promise.resolve('Test'))).toEqual({
      data: 'Test',
      error: null
    });
  });

  it('should return an error if promise is rejected', async () => {
    expect(await catchErrors(Promise.reject('Error'))).toEqual({
      error: 'Error',
      data: null
    });
  });
});
