import React, { ReactNode, createContext, useContext, FC } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { find } from "lodash";

const PaginatedCacheContext = createContext<
  | {
      updatePaginatedObject: UpdatePaginatedObjectType;
      updateAndMoveObjectToTop: (
        queryKey: string,
        objToUpdateId: string,
        updatedParams: any
      ) => void;
      getUpdatedObjectSnapshot: GetUpdatedObjectSnapshot;
      addItemToPaginatedList: (queyKey: string, newItem: any) => void;
      removeItemFromPaginatedList: (queryKey: string, itemId: string) => void;
      updateNestedPagination: (
        itemId: string,
        paginationName: string,
        paginate: Record<string, any>
      ) => unknown;
      onFetchNestedPagination: (
        id: string,
        paginationName: string
      ) => {
        pageParam: any;
      };
    }
  | undefined
>(undefined);

type CacheProviderProps = {
  children: ReactNode;
};

export const PaginatedCacheProvider: FC<CacheProviderProps> = (props) => {
  const { children } = props;

  const queryClient = useQueryClient();

  const updatePaginatedObject = (
    queryKey: string,
    objToUpdateId: string,
    updatedParams: any
  ) => {
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
    updatedParams: any
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

  const addItemToPaginatedList = (queyKey: string, newItem: any) => {
    queryClient.setQueryData([queyKey], (oldData: any) => {
      if (!oldData) {
        return {
          pages: [
            {
              data: [newItem],
              paginate: { page: 1, max_page: 1, per_page: 10, total_count: 1 },
            },
          ],
          pageParams: [1],
        };
      }

      const updatedPages = oldData.pages.map((page: any, idx: number) => {
        if (idx === 0) {
          return {
            ...page,
            data: [newItem, ...page.data],
            paginate: {
              ...page.paginate,
              total_count: page.paginate.total_count + 1,
            },
          };
        }
        return page;
      });

      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  };

  const removeItemFromPaginatedList = (queryKey: string, itemId: string) => {
    queryClient.setQueryData([queryKey], (oldData: any) => {
      if (!oldData) return oldData;

      const newPages = oldData.pages.map((page: any) => {
        const existed = page.data.some((item: any) => item.id === itemId);
        const newData = page.data.filter((item: any) => item.id !== itemId);

        return {
          ...page,
          data: newData,
          paginate: {
            ...page.paginate,
            total_count: page.paginate.total_count - (existed ? 1 : 0),
          },
        };
      });

      return { ...oldData, pages: newPages };
    });
  };

  const getUpdatedObjectSnapshot = (
    queryKey: string,
    objToUpdateId: string
  ) => {
    const cachedObj: any = queryClient.getQueryData([queryKey]);
    const valueList = cachedObj?.pages.flatMap((page: Page) => page.data) ?? [];
    const objectToUpdate = find(valueList, { id: objToUpdateId });

    return objectToUpdate;
  };

  const updateNestedPagination = (
    itemId: string,
    paginationName: string,
    paginate: Record<string, any>
  ) =>
    queryClient.setQueryData([paginationName], (oldData: any[]) => {
      const data = oldData ?? [];

      if (data.length === 0) return [{ id: itemId, paginate: paginate }];

      if (!find(data, { id: itemId })) {
        return [...data, { id: itemId, paginate: paginate }];
      }

      return data.map((item) => {
        if (item.id !== itemId) return item;
        return { id: itemId, paginate: paginate };
      });
    });

  const handleFetchRecords = (id: string, paginationName: string) => {
    const paginationArray: Record<string, any>[] | undefined =
      queryClient.getQueryData([paginationName]);

    const paginationObj = find(paginationArray, {
      id: id,
    })?.paginate;

    const page = paginationObj?.page;
    const max_page = paginationObj?.max_page;
    const pageParam = page < max_page ? page + 1 : undefined;

    return { pageParam };
  };

  const value = {
    updatePaginatedObject,
    updateAndMoveObjectToTop,
    getUpdatedObjectSnapshot,
    addItemToPaginatedList,
    removeItemFromPaginatedList,
    updateNestedPagination,
    onFetchNestedPagination: handleFetchRecords,
  };

  return (
    <PaginatedCacheContext.Provider value={value}>
      {children}
    </PaginatedCacheContext.Provider>
  );
};

export const usePaginatedCache = () => {
  const context = useContext(PaginatedCacheContext);
  if (context === undefined) {
    throw new Error(
      "usePaginatedCache must be used within a PaginatedCacheProvider"
    );
  }
  return context;
};
