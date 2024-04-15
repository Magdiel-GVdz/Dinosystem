import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LibrosForm from "./LibrosForm";
import NuevoAutoresModal from "./NuevoAutoresModal";
import NuevoGeneroModal from "./NuevoGeneroModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        style={{
          color: "white",
          fontFamily: "Arial",
          margin: "5px",
          background: "green",
          borderRadius: "15px",
          width: "100px",
          height: "30px",
        }}
      >
        Nuevo
      </Button>
      <Modal
        style={{
          
          color: "black"
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

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
        style={{
          color: "white",
          fontFamily: "Arial",
          margin: "5px",
          background: "blue",
          borderRadius: "10px",
          width: "200px",
          height: "30px",
        }}
      >
        Añadir
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 700, height: 600 }}>
          <LibrosForm />
          <NuevoAutoresModal />
          <NuevoGeneroModal />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
