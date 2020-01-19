import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders new request button text', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/new request/i);
  expect(linkElement).toBeInTheDocument();
});
