import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { analyticsData } from "@/mocks/cardAnalytics";
import ChartTransactionList from "@/components/Charts/Graph";
import { PageContainer } from "@/components/Container";
import { BarChartComponent } from "@/components/Charts/BarChart";

const OverviewPage: FC = () => {
  return (
    <div className="bg-brandGray h-screen overflow-hidden ">
      <PageContainer className="md:p-8 flex gap-10 flex-col ">
        <h3>Overview</h3>
        <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-1 gap-5">
          {analyticsData.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row gap-2 items-center">
                <Image src={item.imageSrc} width={24} height={24} alt={item.description} />
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <h1 className="text-4xl">{item.points}</h1>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p>
                  <span className="text-primary px-2 ">{item.tolorence}</span>
                  {item.footerText}
                </p>
              </CardFooter>
            </Card>
          ))}
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
