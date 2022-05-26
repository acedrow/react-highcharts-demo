import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGlobalContext } from "./useGlobalContext";
import {
  filterByRocketType,
  formatDataForDisplay
} from "./formatDataForDisplay";

type LaunchChartProps = {
  selectedRocket: string;
  launchStatus: string;
};

const LaunchChart = ({ selectedRocket, launchStatus }: LaunchChartProps) => {
  const { parsedLaunchData } = useGlobalContext();
  const options = {
    chart: {
      type: "column"
    },
    title: {
      text: "SpaceX Launches"
    },
    xAxis: {
      categories: parsedLaunchData?.years
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false
        }
      }
    },
    series: formatDataForDisplay(parsedLaunchData, launchStatus, selectedRocket)
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LaunchChart;
