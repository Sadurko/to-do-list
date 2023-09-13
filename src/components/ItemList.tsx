import { FC, PropsWithChildren } from 'react';
import Item from './Item';
import { Container, Grid } from '@mui/material';


interface ITask {
    task: string;
    done: boolean;
}

type Props = PropsWithChildren<{
    array: Array<ITask>;
}>

const ItemList: FC<Props> = ({ array }) => {

    /*
    const addTask = (newTask: string) => {
        this.setState(prevState => ({
            tasks: [...(prevState.tasks ?? []), newTask]
        }))
    }
    */
    // const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    if (array.length === 0) {
        return (<Container>No tasks to do</Container>);
    }

    const indexes = Array.from(Array(array.length).keys());
    

    return (
        <Container
            maxWidth='sm'
            component='main'
        >
            <Grid>
                {indexes.map(i => (
                    <Item task={array[i].task} done={array[i].done} />
                ))}
            </Grid>
        </Container>
    );
}

export default ItemList;