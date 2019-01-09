import React from 'react';
import { ToDoWork, List, CardItem } from '../contract/contract';
import Background from '../images/background.jpg';
import ListView from './ListView';


export interface IHomeProps {
}

export interface IHomeState {
    todoWork: ToDoWork;
    toggle: boolean;
}

function getHomeStyle() {
    return {
        minHeight: "100%",
        minWidth: `100%`,
        width: `100%`,
        overflow: `auto`,
        backgroundColor: `#EEEEEE`,
        backgroundImage: `url(${Background})`,
        position: "fixed" as "fixed",
        top: 0,
        left: 0,
    }
}

export class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: any) {
        super(props);

        let toDoWorkData = require('../contract/toDoData.json')
        this.state = { todoWork: toDoWorkData, toggle: true };

    }

    addNewCard = (listId: number, cardTitle: string) => {
        console.log(listId, cardTitle)
        let listItems = this.state.todoWork.list
        console.log(listItems)
        let listItemIndex = listItems.findIndex(item => item.id == listId)        
        let cardList = listItems[listItemIndex].cards
        console.log(cardList)
        const NoOfCards = cardList.length
        let cardItem: CardItem = {
            id: NoOfCards+1,
            description: cardTitle
        }
        console.log(cardItem)
        cardList.push(cardItem)
        listItems[listItemIndex].cards = cardList

        this.setState({ todoWork : {...this.state.todoWork, list : listItems}, toggle: !this.state.toggle})
    }

    addNewList = (listTitle: string) => {
        let listItems = this.state.todoWork.list
        const NoOfList = listItems.length
        let newListItem: List = {
            id: NoOfList+1,
            description: listTitle,
            cards: []
        }
        listItems.push(newListItem)

        this.setState({ todoWork : {...this.state.todoWork, list : listItems}, toggle: !this.state.toggle})
    }

    onSaveCard =(listId: number, cardId: number, newDesription: string) =>{
        let listItems = this.state.todoWork.list
        let listItemIndex = listItems.findIndex(item => item.id == listId)
        let cardList = listItems[listItemIndex].cards
        let cardItemIndex = cardList.findIndex(item => item.id == cardId)

        listItems[listItemIndex].cards[cardItemIndex].description = newDesription
        this.setState({ todoWork : {...this.state.todoWork, list : listItems}, toggle: !this.state.toggle})
    }

    render() {
        return (
            <React.Fragment>
                <div className="layout-row" style={getHomeStyle()}>
                    <ListView
                        List={this.state.todoWork.list}
                        addNewCard={this.addNewCard}
                        addNewList={this.addNewList}
                        onSaveCard={this.onSaveCard}
                    />
                </div>
            </React.Fragment>
        );
    }

}

export default Home;