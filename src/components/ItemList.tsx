import { FC, useRef, useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import DeleteTask from './DeleteTask';
import DeleteAllTasks from './DeleteAllTasks';
import Item from './Item';


interface ITask {
    task: string;
    done: boolean;
}

type Props = {
    array: Array<ITask>;
}

const ItemList: FC<Props> = ({ array }) => {

    const [tasks, setTasks] = useState(array);


    const saveTasks = (taskArray: Array<ITask>) => {
        localStorage.setItem('list', JSON.stringify(taskArray));

        setTasks(taskArray);
    }

    const toggleTask = (index: number) => {
        let editTasks = [...tasks];

        editTasks[index].done = !editTasks[index].done;
        saveTasks(editTasks);
    }

    // remove task at certain index
    const removeTask = (index: number) => {
        console.log(`Removing task "${tasks[index].task}" from index: ${index}`)

        let editTasks = [...tasks];

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

        let filteredTasks = tasks.filter((value) => value.done !== true);

        saveTasks(filteredTasks);
    }

    // add new task
    const addTask = (taskLabel: string) => {
        console.log(`Adding task: ${taskLabel}`);

        let editTasks = [...tasks, { task: taskLabel, done: false }];

        saveTasks(editTasks);
    }


    // useState for dialog window
    const [open, setOpen] = useState(false);


    // handle opening of dialog window
    const handleClickOpen = () => {
        setOpen(true);
    }


    // Dialog window for adding new tasks
    const AddDialog = () => {
        const valueRef = useRef<HTMLInputElement>();

        const handleClose = () => {
            if (valueRef.current != null) {
                const value = valueRef.current.value;
                if (value !== '') { addTask(value); }
            }

            setOpen(false);
        }

        return (
            <Dialog open={open} onClose={handleClose}>
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
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        )
    }



    const indexes = Array.from(Array(tasks.length).keys());
    

    return (
        <>
            <DeleteAllTasks onConfirmation={() => removeAllTasks()}>Remove all tasks</DeleteAllTasks>
            <Button onClick={() => removeAllFinishedTasks()}>Remove all finished tasks</Button>

            <Grid container spacing={3}>
                {
                    tasks.length === 0 ?
                    <Grid item xs={12}>No tasks to do</Grid> : // if there are no tasks to do
                    indexes.map(i => {
                        console.log(`Task: ${tasks[i].task} done: ${tasks[i].done}`);
                        return (
                        <Grid item xs={12} key={i}>
                            <Item task={tasks[i].task} done={tasks[i].done} onChange={() => toggleTask(i)}/>
                            <DeleteTask onClick={() => removeTask(i)}/>
                        </Grid>
                        )
                    })
                }
                <Grid item xs={12}>
                    <Button variant='outlined' onClick={handleClickOpen}>
                        Add task
                    </Button>

                    <AddDialog/>
                </Grid>
            </Grid>
        </>
    );
}

export default ItemList;