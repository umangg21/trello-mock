import React from 'react';
import { Card, CardActionArea, Typography } from '@material-ui/core';
import { CardItem } from '../contract/contract';
import { styles } from './Style';
import AddItem from './AddItem';

interface ICardItemViewProps {
    cardItem: CardItem;
    onSaveCard: Function;
    onDeleteCard: Function;
}

interface ICardItemViewStates {
    openAddItemDailog: boolean;
}

export class CardItemView extends React.Component<ICardItemViewProps, ICardItemViewStates> {

    constructor(props: any) {
        super(props)
        this.state = {openAddItemDailog : false}
    }

    openDialog = () => {
        this.setState({ openAddItemDailog: true })
    }

    closeDialog = () => {
        this.setState({ openAddItemDailog: false })
    }

    onSaveCard = (newDescription: string) =>{
        this.props.onSaveCard(this.props.cardItem.id, newDescription)
        this.closeDialog()
    }

    onDeleteCard = () =>{
        this.props.onDeleteCard(this.props.cardItem.id)
    }

    render() {
        return (
            <React.Fragment>
                <Card style={styles.itemPB} onClick={this.openDialog}>
                    <CardActionArea >
                        <Typography component="p" style={styles.itemPB}>
                            {this.props.cardItem.description}
                        </Typography>
                    </CardActionArea>
                </Card>

                {/* Edit or Delete a card*/}

                {this.state.openAddItemDailog && 
                <AddItem
                        title="Card"
                        openDialog={this.state.openAddItemDailog}
                        closeDialog={this.closeDialog}
                        onAddItem={this.onSaveCard}
                        isEditView= {true}
                        editValue={this.props.cardItem.description}
                        deletItem= {this.onDeleteCard}
                />}

            </React.Fragment>
        )
    }
}

export default CardItemView;