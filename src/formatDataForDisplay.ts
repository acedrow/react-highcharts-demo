import { LaunchData } from "./parseApiResponse";
import { ParsedLaunchData } from "./useGlobalContext";

export const countLaunchStatus = (data: LaunchData[], successful: boolean) => {
  return data.reduce((previousValue, currentValue) => {
    const countValue = successful
      ? currentValue.launch_success
      : !currentValue.launch_success;
    return previousValue + (countValue ? 1 : 0);
  }, 0);
};

const countRocketType = (data: LaunchData[], rocketType: string) => {
  return data.reduce((previousValue, currentValue) => {
    return (
      previousValue + (currentValue.rocket.rocket_id === rocketType ? 1 : 0)
    );
  }, 0);
};

export const filterByRocketType = (
  data: LaunchData[][] | undefined,
  selectedRocket: string
) => {
  let filteredData = data;
  if (selectedRocket !== "all") {
    filteredData = filteredData?.map((yearData) =>
      yearData.filter((data) => data.rocket.rocket_id === selectedRocket)
    );
  }
  return filteredData;
};

const formatDataForAllRockets = (
  parsedLaunchData: ParsedLaunchData,
  launchStatus: string
) => {
  const filteredData = parsedLaunchData.launchesByYear.map((yearData) => {
    let tempData = [...yearData];
    if (launchStatus !== "all") {
      tempData = tempData.filter((data) =>
        launchStatus === "succeeded"
          ? data.launch_success
          : !data.launch_success
      );
    }
    return tempData;
  });

  return parsedLaunchData.rocketNames.map((name) => {
    return {
      name: name,
      data: filteredData.map((yearData) => countRocketType(yearData, name))
    };
  });
};

const formatDataForSpecificRocket = (
  parsedLaunchData: ParsedLaunchData,
  rocket: string
) => {
  const filteredData = parsedLaunchData.launchesByYear.map((yearData) => {
    let tempData = [...yearData];
    tempData = tempData.filter((data) => data.rocket.rocket_id === rocket);
    return tempData;
  });
  console.log("specific rocket format", filteredData);
  return [
    {
      name: "Successful",
      data: filteredData?.map((yearData) => countLaunchStatus(yearData, true))
    },
    {
      name: "Failed",
      data: filteredData?.map((yearData) => countLaunchStatus(yearData, false))
    }
  ];
};

export const formatDataForDisplay = (
  parsedLaunchData: ParsedLaunchData | undefined,
  launchStatus: string,
  rocket: string
) => {
  if (parsedLaunchData !== undefined) {
    if (rocket === "all") {
      return formatDataForAllRockets(parsedLaunchData, launchStatus);
    } else {
      return formatDataForSpecificRocket(parsedLaunchData, rocket);
    }
  } else return [];
};
