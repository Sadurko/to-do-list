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
    emptyInput: boolean;
};

class DialogAdd extends React.Component<Input, MyState> {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            comment: '',
            open: false,
            emptyInput: false
        };
  
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleChangeComment = this.handleChangeComment.bind(this);
    }
  
    handleChangeText = (event) => {
        this.setState({text: event.target.value});
        this.setState({emptyInput: false});
    }

    handleChangeComment = (event) => {
        this.setState({comment: event.target.value});
    }


    handleAdd = () => {
        const { onAdd } = this.props;

        if (this.state.text !== '') {
            // set emptyInput to false
            this.setState({emptyInput: false});
            onAdd();

            // close dialog window
            this.setState({open: false});
        }
        else {
            // set emptyInput to true
            this.setState({emptyInput: true});
        }
    }



    handleClose = () => {
        this.setState({open: false});
    }

    handleOpen = () => {
        this.setState({open: true});

        // initialize empty text and comment on every dialog open
        this.setState({text: ''});
        this.setState({comment: ''});
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
                    <DialogContentText sx={{ mb: '10px' }}>
                        Enter task you need to do:
                    </DialogContentText>

                    <TextField
                        autoFocus
                        id='task'
                        label='Task'
                        fullWidth
                        variant='outlined'
                        onChange={this.handleChangeText}
                        error={this.state.emptyInput === true}
                        helperText={this.state.emptyInput === true ? 'This field can\'t be empty!' : ' '}
                    />

                    <DialogContentText sx={{ mb: '10px' }}>
                        You can add aditional commentary to your task:
                    </DialogContentText>

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