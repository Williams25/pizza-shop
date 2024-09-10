import { Helmet } from 'react-helmet-async';
import { MonthRevenueCard } from './month-revenue-card';
import { MonthOrdersAmountCard } from './month-orders-amount-card';
import { DayOrdersAmountCard } from './day-orders-amount-card';
import { MonthCanceledAmountCard } from './month-canceled-amount-card';
import { RevenueChart } from './revenue-chart';
import { PopularProductsChart } from './popular-products-chart';

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="tracking-tigh text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
};
