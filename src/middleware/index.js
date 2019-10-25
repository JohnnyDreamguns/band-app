import homePageMiddleware from './homePage';
import bandPageMiddleware from './bandPage';
import albumPageMiddleware from './albumPage';
export const customMiddleware = [
  ...homePageMiddleware,
  ...bandPageMiddleware,
  ...albumPageMiddleware
];
