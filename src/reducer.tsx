interface Task {
    text: string;
    completed: boolean;
}

// interface Action {
//     type: 'add' | 'remove' | 'edit' | 'clear';
//     text?: string;
//     index?: number;
// }

type ACTION_TYPE = {type: 'add', text: string}
                 | {type: 'remove', index: number}
                 | {type: 'removeDone'}
                 | {type: 'clear'}
                 | {type: 'edit', text: string, index: number}
                 | {type: 'toggle', index: number}
                 

const reducer = (prevState: Task[], action: ACTION_TYPE) => {
    console.log("prevState: ", prevState);
    console.log("action: ", action);

    switch (action.type) {
        case 'add': {
            const newState = [...prevState];
            newState.push({
                text:action.text,
                completed: false
            })

            return newState
        }
        case 'remove': {
            const newState = [...prevState];
            newState.splice(action.index, 1);

            return newState
        }
        case 'removeDone': {
            const newState = prevState.filter((value) => value.completed !== true);

            return newState;
        }
        case 'edit': {
            const newState = [...prevState];
            newState.splice(action.index, 1, {
                text: action.text,
                completed: false
            });

            return newState;
        }
        case 'toggle': {
            const newState = [...prevState];
            newState[action.index].completed = !newState[action.index].completed;


            return newState;
        }
        case 'clear': {
            const newState: Task[] = [];
            return newState;
        }
        default:
            return prevState;
    }
}

export type { Task };
export { reducer };