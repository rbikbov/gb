import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { SearchInput } from '@/shared/ui/SearchInput';

describe('SearchInput', () => {
  test('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChange={vi.fn()} placeholder="Search users..." />
    );

    expect(getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  test('should call onChange when value changes', () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <SearchInput value="" onChange={onChange} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalledWith('test');
  });

  test('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <SearchInput value="" onChange={vi.fn()} disabled />
    );

    const input = getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('should apply custom className', () => {
    const { container } = render(
      <SearchInput value="" onChange={vi.fn()} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
