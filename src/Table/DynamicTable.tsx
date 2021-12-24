import 'bootstrap/dist/css/bootstrap.min.css';

import { FilterValue, IdType, Row } from 'react-table';
import React, { useEffect, useMemo, useState } from 'react';

import LoadingDataAnimation from '../components/LoadingDataAnimation';
import { Table } from './Table';
import axios from 'axios';

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';

type DynamictableProps = {
  url: string;
  canGroupBy?: boolean;
  canSort?: boolean;
  canResize?: boolean;
  canSelect?: boolean;
  actionColumn?: React.ReactNode;
};

export default function DynamicTable({
  url,
  actionColumn,
  canGroupBy,
  canSort,
  canSelect,
  canResize,
}: DynamictableProps) {
  const [apiResult, setApiResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const [error, setError] = useState<null | any>(null);

  async function fetchData(url: string) {
    await axios
      .get(url)
      .then((response) => {
        setApiResult(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const apiResultColumns = useMemo(
    () =>
      apiResult[0]
        ? Object.keys(apiResult[0])
            .filter((key) => key !== 'rating')
            .map((key) => {
              if (key === 'image') {
                return {
                  Header: key,
                  accessor: key,
                  disableFilters: true,
                  Cell: (value: any) => {
                    return (
                      <img
                        src={value.cell.value}
                        className="h-25 w-25"
                        alt=""
                      />
                    );
                  },
                };
              }

              return {
                Header: key,
                accessor: key,
                aggregate: 'count',
                Aggregated: ({ cell: { value } }: any) => `${value} Names`,
              };
            })
        : [],
    [apiResult]
  );

  const columns: any = useMemo(() => apiResultColumns, [apiResultColumns]);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  if (loading) return <LoadingDataAnimation />;

  return (
    <Table
      name={'myTable'}
      columns={columns}
      data={apiResult}
      canGroupBy={canGroupBy}
      canSort={canSort}
      canResize={canResize}
      canSelect={canSelect}
      actionColumn={actionColumn}
    />
  );
}
