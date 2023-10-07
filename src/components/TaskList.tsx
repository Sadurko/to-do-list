import React, { FC, useRef, useState } from 'react';
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
import DeleteTask from './DeleteTask';
import DeleteAll from './DeleteAll';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


// const Item = styled(Paper)(() => ({
//     elevation: 1,
//     backgroundColor: 'lightgray',
//   }));


interface ITask {
    task: string;
    done: boolean;
}

type Props = {
    array: Array<ITask>;
}

const ItemList: FC<Props> = ({ array }) => {

    const [tasks, setTasks] = useState(array);
    // useState for dialog window
    const [open, setOpen] = useState(false);


    const saveTasks = (taskArray: Array<ITask>) => {
        localStorage.setItem('list', JSON.stringify(taskArray));

        setTasks(taskArray);
    }

    const toggleTask = (index: number) => {
        const editTasks = [...tasks];

        editTasks[index].done = !editTasks[index].done;
        saveTasks(editTasks);
    }

    // remove task at certain index
    const removeTask = (index: number) => {
        console.log(`Removing task "${tasks[index].task}" from index: ${index}`)

        const editTasks = [...tasks];

        editTasks.splice(index, 1);
        saveTasks(editTasks);
    }

    // remove every task
    const removeAllTasks = () => {
        console.log(`Removing all tasks`);

        saveTasks([]);
    }

    // remove only finished tasks
    const removeAllFinishedTasks = () => {
        console.log(`Removing all finished tasks`);

        const filteredTasks = tasks.filter((value) => value.done !== true);

        saveTasks(filteredTasks);
    }

    // add new task
    const addTask = (taskLabel: string) => {
        console.log(`Adding task: ${taskLabel}`);

        const editTasks = [...tasks, { task: taskLabel, done: false }];

        saveTasks(editTasks);
    }


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
                if (value !== '') { addTask(value); }
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



    const indexes = Array.from(Array(tasks.length).keys());
    

    return (
        <>
            <DeleteAll
                onConfirmation={() => removeAllTasks()}
                text='Are you sure you want to remove all tasks?'
            >
                Remove all tasks
            </DeleteAll>

            <DeleteAll
                onConfirmation={() => removeAllFinishedTasks()}
                text='Are you sure you want to remove all finished tasks?'
            >
                Remove all finished tasks
            </DeleteAll>

            <List sx={{ width: '100%', maxWidth: 450 }}>
                {
                    (tasks.length === 0)
                    ? <ListItem>
                        <ListItemText>No tasks to do</ListItemText>
                    </ListItem> // if there are no tasks to do
                    : indexes.map(i => (
                        <ListItem
                            key={i}
                            secondaryAction={
                                <IconButton edge='end'>
                                    <DeleteTask onClick={() => removeTask(i)} />
                                </IconButton>
                            }
                        >
                            <ListItemButton role={undefined} onClick={() => toggleTask(i)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge='start'
                                        checked={tasks[i].done}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': tasks[i].task }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={tasks[i].task} primary={tasks[i].task} />
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