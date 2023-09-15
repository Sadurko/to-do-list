import { FC, useState } from 'react';
import Item from './Item';
import { Grid, Button } from '@mui/material';
import DeleteTask from './DeleteTask';
import Popup from 'reactjs-popup';


interface ITask {
    task: string;
    done: boolean;
}

type Props = {
    array: Array<ITask>;
}

const ItemList: FC<Props> = ({ array }) => {

    const [tasks, setTasks] = useState(array);
    const [task, setTask] = useState('');

    const saveTasks = (taskArray: Array<ITask>) => {
        localStorage.setItem('list', JSON.stringify(taskArray));

        setTasks(taskArray);
    }

    // remove task on certain index
    const removeTask = (index: number) => {
        console.log(`Removing task "${tasks[index].task}" from index: ${index}`)

        let editTasks = [...tasks];

        editTasks.splice(index, 1);
        saveTasks(editTasks);
    }

    // add new task
    const addTask = (taskLabel: string) => {
        console.log(`Adding task: ${taskLabel}`);

        let editTasks = [...tasks, { task: taskLabel, done: false }];

        saveTasks(editTasks);
    }


    // in case there are no tasks show just text and option to add task
    if (tasks.length === 0) {
        return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                No tasks to do
            </Grid>
            <Grid item xs={12}>
                <Popup trigger={<Button>Add task</Button>} position='right center'>
                    <>
                        <input
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                        <Button onClick={() => addTask(task)}>Add</Button>
                    </>
                </Popup>
            </Grid>
        </Grid>);
    }


    const indexes = Array.from(Array(tasks.length).keys());
    

    return (
        <Grid container spacing={3}>
            {indexes.map(i => (
                <Grid item xs={12} key={i}>
                    <Item task={tasks[i].task} done={tasks[i].done} />
                    <DeleteTask onClick={() => removeTask(i)}/>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Popup trigger={<Button>Add task</Button>} position='right center'>
                    <>
                        <input
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                        <Button onClick={() => addTask(task)}>Add</Button>
                    </>
                </Popup>
            </Grid>
        </Grid>
    );
}

export default ItemList;