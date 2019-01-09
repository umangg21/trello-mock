export interface ToDoWork{
    list: List[];
}

export interface List {
    id: number;
    description: String;
    cards: CardItem[];
}

export interface CardItem {
    id: number;
    description: String;
}