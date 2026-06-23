import { render, screen } from '@testing-library/react';
import App from './App';

test('renders candidate details form', () => {
  render(<App />);
  const headingElement = screen.getByText(/Candidate Details/i);
  expect(headingElement).toBeInTheDocument();
});
