import { render, screen } from '@testing-library/react';
import { NoDataMessage } from '.';

describe('NoDataMessage', () => {
  test('renders no data message', () => {
    render(<NoDataMessage />);
    expect(screen.getByTestId('noData-message')).toBeInTheDocument();
  });
});
