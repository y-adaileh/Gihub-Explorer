import { render, screen } from '@testing-library/react';
import { Loader } from '.';

describe('Loader', () => {
  test('renders loader text', () => {
    render(<Loader />);
    expect(screen.getByTestId('test-loader')).toBeInTheDocument();
  });
});
