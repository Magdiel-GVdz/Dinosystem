import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LibrosForm from "./LibrosForm";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };


export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        // style={{
        //   color: "white",
        //   fontFamily: "Arial",
        //   margin: "5px",
        //   background: "blue",
        //   borderRadius: "10px",
        //   width: "200px",
        //   height: "30px",
        // }}
      >
        Añadir
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 700, height: 600 }}>
          <LibrosForm />
        </Box>
      </Modal>
    </div>
  );
}
