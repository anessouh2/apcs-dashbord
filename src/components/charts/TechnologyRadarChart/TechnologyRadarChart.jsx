import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { RadarChart as ERadarChart } from "echarts/charts";
import { RadarComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import "./TechnologyRadarChart.css";

echarts.use([ERadarChart, RadarComponent, TooltipComponent, CanvasRenderer]);

const TechnologyRadarChart = ({ data, loading }) => {
  const option = useMemo(() => {
    if (!data || data.length === 0) return {};

    const indicator = data.map((d) => ({
      name: d.name,
      max: 100,
    }));
    const values = data.map((d) => d.value);

    return {
      tooltip: {
        trigger: "item",
        backgroundColor: "#fff",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        textStyle: {
          color: "#000",
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
        },
      },
      radar: {
        shape: "polygon",
        indicator: indicator,
        center: ["50%", "50%"],
        radius: "65%",
        startAngle: 90,
        splitNumber: 4,
        axisName: {
          color: "#000",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          padding: [0, 0, 0, 0],
        },
        nameGap: 18,
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              "rgba(245,245,247,0.3)",
              "rgba(230,230,230,0.2)",
              "rgba(245,245,247,0.3)",
              "rgba(230,230,230,0.2)",
            ],
          },
        },
        axisLine: {
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        splitLine: {
          lineStyle: {
            color: "#ccc",
            width: 1,
          },
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: values,
              name: "Research",
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(220, 80, 100, 0.6)" },
                  { offset: 1, color: "rgba(220, 80, 100, 0.15)" },
                ]),
              },
              lineStyle: {
                color: "rgba(220, 80, 100, 0.7)",
                width: 1.5,
              },
              itemStyle: {
                color: "rgba(220, 80, 100, 0.8)",
              },
            },
            {
              value: values.map((v) => v * 0.75),
              name: "Prototype",
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(140, 130, 200, 0.5)" },
                  { offset: 1, color: "rgba(140, 130, 200, 0.1)" },
                ]),
              },
              lineStyle: {
                color: "rgba(140, 130, 200, 0.6)",
                width: 1.5,
              },
              itemStyle: {
                color: "rgba(140, 130, 200, 0.7)",
              },
            },
            {
              value: values.map((v) => v * 0.55),
              name: "Demo",
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(230, 170, 60, 0.55)" },
                  { offset: 1, color: "rgba(230, 170, 60, 0.1)" },
                ]),
              },
              lineStyle: {
                color: "rgba(230, 170, 60, 0.6)",
                width: 1.5,
              },
              itemStyle: {
                color: "rgba(230, 170, 60, 0.7)",
              },
            },
          ],
          symbol: "none",
          emphasis: {
            lineStyle: { width: 2.5 },
          },
        },
      ],
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicOut",
    };
  }, [data]);

  if (loading) {
    return (
      <div className="radar-loading">
        <div className="radar-skeleton" />
      </div>
    );
  }

  return (
    <div className="radar-chart-wrapper">
      <ReactECharts
        option={option}
        style={{ height: "340px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default TechnologyRadarChart;
