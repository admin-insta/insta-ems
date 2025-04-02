import React, { useState } from "react";
import HelpdeskForm from "./HelpdeskForm";
import Button from "../../utils/theme/Button";
import { Dialog, DialogContent } from "@mui/material";
import helpdesk from "../../utils/images/helpdesk.jpg";
import Card from "../../utils/theme/Cards";
const HelpDesk = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Card
        variant="primary"
        fullScreen="true"
        description={
          <>
            <div className="m-2">
              <div className="flex justify-center gap-2">
                <Button variant="primary">Active</Button>
                <Button variant="secondary">Closed</Button>
              </div>
              <div className="flex justify-end -mt-10 ">
                <Button onClick={() => setOpen(true)}>New Request</Button>
              </div>
            </div>
            <div className="m-2 p-2">
              <Card
                variant="secondary"
                fullScreen="true"
                description={
                  <div className="flex  items-center justify-center">
                    No Helpdesk Items
                  </div>
                }
              />
            </div>
          </>
        }
      />

      {/* Full Background Image Section */}
      <div className="col-span-9  "></div>

      {/* Dialog for HelpdeskForm */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <HelpdeskForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpDesk;
