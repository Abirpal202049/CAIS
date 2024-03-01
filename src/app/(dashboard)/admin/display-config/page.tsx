"use client"
import React, { useEffect, useState, useMemo } from 'react'
import Custom_Table from '@/components/common/Custom_Table';
import { Plus } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useCreateDisplayType, useGetDisplay } from '../_api/display.config';

const Page = () => {
  const { data , isLoading, isError } = useGetDisplay();
  const [visible, setVisible] = useState(false);
  const [inputData, setInputData] = useState({
    name:''
  })
  const { mutate, isPending } = useCreateDisplayType()

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

  const handleDisplaySubmit = () => {
    mutate(inputData, {
      onSuccess: (data) => {
        console.log('Success ', data)
      },
      onError: (err) => {
        console.log('Success ', err)
      },
      onSettled: (data, error) => {
        console.log('Success ', data, error)
      },
    })
    if (!isPending) {
      setVisible(false);
      setInputData({
        name:''
      })
    }
  }

  return (
    <div className='overflow-hidden'>
      <div className=' flex justify-between px-3'>
        <p className='!text-xl font-semibold'>Action Configuration</p>
        <div className='flex gap-1 cursor-pointer justify-center items-center text-brand font-bold hover:border-primary' onClick={() => setVisible(!visible)}>
          <Plus/> <p>Add Action</p>
        </div>
      </div>
      <div>
       {!isLoading && (
        <Custom_Table 
         data={data?.data} 
         handleSwitch={handleSwitch} 
         showColumns={showColumns}
        />
      )}
      </div>
      <Dialog header="Add New Action" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} className='rounded p-2'>
        <div className="flex flex-col  items-center">
          <div className='w-4/5 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="rname">Name</label>
              <InputText id="rname" aria-describedby="username-help" onChange={(e)=>setInputData({name:e.target.value})} value={inputData.name}/>
            </div>

            <Button label='Create Action' onClick={handleDisplaySubmit} disabled={isPending} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Page