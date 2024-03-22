import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Title';

test('renders learn react link', () => {
  render(<Title title="dd" subtitle='hello' />);
  const linkElement = screen.getByText(/Learn playwright/i);
  expect(linkElement).toBeInTheDocument();
});
