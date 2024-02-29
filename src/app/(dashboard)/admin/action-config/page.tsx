"use client"
import React from 'react'
import { useGetActions } from '../_api/alert_config';
import Custom_Table from '@/components/common/Custom_Table';

const Page = () => {
  const { data, isLoading, isError } = useGetActions();

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      default:
        return <div>{data[field]}</div>;
    }
  };

  const showColumns = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "identifier",
      header: "Identifier",
    },
    {
      field: "created_at",
      header: "Created",
    },
    {
      field: "updated_at",
      header: "Updated",
    },
  ];

  return (
    <div className='overflow-hidden'>
       {!isLoading && (
        <Custom_Table 
          data={data?.data} 
          handleSwitch={handleSwitch} 
          showColumns={showColumns}
        />
      )}
    </div>
  )
}

export default Page