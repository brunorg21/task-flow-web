"use client";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { blue } from "tailwindcss/colors";

export function CompletedTasksOnMothChart() {
  const completedData = [
    { date: "20/10", quantity: 60 },
    { date: "15/09", quantity: 86 },
    { date: "06/08", quantity: 26 },
    { date: "06/10", quantity: 21 },
    { date: "03/07", quantity: 45 },
    { date: "31/10", quantity: 67 },
    { date: "06/08", quantity: 89 },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={completedData} style={{ fontSize: 12 }}>
        <XAxis dataKey={"date"} tickLine={false} axisLine={false} dy={16} />
        <YAxis stroke="#888" axisLine={false} tickLine={false} width={80} />
        <CartesianGrid vertical={false} className="stroke-muted" />
        <Line
          type="linear"
          strokeWidth={2}
          dataKey="quantity"
          stroke={blue["500"]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
