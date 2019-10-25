export const selectFirstBand = response =>
  response.results[Object.keys(response.results)[0]].band;
