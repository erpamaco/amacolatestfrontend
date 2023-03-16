import React from "react";
import ReactEcharts from "echarts-for-react";
import { merge } from "lodash";
import { useTheme } from "@material-ui/core/styles";


const ModifiedAreaChart = ({ height, option, maxVal }) => {
  const { palette } = useTheme();
  const defaultOption = {
    grid: {
      top: 16,
      left: 36,
      right: 16,
      bottom: 32,
    },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    tooltip: {
      show: true,
      trigger: "axis",

      axisPointer: {
        type: "cross",
        lineStyle: {
          opacity: 0,
        },
      },
      crossStyle: {
        color: "#000",
      },
    },
    series: [
      {
        
        areaStyle: {},
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#fff",
        },
      },
    ],
    xAxis: {
      show: true,
      type: "category",
      showGrid: false,
      boundaryGap: false,
      axisLabel: {
        color: "#ccc",
        margin: 20,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: Math.round(maxVal) + 99999,
      axisLabel: {
        color: "#ccc",
        margin: 0,
        // marginLeft:10,
        fontSize: 9,
        fontFamily: "roboto",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255, 255, 255, .1)",
        },
      },

      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    color: [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(255,255,255,0.3)", // color at 0% position
          },
          {
            offset: 1,
            color: "rgba(255,255,255,0)", // color at 100% position
          },
        ],
        global: false, // false by default
      },
    ],
  };
  return (
    <ReactEcharts
      style={{ height: height }}
      option={merge({}, defaultOption, option)}

    />
  );
};

export default ModifiedAreaChart;
