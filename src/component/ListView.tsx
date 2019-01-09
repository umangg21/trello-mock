import React from 'react';
import { Card, CardActionArea, Typography, IconButton } from '@material-ui/core';
import { List } from '../contract/contract';
import ListItem from './ListItem';
import { styles } from './Style';
import AddIcon from '@material-ui/icons/Add';
import AddItem from './AddItem';

interface IListViewProps {
    List: List[];
    addNewCard: Function;
    addNewList: Function;
    onSaveCard: Function;
}

interface IListViewStates {
    openAddItemDailog: boolean
}


export class ListView extends React.Component<IListViewProps, IListViewStates> {

    constructor(props: any) {
        super(props)
        this.state = { openAddItemDailog: false }
    }

    openDialog = () => {
        this.setState({ openAddItemDailog: true })
    }

    closeDialog = () => {
        this.setState({ openAddItemDailog: false })
    }

    addNewList = (title: string) => {
        this.props.addNewList(title)
        this.closeDialog()
    }

    getListItems = () => {
        return this.props.List.map(listItem =>
            (<ListItem ListItem={listItem} key={listItem.id} addNewCard={this.props.addNewCard}
                onSaveCard={this.props.onSaveCard} />))
    }


    render() {

        let listItems = this.getListItems()
        return (
            <React.Fragment>
                <div className="layout-row layout-align-center" style={styles.itemPB}>
                    {listItems}

                    <Card style={styles.listAddListItem} onClick={this.openDialog}>
                        <CardActionArea style={styles.listAddButton}>
                            <div className="layout-row layout-align-space-around-center">
                                <AddIcon />
                                <span color="white">Add New List</span>
                            </div>
                        </CardActionArea>
                    </Card>

                    {this.state.openAddItemDailog &&
                        <AddItem
                            title="List"
                            openDialog={this.state.openAddItemDailog}
                            closeDialog={this.closeDialog}
                            onAddItem={this.addNewList}
                        />}
                </div>
            </React.Fragment>
        )
    }
}

export default ListView;