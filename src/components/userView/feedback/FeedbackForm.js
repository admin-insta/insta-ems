import React from 'react'
import Button from "../../utils/theme/Button"

const FeedbackForm = () => {
  return (
    <div>
      <div>New Request</div>
      <div>
        <label>Category</label>
        <div><select></select></div>
      </div>
      <div>
        <label>Subject</label>
        <input type="text" placeholder='Subject line' />
      </div>

      <div>
        <label>Description</label>
        <textarea placeholder='Enter your feedback here' />
      </div>

      <div>
        attach file
        <input type="file" />
      </div>
      <div>
        <label>CC to</label>
        <span>+</span>
        <input type="text" placeholder='Priority' />
      </div>

      <div>
        <Button variant='primary'> Submit</Button>
        <Button variant='secondary'> Cancel</Button>
      </div>
    </div>
  )
}

export default FeedbackForm
