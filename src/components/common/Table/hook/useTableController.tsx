import { useEffect, useState } from 'react';

interface ITableApi<T> {
  //reactquery?등
  api: any;
  data: T | T[];
}
export const useTableController = <T,>(api: ITableApi<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  //test fn
  const fetchData = async (_id: string, isRemove = false) => {
    setLoading(true);
    // const response  = await api.get
    let response: T[] = [];
    if (!isRemove) {
      if (Array.isArray(api.data)) {
        response = [...api.data];
      } else {
        response = [api.data];
      }
    }

    setData(response);
    setLoading(false);
    return response;
  };

  const add = async (_item: T) => {
    // await api.post(item);
    const id = Date.now().toString();
    const response = await fetchData(id);
    localStorage.setItem(id ?? Date.now().toString(), JSON.stringify(response));
  };

  const update = async (id: string, _item: Partial<T>) => {
    // await api.put(id, item);
    const response = await fetchData(id);
    localStorage.setItem(id ?? Date.now().toString(), JSON.stringify(response));
  };

  const remove = async (id: string) => {
    // await api.delete(id);
    // const response = await fetchData(id, true);
    // if(statusCode===200)
    localStorage.removeItem(id ?? Date.now().toString());
  };

  useEffect(() => {
    // fetchData();
    if (Array.isArray(api.data)) {
      setData([...api.data]);
    } else {
      setData([api.data]);
    }
  }, [api.data]);

  return { data, loading, add, update, remove };
};
