import { render } from '@testing-library/react';
import {
  OrderStatus,
  orderStatusColorMap,
  orderStatusMap,
} from './order-status';

describe('order status', () => {
  it('should display the right text when order status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />);
    const statusText = wrapper.getByText(orderStatusMap.pending);
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass(orderStatusColorMap.pending);
  });

  it('should display the right text when order status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />);
    const statusText = wrapper.getByText(orderStatusMap.canceled);
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass(orderStatusColorMap.canceled);
  });

  it('should display the right text when order status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />);
    const statusText = wrapper.getByText(orderStatusMap.delivered);
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass(orderStatusColorMap.delivered);
  });

  it('should display the right text when order status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />);
    const statusText = wrapper.getByText(orderStatusMap.delivering);
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass(orderStatusColorMap.delivering);
  });

  it('should display the right text when order status is processing', () => {
    const wrapper = render(<OrderStatus status="processing" />);
    const statusText = wrapper.getByText(orderStatusMap.processing);
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass(orderStatusColorMap.processing);
  });
});
