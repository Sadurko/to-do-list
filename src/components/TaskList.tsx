import React, { FC, useRef, useReducer, useEffect } from 'react';
import { 
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Checkbox
} from '@mui/material';
import DialogRemove from './DialogRemove';
import { reducer, Task } from '../reducer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import DialogAdd from './DialogAdd';
import DialogEdit from './DialogEdit';
import styles from './TaskList.module.css';
import TaskDetail from './TaskDetail';


type Props = {
    array: Array<Task>;
}


const ItemList: FC<Props> = ({ array }) => {

    // reducer for working with Task array
    const [state, dispatch] = useReducer(reducer, array)
    
    
    // saving task array to local storage when changed
    useEffect(() => {
        console.log('Saving current state');

        localStorage.setItem('list', JSON.stringify(state));
    }, [state])



    // ref to dialog window of adding
    const ref = useRef<DialogAdd>(null);

    const handleAdd = () => {
        if (ref.current != null) {
            const text = ref.current.state.text;
            const comment = ref.current.state.comment;

            if (text !== '') { dispatch({type: 'add', text: text, comment: comment})}
        }
    }


    // ref to dialog windows of editing
    const listItemRefs = useRef<Array<DialogEdit | null>>([]);

    // change amount of refs in case of additional tasks
    useEffect(() => {
        listItemRefs.current = listItemRefs.current.splice(0, state.length);
    }, [state])

    const handleEdit = (index: number) => {
        if (listItemRefs.current != null) {
            const el = listItemRefs.current[index];

            if (el !== null) {
                const text = el.state.text;
                const comment = el.state.comment;

                if (text !== '') {
                    dispatch({type: 'edit', index: index, text: text, comment: comment})
                }
            }

            console.error('Element is null');
        }
    }

    // indexes for list render
    const indexes = Array.from(Array(state.length).keys());
    

    
    return (
        <div className={styles.container}>
            <div className={styles.containerLeft}>
                <DialogRemove
                    onConfirmation={() => dispatch({type: 'clear'})}
                    text='Are you sure you want to remove all tasks?'
                >
                    Remove all tasks
                </DialogRemove>

                <DialogRemove
                    onConfirmation={() => dispatch({type: 'removeDone'})}
                    text='Are you sure you want to remove all finished tasks?'
                >
                    Remove all finished tasks
                </DialogRemove>

                <List sx={{ width: '100%' }}>
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
                                        {/* just using ref={listItemRefs.current[i]} causes error message */}
                                        <DialogEdit ref={el => listItemRefs.current[i] = el} onAdd={() => handleEdit(i)} inputText={state[i].text} inputComment={state[i].comment || ''} />

                                        <IconButton edge='end' onClick={() => dispatch({type: 'remove', index: i})} sx={{ ml: '1rem' }}>
                                            <DeleteOutlinedIcon sx={{ color: 'black' }}/>
                                        </IconButton>
                                        <IconButton edge='end' sx={{ ml: '1rem' }}>
                                            <NotesOutlinedIcon sx={{ color: 'black' }} />
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

                <DialogAdd ref={ref} onAdd={() => handleAdd()}/>
            </div>

            <div className={styles.containerLeft}>
                <TaskDetail task={state[1]} />
            </div>
        </div>
    );
}

export default ItemList;