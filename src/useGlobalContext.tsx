import React, { useContext, useState } from "react";
import { LaunchData } from "./parseApiResponse";

export type ParsedLaunchData = {
  rocketNames: string[];
  years: string[];
  launchesByYear: LaunchData[][];
};

type Context = {
  parsedLaunchData: ParsedLaunchData | undefined;
  setLaunchData: (launchData: any) => void;
};

const GlobalContext = React.createContext<Context>({
  parsedLaunchData: undefined,
  setLaunchData: () => {}
});

export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);
  return globalContext;
};

export const GlobalContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [launchData, setLaunchData] = useState();

  return (
    <GlobalContext.Provider
      value={{
        parsedLaunchData: launchData,
        setLaunchData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
