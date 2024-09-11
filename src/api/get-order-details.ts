import { api } from '@/lib/axios';
import { StatusOrder } from './get-orders';

export interface GetOrderDetailsParams {
  orderId: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string | null;
}

export interface OrderItem {
  id: string;
  priceInCents: number;
  quantity: number;
  product: {
    name: string;
  };
}

export interface GetOrderDetailsResponse {
  id: string;
  createdAt: string;
  status: StatusOrder;
  totalInCents: number;
  customer: Customer;
  orderItems: OrderItem[];
}

export const getOrderDetails = async ({ orderId }: GetOrderDetailsParams) => {
  const response = await api.get<GetOrderDetailsResponse>(`orders/${orderId}`);
  return response.data;
};
