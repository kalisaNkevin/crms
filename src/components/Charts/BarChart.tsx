"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Alita Syndicate", desktop: 300, mobile: 80 },
  { name: "Bingo Syndicate", desktop: 290, mobile: 200 },
  { name: "Angel Syndicate", desktop: 250, mobile: 120 },
  { name: "Cyndy Syndicate", desktop: 220, mobile: 190 },
  { name: "Tie Syndicate", desktop: 200, mobile: 130 },
  { name: "Generative Syndicate", desktop: 150, mobile: 140 },
  { name: "Amazon Syndicate", desktop: 120, mobile: 140 },
  { name: "Legal Syndicatee", desktop: 50, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <div className="bg-white rounded-xl w-full h-full">
      <Card className="w-full h-full !border-none">
        <CardHeader>
          <h1 className="lg:text-lg text-base">Best Customers Sales</h1>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="desktop" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="desktop"
                layout="vertical"
                fill="#0083D3"
                radius={4}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={30}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                {/* <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              /> */}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
