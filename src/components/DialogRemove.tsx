import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { FC, PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
    onConfirmation: () => void;
    text: string;
}>;

const DeleteAll: FC<Props> = ({ onConfirmation, children, text }) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleConfirmation = () => {
        onConfirmation();
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleClickOpen}>{children}</Button>
            
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>Deleting all tasks</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleConfirmation}>Yes</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteAll;