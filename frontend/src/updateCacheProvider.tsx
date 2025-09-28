import React, { ReactNode, createContext, useContext, FC } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { find } from 'lodash';

const PaginatedCacheContext = createContext<
  | {
      updatePaginatedObject: UpdatePaginatedObjectType;
      updateAndMoveObjectToTop: (
        queryKey: string,
        objToUpdateId: string,
        updatedParams: any,
      ) => void;
      getUpdatedObjectSnapshot: GetUpdatedObjectSnapshot;
    }
  | undefined
>(undefined);

type CacheProviderProps = {
  children: ReactNode;
};

export const PaginatedCacheProvider: FC<CacheProviderProps> = (props) => {
  const { children } = props;

  const queryClient = useQueryClient();

  const updatePaginatedObject = (queryKey: string, objToUpdateId: string, updatedParams: any) => {
    queryClient.setQueryData([queryKey], (oldData: any) => {
      if (!oldData) return oldData;

      let cacheObjectUpdated = false;

      const newPages = oldData.pages.map((page: any) => {
        const newData = page.data.map((item: any) => {
          if (item.id === objToUpdateId) {
            cacheObjectUpdated = true;
            return { ...item, ...updatedParams };
          }
          return item;
        });

        return newData === page.data ? page : { ...page, data: newData };
      });

      return cacheObjectUpdated ? { ...oldData, pages: newPages } : oldData;
    });
  };

  const updateAndMoveObjectToTop = (
    queryKey: string,
    objToUpdateId: string,
    updatedParams: any,
  ) => {
    queryClient.setQueryData([queryKey], (oldData: any) => {
      if (!oldData) return oldData;

      let cacheObjectUpdated: any = null;

      const newPages = oldData.pages.map((page: any) => {
        const newData = page.data.filter((item: any) => {
          if (item.id === objToUpdateId) {
            cacheObjectUpdated = { ...item, ...updatedParams };
            return false;
          }
          return true;
        });
        return { ...page, data: newData };
      });

      if (cacheObjectUpdated) {
        newPages[0] = {
          ...newPages[0],
          data: [cacheObjectUpdated, ...newPages[0].data],
        };
      }

      return { ...oldData, pages: newPages };
    });
  };

  const getUpdatedObjectSnapshot = (queryKey: string, objToUpdateId: string) => {
    const cachedObj: any = queryClient.getQueryData([queryKey]);
    const valueList = cachedObj?.pages.flatMap((page: Page) => page.data) ?? [];
    const objectToUpdate = find(valueList, { id: objToUpdateId });

    return objectToUpdate;
  };

  const value = {
    updatePaginatedObject,
    updateAndMoveObjectToTop,
    getUpdatedObjectSnapshot,
  };

  return <PaginatedCacheContext.Provider value={value}>{children}</PaginatedCacheContext.Provider>;
};

export const usePaginatedCache = () => {
  const context = useContext(PaginatedCacheContext);
  if (context === undefined) {
    throw new Error('usePaginatedCache must be used within a PaginatedCacheProvider');
  }
  return context;
};
