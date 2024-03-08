import { Plus } from 'lucide-react'
import React from 'react'

const CustomTab = ({setVisible,visible,title,ActionType}:any) => {
  return (
    <div className='flex justify-between px-3 py-2'>
        <p className='!text-xl font-semibold'>{title}</p>
        <div className='flex gap-1 cursor-pointer justify-center items-center text-brand font-bold hover:border-primary' onClick={() => setVisible(!visible)}>
          <Plus /> <p>{ActionType}</p>
        </div>
      </div>
  )
}

export default CustomTab