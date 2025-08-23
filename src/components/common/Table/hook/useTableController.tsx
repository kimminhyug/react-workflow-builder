import { useState, useEffect } from 'react';

interface ITableApi<T> {
  //reactquery?등
  api: any;
  data: T | T[];
}
export const useTableController = <T,>(api: ITableApi<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // const response  = await api.get
    if (Array.isArray(api.data)) {
      setData([...api.data]);
    } else {
      setData([api.data]);
    }
    setLoading(false);
  };

  const add = async (item: T) => {
    // await api.post(item);
    fetchData();
  };

  const update = async (id: string, item: Partial<T>) => {
    // await api.put(id, item);
    fetchData();
  };

  const remove = async (id: string) => {
    // await api.delete(id);
    fetchData();
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return { data, loading, add, update, remove };
};
