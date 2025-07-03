// src/__tests__/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App 컴포넌트', () => {
  it('"count is" 버튼이 화면에 보인다', () => {
    render(<App />);
    expect(screen.getByText(/count is/i)).toBeInTheDocument();
  });
});
