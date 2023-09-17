import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC, PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
    onConfirmation: () => void;
}>;

const DeleteAllTasks: FC<Props> = ({ onConfirmation, children }) => {

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
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Deleting all tasks</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete all tasks?
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

export default DeleteAllTasks;