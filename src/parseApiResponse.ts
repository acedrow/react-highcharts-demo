export type LaunchData = {
  launch_year: string;
  launch_success: boolean;
  rocket: {
    rocket_id: string;
  };
};

const parseLaunchData = (data: LaunchData[]) => {
  let rocketNames = new Map();
  let years = new Map();
  let launchesByYear = new Map<string, LaunchData[]>(); //key = year, value = [launch data]

  data.forEach((launch) => {
    const year = launch.launch_year;
    years.set(year, true);
    rocketNames.set(launch.rocket.rocket_id, true);

    let prevData = launchesByYear.get(year);
    let newData = [launch];
    if (prevData !== undefined) {
      newData = prevData.concat(newData);
    }
    launchesByYear.set(year, newData);
  });
  return {
    rocketNames: Array.from(rocketNames.keys()),
    years: Array.from(years.keys()),
    launchesByYear: Array.from(launchesByYear.values())
  };
};

export default parseLaunchData;
