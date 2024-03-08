"use client"
import React, { useEffect, useState, useMemo } from 'react'
import Custom_Table from '@/components/common/Custom_Table';
import { Plus } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useCreateDisplayType, useGetDisplay } from '../_api/display.config';
import { queryClient } from '@/components/Providers/QueryClientProvider';
import { diaplayColumns } from '@/data/admin/tableColumns';
import CustomTab from '@/components/common/admin-config/CustomTab';

const Page = () => {
  const { data, isLoading, isError } = useGetDisplay();
  const [visible, setVisible] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    identifier: ''
  })
  const { mutate, isPending } = useCreateDisplayType()

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      default:
        return <div>{data[field]}</div>;
    }
  };


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      name: e.target.value,
      identifier: e.target.value.toLowerCase().replace(/\s+/g, '-'),
    }));
  }

  const handleDisplaySubmit = () => {
    mutate(inputData, {
      onSuccess: (data) => {
        console.log('Success ', data)
        queryClient.invalidateQueries({ queryKey: ["allDisplay"] })
      },
      onError: (err) => {
        console.log('Success ', err)
      },
      onSettled: (data, error) => {
        console.log('Success ', data, error)
      },
    })
    if (inputData.name && !isPending) {
      setVisible(false);
      setInputData({
        name: '',
        identifier: ''
      })
    }
  }

  return (
    <div className='overflow-hidden'>

      <CustomTab
        setVisible={setVisible}
        visible={visible}
        title="Display Configuration"
        ActionType="Add Diaplay"
      />

      <div>
        {!isLoading && (
          <Custom_Table
            data={data?.data}
            columnFilter
            handleSwitch={handleSwitch}
            showColumns={diaplayColumns}
          />
        )}
      </div>
      <Dialog draggable={false} header="Add New Display" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} className='rounded p-2'>
        <div className="flex flex-col  items-center">
          <div className='w-4/5 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="username">Name</label>
              <InputText id="username" aria-describedby="username-help" onChange={handleInput} required />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="identifier">Identifier</label>
              <InputText id="identifier" value={inputData.identifier} aria-describedby="identifier-help" disabled />
            </div>
            <Button label='Create Display' onClick={handleDisplaySubmit} disabled={isPending} type='submit' />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Page