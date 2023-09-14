import { FC, Fragment, PropsWithChildren, useState } from 'react';
import Item from './Item';
import { Container, Grid } from '@mui/material';
import Delete from './Delete';


interface ITask {
    task: string;
    done: boolean;
}

interface Props {
    array: Array<ITask>;
}

const ItemList: FC<Props> = ({ array }) => {

    const [tasks, setTasks] = useState(array);

    const removeTask = (index: number) => {
        console.log(`Removing task on index: ${index}`)

        let editTasks = [...tasks];

        editTasks.splice(index, 1);
        setTasks(editTasks);
    }
    

    if (tasks.length === 0) {
        return (<Container>No tasks to do</Container>);
    }

    const indexes = Array.from(Array(tasks.length).keys());
    

    return (
        <Grid container spacing={3}>
            {indexes.map(i => (
                <Grid item xs={12} key={i}>
                    <Item task={tasks[i].task} done={tasks[i].done} />
                    <Delete onClick={() => removeTask(i)}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default ItemList;