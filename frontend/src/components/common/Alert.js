import React, { useState, useEffect } from 'react'
import { Slide, SnackbarContent, Snackbar } from '@material-ui/core';
import useAlert from './useAlert';

export default function Alert() {
  const { open, handleClose } = useAlert();
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    setShowAlert(open)
  }, [open])
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlert}
      variant={open?.type}
      autoHideDuration={4000}
      TransitionComponent={Slide}
      onClose={handleClose}
    >
      <SnackbarContent
        message={
          <div>
            {/*{open?.type == "success" ? <Check /> : <Error />}&nbsp;*/}
            {open?.message}
          </div>
        }
        color={open?.type == "success"}
      ></SnackbarContent>
    </Snackbar>
  )
}
