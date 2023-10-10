import React, {
    FC,
    useRef,
    useReducer,
    useEffect,
    useState
} from 'react';
import { 
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    createTheme,
    ThemeProvider,
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

// styling list component
const listTheme = createTheme({
    components: {
        MuiListItem: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        backgroundColor: 'white',
                        my: '10px',
                        borderRadius: '10px',
                    }),
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#d3f8d3',
                        color: 'black',
                        borderRadius: '10px',
                        ':hover': {
                            backgroundColor: 'lightGreen',
                            borderRadius: '10px',
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'lightBlue',
                        borderRadius: '10px',
                    }
                }
            }
        }
    }
})



const ItemList: FC<Props> = ({ array }) => {

    // reducer for working with Task array
    const [state, dispatch] = useReducer(reducer, array)

    // selected for task preview on the right side of screen
    const [selectedTask, setSelectedTask] = useState(-1);


    const handleTaskSelect = (index: number) => {

        // if selected task is clicked, deselect
        (selectedTask === index) ? setSelectedTask(-1) : setSelectedTask(index);
    }
    
    
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

    // handle editing of existing task
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


    const handleTaskRemove = (index: number) => {
        dispatch({type: 'remove', index: index});

        if (selectedTask === index) {
            setSelectedTask(-1);
        }
    }


    // indexes for list render
    const indexes = Array.from(Array(state.length).keys());
    

    return (
        <div className={styles.container}>
            <div className={styles.containerHalf}>
                <ThemeProvider theme={listTheme}>
                <DialogRemove
                    onConfirmation={
                        () => {dispatch({type: 'clear'}); setSelectedTask(-1)}
                    }
                    text='Are you sure you want to remove all tasks?'
                >
                    Remove all tasks
                </DialogRemove>

                <DialogRemove
                    onConfirmation={
                        () => {dispatch({type: 'removeDone'}); setSelectedTask(-1)}
                    }
                    text='Are you sure you want to remove all finished tasks?'
                >
                    Remove all finished tasks
                </DialogRemove>

                <List sx={{ width: '100%' }}>
                    {
                        (state.length === 0)
                        ? <ListItem>
                            <ListItemText sx={{ textAlign: 'center' }}>No tasks to do</ListItemText>
                        </ListItem> // if there are no tasks to do
                        : indexes.map(i => (
                            <ListItem
                                key={i}
                                secondaryAction={
                                    <>
                                        {/* just using ref={listItemRefs.current[i]} causes error message */}
                                        <DialogEdit ref={el => listItemRefs.current[i] = el} onEdit={() => handleEdit(i)} inputText={state[i].text} inputComment={state[i].comment || ''} />

                                        <IconButton edge='end' onClick={() => handleTaskSelect(i)} sx={{ ml: '1rem' }}>
                                            <NotesOutlinedIcon sx={{ color: 'black' }} />
                                        </IconButton>

                                        <IconButton edge='end' onClick={() => handleTaskRemove(i)} sx={{ ml: '1rem' }}>
                                            <DeleteOutlinedIcon sx={{ color: 'black' }}/>
                                        </IconButton>
                                    </>
                                }
                                disablePadding
                            >
                                <ListItemButton
                                    role={undefined}
                                    onClick={() => dispatch({type: 'toggle', index: i})}
                                    dense
                                    selected={selectedTask === i}
                                >
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
                </ThemeProvider>
            </div>

            <div className={styles.containerHalf}>
                <TaskDetail task={(selectedTask !== -1) ? state[selectedTask] : undefined} />
            </div>
        </div>
    );
}

export default ItemList;