export const catchErrors = promise =>
  promise
    .then(data => ({ data, error: null }))
    .catch(error => ({ error, data: null }));
