import { render } from '@testing-library/react';
import UiLogo from './ui-logo';
describe('UiLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiLogo />);
    expect(baseElement).toBeTruthy();
  });
});
