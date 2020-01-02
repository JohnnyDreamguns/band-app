import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Below Fix suppresses act warnings until I can find a fix for this issue
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Warning: An update to %s inside a test was not wrapped in act'
      )
    ) {
      consoleError(...args);
    }
  });
});
