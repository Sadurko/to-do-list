import React, { FC } from "react";
import { Task } from "../reducer";
import { Typography } from '@mui/material';

type Props = {
    task?: Task;
}

const TaskDetail: FC<Props> = ({ task }) => {
    return (
        (task === undefined)
        ? <Typography>No task selected</Typography>
        : <>
            <Typography>Task: {task.text}</Typography>
            <Typography>Task added: {task.added}</Typography>
            <Typography>Comment: {task.comment}</Typography>
        </>
    )
}

export default TaskDetail;