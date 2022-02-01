import * as React from 'react';

export default function useAlert() {
  const [open, setOpen] = React.useState(false);

  const handleClick = (alertData) => {
    setOpen(alertData);
  };

  const handleClose = (event, reason, message = "") => {
    setOpen(false);
  };
  return { open, handleClick, handleClose };
}
