import React from 'react';
import { Card, CardActionArea, Typography, IconButton } from '@material-ui/core';

import { List } from '../contract/contract';
import CardItemView from './CardItemView';
import { styles } from './Style';
import AddIcon from '@material-ui/icons/Add';
import AddItem from './AddItem';

interface IListItemProps {
    ListItem: List;
    addNewCard: Function;
    onSaveCard: Function;
}

interface IListItemStates {
    openAddItemDailog: boolean
}

export class ListItem extends React.Component<IListItemProps, IListItemStates> {

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

    addNewCard = (title: string) => {
        this.props.addNewCard(this.props.ListItem.id, title)
        this.closeDialog()
    }

    onSaveCard = (cardId: number, newDescription: string) => {
        this.props.onSaveCard(this.props.ListItem.id, cardId, newDescription)
    }


    getList = () => {
        return this.props.ListItem.cards.map(card =>
            (<CardItemView cardItem={card} key={card.id} onSaveCard={this.onSaveCard} />))
    }

    render() {

        let cardList = this.getList()

        return (
            <React.Fragment>
                <Card style={styles.listItem}>
                    <div style={styles.itemPB}>
                        <span style={styles.listDescription}>{this.props.ListItem.description}</span>
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

                    {this.state.openAddItemDailog &&
                        <AddItem
                            title="Card"
                            openDialog={this.state.openAddItemDailog}
                            closeDialog={this.closeDialog}
                            onAddItem={this.addNewCard}
                        />}

                </Card>

            </React.Fragment>
        )
    }
}

export default ListItem;