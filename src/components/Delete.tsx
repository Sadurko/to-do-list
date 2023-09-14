import { IconButton } from '@mui/material';
import { FC } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';


interface Props {
    onClick: () => void;
}

const Delete: FC<Props> = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            color: 'black',
        }}
    >
        <DeleteOutlinedIcon />
    </IconButton>
)

export default Delete;