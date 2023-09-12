import { ComponentsProps, FormControlLabel, createStyles, styled } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { PropsWithChildren, FC, useState, ChangeEvent, Fragment, useMemo } from "react";

type Props = PropsWithChildren<{
    label: string;
}>

const Item: FC<Props> = ({ label }) => {
    
    const [checked, setChecked] = useState(false);


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
                label={label}
                checked={checked}
                control={
                    <CheckBox checked={checked} onChange={handleChange} />
                }
            />
    );
}

export default Item;