import React from 'react';
import Button from "../../utils/theme/Button";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const HelpdeskForm = ({onClose}) => {
  return (
    <div className='text-base p-2 border border-gray-300 rounded-md'> 
      <div className='bg-gray-300 p-4 font-semibold'>New Request</div>
      
      <div className='mt-4'>
        <label className='block text-xs font-medium'>Category</label>
        <div>
          <select className='w-1/3 border border-gray-300 p-2 rounded-md'>
            <option value="">Select a category</option>
            <option value="technical">Employee Information</option>
            <option value="billing">Income Tax</option>
            <option value="general"> Loans</option>
            <option value="general"> Payslips</option>
            <option value="general"> Others</option>
          </select>
        </div>
      </div>

      <div className='mt-4'>
        <label className='block text-xs  font-medium'>Subject</label>
        <input 
          type="text" 
          placeholder='Subject line' 
          className='w-full border border-gray-300 p-2 rounded-md'
        />
      </div>

      <div className='mt-4'>
        <label className='block text-xs font-medium'>Description</label>
        <textarea 
          placeholder='Write Here' 
          rows="5"
          className='w-full border border-gray-300 p-2 rounded-md'
        />
      </div>

      <div className='mt-4'>
        <label className='block text-xs font-medium'>Attach file</label>
        <input type="file" className='w-full border border-gray-300 p-2 rounded-md' />
      </div>

      <div className='mt-4'>
        <label className='block font-medium text-xs'>CC to</label>
        <div className='flex justify-between  '>
          <div className=''><AddCircleOutlineOutlinedIcon/></div>
          <div>
         
          <select className=' border w-64 border-gray-300 p-2 rounded-md'>
            <option value="">Priority </option>
            <option value="technical">High </option>
            <option value="billing">Medium </option>
            <option value="general"> Low</option>
          </select>
          </div>
        </div>
      </div>

      <div className='mt-6 flex gap-4'>
        <Button variant='primary'>Submit</Button>
        <Button onClick={onClose} variant='secondary'>Cancel</Button>
      </div>
    </div>
  );
}

export default HelpdeskForm;
