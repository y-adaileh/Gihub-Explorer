import { render, screen } from '@testing-library/react';
import { ErrorMessage, ErrorMessageProps } from '.';

const MockErrorMessageProps : ErrorMessageProps = {
    onRetry: () => {},
    message: 'Oops! Something went wrong!'
} 

describe('ErrorMessage', () => {
  test('renders ErrorMessage text', () => {
    render(<ErrorMessage {...MockErrorMessageProps}/>);
    expect(screen.getByText(MockErrorMessageProps.message)).toBeInTheDocument();
  });
});
