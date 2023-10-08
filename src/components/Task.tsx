import { ComponentsProps, FormControlLabel, styled } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import React, { FC } from "react";

interface Props {
    task: string;
    done: boolean;
    onChange: () => void;
}

const Task: FC<Props> = ({ task, done, onChange }) => {

    // strike through the text using styled component
    interface StyledProps extends ComponentsProps {
        checked?: boolean;
    }

    // styled label for strike through and color change
    const ToDoControlLabel = styled(FormControlLabel, {
        shouldForwardProp: (prop) => prop !== 'checked'
    })<StyledProps>(({ checked }) => ({
        ...(checked && {
            textDecoration: 'line-through',
            color: "grey"
        })
    }))


    return (
            <ToDoControlLabel
                sx={{ ml: 1 }}
                label={task}
                checked={done}
                control={
                    <CheckBox checked={done} onChange={onChange} />
                }
            />
    );
}

export default Task;