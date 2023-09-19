import React, { FC, useRef, useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Paper, styled, IconButton } from '@mui/material';
import DeleteTask from './DeleteTask';
import DeleteAll from './DeleteAll';
import Task from './Task';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


const Item = styled(Paper)(() => ({
    elevation: 1,
    backgroundColor: 'lightgray',
  }));


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
            >Remove all tasks</DeleteAll>
            <DeleteAll
                onConfirmation={() => removeAllFinishedTasks()}
                text='Are you sure you want to remove all finished tasks?'
            >Remove all finished tasks</DeleteAll>

            <Grid container spacing={2} justifyContent='center' alignItems="center">
                {
                    tasks.length === 0 ?
                    <Grid item xs={12}>No tasks to do</Grid> : // if there are no tasks to do
                    indexes.map(i => (
                        <Grid
                            item
                            xs={12}
                            key={i}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Item sx={{ width: 600, mr: 1, display: 'flex', justifyContent: 'flex-start' }}>
                                <Task
                                    task={tasks[i].task}
                                    done={tasks[i].done}
                                    onChange={() => toggleTask(i)}
                                />
                            </Item>
                            <Item sx={{ flexShrink: 0 }}>
                                <DeleteTask onClick={() => removeTask(i)}/>
                            </Item>
                        </Grid>
                        )
                    )
                }
                <Grid item xs={12}>
                    <IconButton onClick={handleClickOpen}>
                        <AddCircleOutlinedIcon sx={{ fontSize: '40px' }}/>
                    </IconButton>

                    <AddDialog/>
                </Grid>
            </Grid>
        </>
    );
}

export default ItemList;