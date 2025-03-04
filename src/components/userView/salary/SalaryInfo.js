import React from 'react'
import Button from '../../utils/theme/Button'

import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import Card from '../../utils/theme/Cards';
const SalaryInfo = () => {
  return (
    <div>
        <div className="col-span-9  ">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CurrencyBitcoinOutlinedIcon /> Salary Information
            </span>
          }
          description={
          <div>
             <div>Profile</div>   
          </div>

         
          }
        />
      </div>
    </div>
  )
}

export default SalaryInfo
