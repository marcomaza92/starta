import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('renders the main title', () => {
  render(<Home initialPeople initialPlanets initialSpecies />);
  const element = screen.getByTestId('title');
  expect(element).toBeInTheDocument();
});
