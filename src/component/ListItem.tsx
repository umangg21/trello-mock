import React from 'react';
import { Card, CardActionArea, Typography, IconButton } from '@material-ui/core';

import { List } from '../contract/contract';
import CardItemView from './CardItemView';
import { styles } from './Style';
import AddIcon from '@material-ui/icons/Add';
import AddItem from './AddItem';
import EditIcon from '@material-ui/icons/Edit';

interface IListItemProps {
    ListItem: List;
    addNewCard: Function;
    onSaveCard: Function;
    onDeleteCard: Function;
    onDeleteList: Function;
    onSaveListItem: Function;
}

interface IListItemStates {
    openAddItemDailog: boolean;
    openEditList: boolean;
}

export class ListItem extends React.Component<IListItemProps, IListItemStates> {

    constructor(props: any) {
        super(props)
        this.state = { openAddItemDailog: false, openEditList: false }

    }

    openDialog = () => {
        this.setState({ openAddItemDailog: true })
    }

    closeDialog = () => {
        this.setState({ openAddItemDailog: false, openEditList: false })
    }

    addNewCard = (title: string) => {
        this.props.addNewCard(this.props.ListItem.id, title)
        this.closeDialog()
    }

    onSaveCard = (cardId: number, newDescription: string) => {
        this.props.onSaveCard(this.props.ListItem.id, cardId, newDescription)
    }

    onDeleteCard = (cardId: number) => {
        this.props.onDeleteCard(cardId, this.props.ListItem.id)
    }

    deleteListItem = () => {
        this.props.onDeleteList(this.props.ListItem.id)
    }

    openEditList = () => {
        this.setState({ openEditList: true })
    }

    onSaveListItem = (listDescription: number) => {
        this.props.onSaveListItem(listDescription, this.props.ListItem.id)
        this.closeDialog()
    }

    getList = () => {
        return this.props.ListItem.cards.map(card =>
            (<CardItemView
                cardItem={card}
                key={card.id}
                onSaveCard={this.onSaveCard}
                onDeleteCard={this.onDeleteCard}
            />))
    }

    render() {

        let cardList = this.getList()

        return (
            <React.Fragment>
                <Card style={styles.listItem}>
                    <div style={styles.itemPB} className="layout-row layout-align-space-between-center">
                        <span style={styles.listDescription}>{this.props.ListItem.description}</span>
                        <IconButton color="inherit"
                            style={styles.editIconP}
                            onClick={this.openEditList}
                            aria-label="Close">
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div>
                        {cardList}
                    </div>

                    <Card style={styles.listAddItem} onClick={this.openDialog}>
                        <CardActionArea style={styles.listAddButton}>
                            <div className="layout-row layout-align-space-around-center">
                                <AddIcon />
                                <span color="white">Add New Card</span>
                            </div>
                        </CardActionArea>
                    </Card>

                    {/* Add a new Card in a List */}

                    {this.state.openAddItemDailog &&
                        <AddItem
                            title="Card"
                            openDialog={this.state.openAddItemDailog}
                            closeDialog={this.closeDialog}
                            onAddItem={this.addNewCard}
                        />}

                    {/* Edit List Item*/}

                    {this.state.openEditList &&
                        <AddItem
                            title="List"
                            openDialog={this.state.openEditList}
                            closeDialog={this.closeDialog}
                            onAddItem={this.onSaveListItem}
                            isEditView={true}
                            editValue={this.props.ListItem.description}
                            deletItem={this.deleteListItem}
                        />
                    }

                </Card>

            </React.Fragment>
        )
    }
}

export default ListItem;