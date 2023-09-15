import { IconButton } from '@mui/material';
import { FC } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';


interface Props {
    onClick: () => void;
}

// delete button for each task
const DeleteTask: FC<Props> = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            color: 'black',
        }}
    >
        <DeleteOutlinedIcon />
    </IconButton>
)

export default DeleteTask;