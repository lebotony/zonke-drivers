import React, { ReactNode, createContext, useContext, FC } from "react";

import { useQueries } from "@tanstack/react-query";

const UseQueryContext = createContext<
  | {
      getCachedData: (queryKeys: QueryKeys) => any;
    }
  | undefined
>(undefined);

type UseQueryProviderProps = {
  children: ReactNode;
};

// 'threads' | 'user' | 'fetchedMsgThreadIds' | 'businessProfiles' | 'threadChannels

type QueryKeys = string[];

export const UseCustomQueryProvider: FC<UseQueryProviderProps> = (props) => {
  const { children } = props;

  const getCachedData = (queryKeys: QueryKeys) => {
    const results = useQueries({
      queries: queryKeys.map((key) => ({
        queryKey: [key],
        queryFn: () => Promise.resolve(null),
        enabled: false,
      })),
    });

    return queryKeys.reduce(
      (acc, key, index) => {
        if (results[index].data?.pageParams) {
          acc[key] =
            results[index].data?.pages?.flatMap?.((page: Page) => page.data) ??
            [];
          return acc;
        } else {
          acc[key] = results[index].data;
          return acc;
        }
      },
      {} as Record<string, any>
    );
  };

  return (
    <UseQueryContext.Provider value={{ getCachedData }}>
      {children}
    </UseQueryContext.Provider>
  );
};

export const useCustomQuery = () => {
  const context = useContext(UseQueryContext);
  if (context === undefined) {
    throw new Error(
      "useCustomQuery must be used within a UseCustomQueryProvider"
    );
  }
  return context;
};
