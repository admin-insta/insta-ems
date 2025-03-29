import React, { useState } from "react";
import HelpdeskForm from "./HelpdeskForm";
import Button from "../../utils/theme/Button";
import { Dialog, DialogContent } from "@mui/material";
import helpdesk from "../../utils/images/helpdesk.jpg";
const HelpDesk = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="m-2">
        <div className="flex justify-center gap-2">
          <Button variant="primary">Active</Button>
          <Button variant="secondary">Closed</Button>
        </div>
        <div className="flex justify-end -mt-10 ">
          <Button onClick={() => setOpen(true)}>New Request</Button>
        </div>
      </div>

      {/* Full Background Image Section */}
      <div className="border bg-[#f5f5f5] h-96  my-8 mx-24 flex items-center justify-center text-center border-gray-900"
        style={{
          backgroundImage: `url(${helpdesk})`,
          backgroundSize:"cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15, // Adjust opacity if needed
        }}
      >No Helpdesk Items</div>

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
