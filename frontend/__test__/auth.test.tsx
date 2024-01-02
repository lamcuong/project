import Home from '@/container/auth/testComponent'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Page', () => {
  it('renders a heading', () => {
    const container = render(<Home />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
})
