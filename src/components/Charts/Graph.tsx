"use client";
import React from "react";
import { PageContainer } from "@/components/Container";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { IAreaCharts } from "@/types/charts";

const chartConfig: ChartConfig = {
  primary: {
    label: "Primary",
    color: "#F08F1E",
  },
  secondary: {
    label: "Secondary",
    color: "#F08F1E",
  },
};

const ChartTransactionList = ({
  title,
  data,
}: {
  title: string;
  data: IAreaCharts[];
}) => {
  return (
    <div className="bg-white w-full">
      <PageContainer className="p-6 w-full">
        <h1 className="py-5 text-xl font-medium">{title}</h1>
        <div className="bg-white w-full">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 223, 185, 0.4)" />
                    <stop offset="100%" stopColor="rgba(255, 187, 109, 0)" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis
                  domain={[0, 80]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F08F1E"
                  fill="url(#colorUv)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </PageContainer>
    </div>
  );
};

export default ChartTransactionList;
