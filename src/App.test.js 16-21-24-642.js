/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { expect, test } from '@jest/globals';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
