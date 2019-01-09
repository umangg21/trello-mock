import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton } from '@material-ui/core';
import { CardItem } from '../contract/contract';
import SaveIcon from '@material-ui/icons/Save';
import { styles } from './Style';
import CloseIcon from '@material-ui/icons/Close';


interface IAddItemProps {
    title: string;
    onAddItem: Function;
    openDialog: boolean;
    closeDialog: any;
    isEditView?: boolean;
    editValue?: any;
}

interface IAddItemStates {
    newItemDescription?: string
}


export class AddItem extends React.Component<IAddItemProps, IAddItemStates> {

    constructor(props: any) {
        super(props)
        this.state = { newItemDescription: this.props.isEditView ? this.props.editValue : "" }

    }

    handleChange = (event: any) => {
        let newval = event.target.value;
        this.setState({ newItemDescription: newval })
    }

    saveItem = () => {
        this.props.onAddItem(this.state.newItemDescription)
    }

    render() {

        let headerPrefix = this.props.isEditView ? "Edit " : "Add New "
        return (


            <React.Fragment>
                <Dialog open={this.props.openDialog}
                    fullWidth={true}
                    maxWidth='sm'>
                    <div>
                        <DialogTitle style={styles.dialogHeader} >
                            <div className="layout-row layout-align-space-between-center">
                                <span>{headerPrefix + this.props.title}</span>
                                <IconButton color="inherit"
                                    onClick={this.props.closeDialog}
                                    aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent style={styles.dialogContent}>
                            <TextField
                                required
                                margin="dense"
                                id={this.props.title + "Name"}
                                type="text"
                                value={this.state.newItemDescription}
                                label={this.props.title + " Name"}
                                fullWidth
                                className="flex-70"
                                onChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions style={styles.dialogActions} className="layout-row layout-align-space-around-center">

                            <Button
                                variant="contained"
                                color="default"
                                size="small"
                                style={styles.dialogButton}
                                onClick={this.props.closeDialog}>
                                Cancel
                                </Button>

                            <Button
                                variant="contained"
                                color="default"
                                size="small"
                                style={styles.dialogButton}
                                disabled={!this.state.newItemDescription}
                                onClick={this.saveItem}>
                                <SaveIcon />
                                Save
                                </Button>

                        </DialogActions>

                    </div>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default AddItem;