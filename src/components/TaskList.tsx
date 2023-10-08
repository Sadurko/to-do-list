import React, { FC, useRef, useState, useReducer, useEffect } from 'react';
import { 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Checkbox
} from '@mui/material';
import DeleteAll from './DeleteAll';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { reducer, Task } from '../reducer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';


type Props = {
    array: Array<Task>;
}


const ItemList: FC<Props> = ({ array }) => {

    const [state, dispatch] = useReducer(reducer, array)
    // useState for dialog window
    const [open, setOpen] = useState(false);

    
    useEffect(() => {
        console.log('Saving current state');

        localStorage.setItem('list', JSON.stringify(state));
    }, [state])


    // handle opening of dialog window
    const handleClickOpen = () => {
        setOpen(true);
    }


    // Dialog window for adding new tasks
    const AddDialog = () => {
        const valueRef = useRef<HTMLInputElement>();

        const handleClose = () => {
            setOpen(false);
        }

        const handleAdd = () => {
            if (valueRef.current != null) {
                const value = valueRef.current.value;
                if (value !== '') { dispatch({type: 'add', text: value}) }
            }

            setOpen(false);
        }

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>Add new task to do</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter task to do:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id='task'
                        label='Task'
                        fullWidth
                        variant='outlined'
                        inputRef={valueRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        )
    }



    const indexes = Array.from(Array(state.length).keys());
    

    return (
        <>
            <DeleteAll
                onConfirmation={() => dispatch({type: 'clear'})}
                text='Are you sure you want to remove all tasks?'
            >
                Remove all tasks
            </DeleteAll>

            <DeleteAll
                onConfirmation={() => dispatch({type: 'removeDone'})}
                text='Are you sure you want to remove all finished tasks?'
            >
                Remove all finished tasks
            </DeleteAll>

            <List sx={{ width: '100%', maxWidth: 450 }}>
                {
                    (state.length === 0)
                    ? <ListItem>
                        <ListItemText>No tasks to do</ListItemText>
                    </ListItem> // if there are no tasks to do
                    : indexes.map(i => (
                        <ListItem
                            key={i}
                            secondaryAction={
                                <>
                                    <IconButton edge='end' onClick={() => dispatch({type: 'remove', index: i})}>
                                        <CreateOutlinedIcon sx={{ color: 'black' }}/>
                                    </IconButton>
                                    <IconButton edge='end' onClick={() => dispatch({type: 'remove', index: i})} sx={{ ml: '1rem' }}>
                                        <DeleteOutlinedIcon sx={{ color: 'black' }}/>
                                    </IconButton>
                                </>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => dispatch({type: 'toggle', index: i})} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge='start'
                                        checked={state[i].completed}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': state[i].text }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={state[i].text} primary={state[i].text} />
                            </ListItemButton>
                        </ListItem>
                        )
                    )
                }
            </List>

            <IconButton onClick={handleClickOpen}>
                <AddCircleOutlinedIcon sx={{ fontSize: '40px' }}/>
            </IconButton>

            <AddDialog/>
        </>
    );
}

export default ItemList;