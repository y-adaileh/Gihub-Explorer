import { render, screen } from '@testing-library/react';
import { SearchTap, SearchTapProps } from '.';
import { SearchTapLabel } from '@/types';

const MockSearchTapProps  : SearchTapProps = {
    label: SearchTapLabel.Users,
    isActive: true,
    onTapSelect: () => {}
}

describe('SearchTap', () => {
  test('renders SearchTap', () => {
    render(<SearchTap {...MockSearchTapProps} />);
    expect(screen.getByText(MockSearchTapProps.label)).toBeInTheDocument();
  });
});
