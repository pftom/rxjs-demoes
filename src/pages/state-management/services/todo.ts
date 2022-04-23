import { BehaviorSubject } from 'rxjs';

export interface ITodo {
    text: string;
    completed: boolean;
}

export enum VisibilityFilter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
}

export default class TodoService {
    todos = new BehaviorSubject([
        {
            text: 'hello rxjs state management',
            completed: false,
        }
    ]);
    visibilityFilter = new BehaviorSubject(VisibilityFilter.SHOW_ALL);

    addTodo(text: string) {
        let todos = this.todos.value;
        todos = todos.concat({
            text,
            completed: false,
        });

        this.todos.next(todos);
    }

    toggleTodo(index: number) {
        let todos = this.todos.value;
        todos = todos.map((todo, i) => (i === index ? { text: todo.text, completed: !todo.completed } : todo));

        this.todos.next(todos);
    }

    setVisibilityFilter(filter: VisibilityFilter) {
        this.visibilityFilter.next(filter);
    }
}