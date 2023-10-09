import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

type Input = {
    onEdit: () => void;
    inputText: string;
    inputComment: string;
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


    handleEdit = () => {
        const { onEdit } = this.props;

        if (this.state.text !== '') {
            // set emptyInput to false
            this.setState({emptyInput: false});
            onEdit();
        
            // close dialog window
            this.setState({open: false});
        }
        else {
            // set emptyInput to ture
            this.setState({emptyInput: true});
        }
    }



    handleClose = () => {
        this.setState({open: false});
    }

    handleOpen = () => {
        this.setState({open: true});

        // initialize text and comment on every dialog open
        this.setState({text: this.props.inputText});
        this.setState({comment: this.props.inputComment});
    }
  
  
    render() {
        return (
            <>
                <IconButton edge='end' onClick={this.handleOpen}>
                    <CreateOutlinedIcon sx={{ color: 'black' }}/>
                </IconButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>Add new task to do</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: '10px' }}>
                            Change task you need to do:
                        </DialogContentText>

                        <TextField
                            autoFocus
                            id='task'
                            label='Task'
                            fullWidth
                            variant='outlined'
                            onChange={this.handleChangeText}
                            defaultValue={this.props.inputText}
                            error={this.state.emptyInput === true}
                            helperText={this.state.emptyInput === true ? 'This field can\'t be empty!' : ''}
                            sx={{ mb: '15px' }}
                        />

                        <DialogContentText sx={{ mb: '10px' }}>
                            Change commentary if needed:
                        </DialogContentText>

                        <TextField
                            autoFocus
                            id='comment'
                            label='Comment'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            onChange={this.handleChangeComment}
                            defaultValue={this.props.inputComment}
                            multiline
                            rows={4}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleEdit}>Change</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
  }

  export default DialogAdd;