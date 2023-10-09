import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField } from '@mui/material';
import React from 'react'

type Input = {
    onAdd: () => void;
}

type MyState = {
    text: string;
    comment: string;
    open: boolean;
};

class DialogAdd extends React.Component<Input, MyState> {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            comment: '',
            open: false
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeComment = this.handleChangeComment.bind(this);
    }
  
    handleChange = (event) => {
      this.setState({text: event.target.value});
    }

    handleChangeComment = (event) => {
        this.setState({comment: event.target.value});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleAdd = () => {
        const { onAdd } = this.props;

        onAdd();
        
        this.setState({open: false});
    }
  
  
    render() {

      return (
        <>
            <Button onClick={this.handleOpen}>Add task</Button>

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>Add new task to do</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter task you need to do:</DialogContentText>
                    <TextField
                        autoFocus
                        id='task'
                        label='Task'
                        fullWidth
                        variant='outlined'
                        onChange={this.handleChange}
                    />
                    <TextField
                        autoFocus
                        id='comment'
                        label='Comment'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={this.handleChangeComment}
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
      );
    }
  }

  export default DialogAdd;