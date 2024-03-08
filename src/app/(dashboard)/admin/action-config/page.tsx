"use client"
import React, { useState } from 'react'
import Custom_Table from '@/components/common/Custom_Table';
import { Dialog } from 'primereact/dialog';
import { Plus } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useCreateActionType, useGetActions } from '../_api/action.config';
import { queryClient } from '@/components/Providers/QueryClientProvider';
import { ActionColumns } from '@/data/admin/tableColumns';
import CustomTab from '@/components/common/admin-config/CustomTab';

const Page = () => {
  const { data, isLoading, isError } = useGetActions();
  const [visible, setVisible] = useState(false);
  const { mutate, isPending } = useCreateActionType()
  const [inputData, setInputData] = useState({
    name: '',
    identifier: ''
  })



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

  const handleActionSubmit = () => {
    mutate(inputData, {
      onSuccess: (data) => {
        console.log('Success ', data)
        queryClient.invalidateQueries({ queryKey: ["allActions"] })
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
        title="Action Configuration"
        ActionType="Add Action"
        visible={visible}
      />
      <div>
        {!isLoading && (
          <Custom_Table
            data={data?.data}
            columnFilter
            handleSwitch={handleSwitch}
            showColumns={ActionColumns}
          />
        )}
      </div>
      <Dialog draggable={false} header="Add New Action" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} className='rounded p-2'>
        <div className="flex flex-col  items-center">
          <div className='w-4/5 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="username">Name</label>
              <InputText id="username" aria-describedby="username-help" onChange={handleInput} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="identifier">Identifier</label>
              <InputText id="identifier" value={inputData.identifier} aria-describedby="identifier-help" disabled />
            </div>
            <Button label='Create Action' onClick={handleActionSubmit} disabled={isPending} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Page