import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import "./TechnologyTrendsChart.css";

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

const TechnologyTrendsChart = ({ data, loading }) => {
  const option = useMemo(() => {
    if (!data || data.length === 0) return {};

    const weeks = data.map((d) => d.week);
    const aiValues = data.map((d) => d.ai);
    const blockchainValues = data.map((d) => d.blockchain);

    return {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        textStyle: {
          color: "#000",
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
        },
        axisPointer: {
          type: "cross",
          crossStyle: { color: "#ccc" },
        },
      },
      grid: {
        left: 50,
        right: 30,
        top: 20,
        bottom: 40,
        containLabel: false,
      },
      xAxis: {
        type: "category",
        data: weeks,
        boundaryGap: false,
        axisLine: {
          lineStyle: { color: "#333", width: 1.5 },
        },
        axisTick: { show: false },
        axisLabel: {
          color: "#666",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          margin: 12,
        },
        splitLine: {
          show: true,
          lineStyle: { color: "#E8E8E8", type: "solid", width: 0.8 },
        },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        interval: 25,
        axisLine: {
          show: true,
          lineStyle: { color: "#333", width: 1.5 },
        },
        axisTick: { show: false },
        axisLabel: {
          color: "#666",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          formatter: "{value}%",
        },
        splitLine: {
          show: true,
          lineStyle: { color: "#E8E8E8", type: "solid", width: 0.8 },
        },
      },
      series: [
        {
          name: "Ai",
          type: "line",
          data: aiValues,
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: "#22C55E",
            width: 2,
          },
          itemStyle: {
            color: "#22C55E",
            borderColor: "#22C55E",
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 8,
              shadowColor: "rgba(34,197,94,0.3)",
            },
          },
        },
        {
          name: "Blockchain",
          type: "line",
          data: blockchainValues,
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: "#EF4444",
            width: 2,
          },
          itemStyle: {
            color: "#EF4444",
            borderColor: "#EF4444",
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 8,
              shadowColor: "rgba(239,68,68,0.3)",
            },
          },
        },
      ],
      animation: true,
      animationDuration: 800,
      animationEasing: "cubicOut",
    };
  }, [data]);

  if (loading) {
    return (
      <div className="chart-loading">
        <div className="chart-skeleton" />
      </div>
    );
  }

  return (
    <div className="trends-chart-wrapper">
      <ReactECharts
        option={option}
        style={{ height: "320px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default TechnologyTrendsChart;
