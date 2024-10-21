"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import ChartTransactionList from "@/components/Charts/Graph";
import { PageContainer } from "@/components/Container";
import { BarChartComponent } from "@/components/Charts/BarChart";
import { useGetAnalytics } from "@/service/analytics/hooks";
import { transactions } from "@/lib/images";


const AnalyticsCard = ({
  label,
  imageSrc,
  count,
}: {
  imageSrc: string;
  label: string;
  count: number;
}) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row gap-2 items-center">
      <Image src={imageSrc} alt={label} />
      <CardDescription>{label}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-4xl">{count}</h1>
        </div>
      </div>
    </CardContent>
  </Card>
);

const OverviewPage: FC = () => {
  const { pagesCount, visitorsCount, bouncesCount, sessionsCount } = useGetAnalytics();

  return (
    <div className="bg-brandGray h-screen overflow-hidden ">
      <PageContainer className="md:p-8 flex gap-8 flex-col ">
        <h3 className="py-5">Overview</h3>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
          <AnalyticsCard
            label="Total Page Views"
            imageSrc={transactions}
            count={pagesCount || 0}
          />
          <AnalyticsCard
            label="Total Bounce Rates"
            imageSrc={transactions}
            count={bouncesCount || 0}
          />
          <AnalyticsCard
            label="Total Unique Visitors"
            imageSrc={transactions}
            count={visitorsCount || 0}
          />
          <AnalyticsCard
            label="Total Sessions Duration"
            imageSrc={transactions}
            count={sessionsCount || 0}
          />
        </div>
        <div className="mt-12 flex lg:flex-row flex-col gap-6 w-full h-full">
          <div className="lg:w-[60%] w-full">
            <ChartTransactionList title="Sales" />
          </div>
          <div className="lg:w-[40%] w-full">
            <BarChartComponent />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default OverviewPage;
