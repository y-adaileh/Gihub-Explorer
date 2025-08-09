import { render, screen } from '@testing-library/react';
import { SearchField, SearchFieldProps } from '.';
import { SearchTapLabel } from '@/types';

const MockSearchFieldProps  : SearchFieldProps = {
  placeholder: 'Enter User name',
  value: 'Test', 
  type: 'text',
  onChange: () => {}
}

describe('SearchField', () => {
  test('renders SearchField', () => {
    render(<SearchField {...MockSearchFieldProps} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
