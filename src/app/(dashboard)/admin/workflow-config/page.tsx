"use client"
import React, { useState } from 'react'
import { useCreateWorkflowType, useGetWorkflow } from '../_api/workflow-config';
import Custom_Table from '@/components/common/Custom_Table';
import { Plus } from 'lucide-react';
import { workflowColumns } from '@/data/admin/tableColumns';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { queryClient } from '@/components/Providers/QueryClientProvider';

type Props = {}

export default function WorkflowConfigPage({}: Props) {
  const { data, isLoading,isPending, isError } = useGetWorkflow();
  const { mutate } = useCreateWorkflowType()
  const [visible, setVisible] = useState(false);
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

  const handleDisplaySubmit = () => {
    mutate(inputData, {
      onSuccess: (data) => {
        console.log('Success ', data)
        queryClient.invalidateQueries({ queryKey: ["allWorkflow"] })
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
        name:'',
        identifier:''
      })
    }
  }

  return (
    <div className='overflow-hidden'>
       <div className=' flex justify-between px-3 py-2'>
        <p className='!text-xl font-semibold'>Workflow  Configuration</p>
        <div className='flex gap-1 cursor-pointer justify-center items-center text-brand font-bold hover:border-primary' onClick={() => setVisible(!visible)}>
          <Plus /> <p>Add Workflow</p>
        </div>
      </div>
        <div>
        {!isLoading && (
          <Custom_Table
            data={data?.data}
            columnFilter
            handleSwitch={handleSwitch}
            showColumns={workflowColumns}
          />
        )}
      </div>

      <Dialog draggable={false} header="Add New Workflow" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} className='rounded p-2'>
        <div className="flex flex-col  items-center">
          <div className='w-4/5 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="username">Name</label>
              <InputText id="username" aria-describedby="username-help" onChange={handleInput} required/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="identifier">Identifier</label>
              <InputText id="identifier" value={inputData.identifier} aria-describedby="identifier-help" disabled />
            </div>
            <Button label='Create Workflow' onClick={handleDisplaySubmit} disabled={isPending} type='submit' />
          </div>
        </div>
      </Dialog>
    </div>
  )
}