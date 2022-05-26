import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./useGlobalContext";
import LaunchChart from "./LaunchChart";
import parseLaunchData from "./parseApiResponse";

export default function App() {
  const { parsedLaunchData, setLaunchData } = useGlobalContext();
  const [selectedRocket, setSelectedRocket] = useState("all");
  const [launchStatus, setLaunchStatus] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.spacexdata.com/v3/launches/past"
      );
      setLaunchData(parseLaunchData(result.data));
    };

    fetchData();
  }, [setLaunchData]);

  return (
    <div>
      Rocket Type:
      <select
        onChange={(e) => {
          setSelectedRocket(e.target.value);
        }}
        aria-label="Filter by rocket type"
      >
        <option>all</option>
        {parsedLaunchData?.rocketNames.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
      {selectedRocket === "all" && (
        <div
          onChange={(e) => {
            //@ts-ignore
            setLaunchStatus(e.target.value);
          }}
        >
          Launch Status:
          <input type="radio" value="all" checked={launchStatus === "all"} />
          All
          <input
            type="radio"
            value="succeeded"
            checked={launchStatus === "succeeded"}
          />
          Succeeded
          <input
            type="radio"
            value="failed"
            checked={launchStatus === "failed"}
          />
          Failed
        </div>
      )}
      <LaunchChart
        selectedRocket={selectedRocket}
        launchStatus={launchStatus}
      />
    </div>
  );
}
