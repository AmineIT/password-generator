import { render } from '@testing-library/react';
import App from './App';

test('render the App component', () => {
  expect(render(<App />)).toMatchSnapshot()
});
