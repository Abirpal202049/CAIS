"use client"
import React, { useMemo } from 'react'
import { useGetActions } from '../_api/alert_config';
import Custom_Table from '@/components/common/Custom_Table';

const Page = () => {
  const { data, isLoading, isError } = useGetActions();
  console.log("Actions :",data)

  const tableData:any = useMemo(() => {
    if (data && data.data) {
      return data.data.map(({ action_id, ...rest }) => rest);
    }
    return [];
  }, [data]);

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      default:
        return <div>{data[field]}</div>;
    }
  };

  return (
    <div className='overflow-hidden'>
       {!isLoading && (
        <Custom_Table data={tableData} handleSwitch={handleSwitch} />
      )}
    </div>
  )
}

export default Page