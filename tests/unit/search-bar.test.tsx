import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '@/components/customer/search-bar'

describe('SearchBar', () => {
  it('T021: Renders input field', () => {
    const mockOnChange = vi.fn()
    const mockOnClear = vi.fn()

    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={false}
      />
    )

    const input = screen.getByPlaceholderText(/search menu/i)
    expect(input).toBeInTheDocument()
  })

  it('T021: Calls onChange callback with query', async () => {
    const mockOnChange = vi.fn()
    const mockOnClear = vi.fn()
    const user = userEvent.setup()

    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={false}
      />
    )

    const input = screen.getByPlaceholderText(/search menu/i)
    await user.type(input, 'salmon')

    // Should be called for each character typed (6 times for "salmon")
    expect(mockOnChange).toHaveBeenCalledTimes(6)
    expect(mockOnChange).toHaveBeenCalledWith('s')
    expect(mockOnChange).toHaveBeenCalledWith('a')
    expect(mockOnChange).toHaveBeenCalledWith('l')
    expect(mockOnChange).toHaveBeenCalledWith('m')
    expect(mockOnChange).toHaveBeenCalledWith('o')
    expect(mockOnChange).toHaveBeenCalledWith('n')
  })

  it('T021: Shows loading indicator during search', () => {
    const mockOnChange = vi.fn()
    const mockOnClear = vi.fn()

    const { rerender } = render(
      <SearchBar
        value="salmon"
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={false}
      />
    )

    // Initially no loading indicator
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    // Rerender with loading=true
    rerender(
      <SearchBar
        value="salmon"
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={true}
      />
    )

    // Loading spinner should be visible (check for the spinner div)
    const spinner = document.querySelector('[class*="animate-spin"]')
    expect(spinner).toBeInTheDocument()
  })

  it('T021: Shows clear button when value is present', () => {
    const mockOnChange = vi.fn()
    const mockOnClear = vi.fn()

    render(
      <SearchBar
        value="salmon"
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={false}
      />
    )

    const clearButton = screen.getByRole('button', { name: /clear search/i })
    expect(clearButton).toBeInTheDocument()
  })

  it('T021: Calls onClear when clear button is clicked', async () => {
    const mockOnChange = vi.fn()
    const mockOnClear = vi.fn()
    const user = userEvent.setup()

    render(
      <SearchBar
        value="salmon"
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={false}
      />
    )

    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)

    expect(mockOnClear).toHaveBeenCalledTimes(1)
  })

  it('T021: Does not show clear button when value is empty', () => {
    const mockOnChange = vi.fn()
    const mockOnClear = vi.fn()

    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        onClear={mockOnClear}
        loading={false}
      />
    )

    const clearButton = screen.queryByRole('button', { name: /clear search/i })
    expect(clearButton).not.toBeInTheDocument()
  })
})
