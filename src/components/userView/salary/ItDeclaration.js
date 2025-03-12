import React from 'react'

const ItDeclaration = () => {
  return (
    <div>
      <div className='grid grid-cols-10 gap-1 text-base'>
        <div className='col-span-2 p-2 border bg-white text-green-700 h-24 '>Tax Regime</div>
        <div className='col-span-2 p-2 border bg-white h-24'>Net Tax</div>
        <div className='col-span-2 p-2 border bg-white h-24'>Total Tax Due</div>
        <div className='col-span-2 p-2 border bg-white h-24'>Tax Deductible Per Month</div>
        <div className='col-span-2 p-2 border bg-white h-24'>Remaining Months</div>
      </div>
      <div className='my-4 text-base'>
        <div className='p-2 bg-white my-2 h-12 flex items-center border'>+ A. Income</div>
        <div className='p-2 bg-white my-2 h-12 flex items-center border'>+ B. Deductions</div>
        <div className='p-2 bg-white my-2 h-12 flex items-center border'>+ C. Perquisites</div>
        <div className='p-2 bg-white my-2 h-12 flex items-center border'>+ D. Income Excluded from Tax</div>
        <div className='p-2 bg-white my-2 h-12 flex items-center border'>+ E. Gross Salary</div>
        <div className='p-2 bg-white my-2 h-12 flex items-center border'>+ F. Exemption Under Section 10</div>
      </div>
    </div>
  )
}

export default ItDeclaration
