import React from 'react';
import { Card, CardActionArea, Typography, IconButton } from '@material-ui/core';
import { List } from '../contract/contract';
import ListItem from './ListItem';
import { styles } from './Style';
import AddIcon from '@material-ui/icons/Add';
import AddItem from './AddItem';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';


interface IListViewProps {
    List: List[];
    addNewCard: Function;
    addNewList: Function;
    onSaveCard: Function;
    onDeleteCard: Function;
    onDeleteList: Function;
    onSaveListItem: Function;
    onSaveListData: Function;
    onNewBoard: Function;
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

    onSaveListData = () => {
        this.props.onSaveListData()
    }

    onNewBoard =() =>{
        this.props.onNewBoard()
    }

    getListItems = () => {
        return this.props.List.map(listItem =>
            (<ListItem
                ListItem={listItem}
                key={listItem.id}
                addNewCard={this.props.addNewCard}
                onSaveCard={this.props.onSaveCard}
                onDeleteCard={this.props.onDeleteCard}
                onDeleteList={this.props.onDeleteList}
                onSaveListItem={this.props.onSaveListItem} />))
    }

    render() {

        let listItems = this.getListItems()
        return (
            <React.Fragment>
                <div className="layout-row layout-align-center" style={styles.itemPB}>
                    {listItems}

                    <div>
                        <Card style={styles.listAddListItem} onClick={this.openDialog}>
                            <CardActionArea style={styles.listAddButton}>
                                <div className="layout-row layout-align-space-around-center">
                                    <AddIcon />
                                    <span color="white">Add New List</span>
                                </div>
                            </CardActionArea>
                        </Card>

                        <Card style={styles.listAddListItem} onClick={this.onSaveListData}>
                            <CardActionArea style={styles.listAddButton}>
                                <div className="layout-row layout-align-space-around-center">
                                    <SaveIcon />
                                    <span color="white">Save Board</span>
                                </div>
                            </CardActionArea>
                        </Card>

                        <Card style={styles.listAddListItem} onClick={this.onNewBoard}>
                            <CardActionArea style={styles.listAddButton}>
                                <div className="layout-row layout-align-space-around-center">
                                    <RefreshIcon />
                                    <span color="white">New Board</span>
                                </div>
                            </CardActionArea>
                        </Card>

                    </div>

                    {/* Add a new List */}

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