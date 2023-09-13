import { ComponentsProps, FormControlLabel, styled } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { PropsWithChildren, FC, useState, ChangeEvent } from "react";

type Props = PropsWithChildren<{
    task: string;
    done: boolean;
}>

const Item: FC<Props> = ({ task, done }) => {

    const [checked, setChecked] = useState(done);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }


    // strike through the text using styled component
    interface StyledProps extends ComponentsProps {
        checked?: boolean;
    }

    const ToDoControlLabel = styled(FormControlLabel, {
        shouldForwardProp: (prop) => prop !== 'checked'
    })<StyledProps>(({ checked }) => ({
        ...(checked && {
            textDecoration: 'line-through'
        })
    }))


    return (
            <ToDoControlLabel
                label={task}
                checked={checked}
                control={
                    <CheckBox checked={checked} onChange={handleChange} />
                }
            />
    );
}

export default Item;