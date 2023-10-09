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
import DeleteAll from './DeleteAll';
import { reducer, Task } from '../reducer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import DialogAdd from './DialogAdd';


type Props = {
    array: Array<Task>;
}


const ItemList: FC<Props> = ({ array }) => {

    // reducer for working with Task array
    const [state, dispatch] = useReducer(reducer, array)

    // ref to dialog window
    const ref = useRef<DialogAdd>(null);
    
    // saving task array to local storage when changed
    useEffect(() => {
        console.log('Saving current state');

        localStorage.setItem('list', JSON.stringify(state));
    }, [state])

    const handleTest = () => {
        if (ref.current != null) {
            const text = ref.current.state.text;
            const comment = ref.current.state.comment;

            if (text !== '') { dispatch({type: 'add', text: text, comment: comment})}
        }
    }

    // indexes for list render
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

            <DialogAdd ref={ref} onAdd={() => handleTest()}/>
        </>
    );
}

export default ItemList;