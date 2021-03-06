import { render, screen } from '@testing-library/react';
import Home from './index';

test('renders the main title', () => {
  render(<Home />);
  const element = screen.getByTestId('title');
  expect(element).toBeInTheDocument();
});
