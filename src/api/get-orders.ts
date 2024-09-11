import { api } from '@/lib/axios';

export type StatusOrder =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivered'
  | 'delivering';

export interface Order {
  orderId: string;
  createdAt: string;
  status: StatusOrder;
  customerName: string;
  total: number;
}

export interface Meta {
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export interface GetOrdersResponse {
  orders: Order[];
  meta: Meta;
}

export interface GetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export const getOrders = async ({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) => {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: pageIndex || 0,
      customerName,
      orderId,
      status: status === 'all' ? null : status,
    },
  });

  return response.data;
};
