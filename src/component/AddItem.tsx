import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField,  Button, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { styles } from './Style';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';


interface IAddItemProps {
    title: string;
    onAddItem: Function;
    openDialog: boolean;
    closeDialog: any;
    isEditView?: boolean;
    editValue?: any;
    deletItem?: Function;
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

    deletItem = () => {
        if (this.props.deletItem) {
            this.props.deletItem()
        }
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
                                autoFocus
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
                        <div style={styles.dialogActions} className="layout-row layout-align-space-between-center">
                            <div>
                                {this.props.isEditView && <Button
                                    variant="contained"
                                    color="default"
                                    size="small"
                                    style={styles.dialogButton}
                                    onClick={this.deletItem}>
                                    <DeleteIcon style={styles.buttonIcon} />
                                    {"Delete " + this.props.title}
                                </Button>}
                            </div>
                            <div className="layout-row layout-align-end-center">
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
                                    <SaveIcon style={styles.buttonIcon} />
                                    Save
                                </Button>
                            </div>
                        </div>

                    </div>
                </Dialog>

            </React.Fragment >
        )
    }
}

export default AddItem;