import React from 'react';
import { useObservable } from './hooks';
import { todoService } from './services';
import { ITodo, VisibilityFilter } from './services/todo';

export default function() {
    const todos = useObservable(todoService.todos);
    const filter = useObservable(todoService.visibilityFilter)
    const visibleTodos = getVisibleTodos(todos, filter);
    return (
        <div>
            <ul>
                {visibleTodos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} index={index} />
                ))}
            </ul>
            <p>
                Show: <FilterLink filter={VisibilityFilter.SHOW_ALL}>All</FilterLink>,
                <FilterLink filter={VisibilityFilter.SHOW_ACTIVE}>Active</FilterLink>,
                <FilterLink filter={VisibilityFilter.SHOW_ALL}>Completed</FilterLink>
            </p>
        </div>
    );
}

const FilterLink = ({ filter, children }: { filter: VisibilityFilter; children: React.ReactNode }) => {
    const activeFilter = useObservable(todoService.visibilityFilter);
    const active = filter === activeFilter;
    return active ? (
        <span>{children}</span>
    ) : (
        <a href="" onClick={() => todoService.setVisibilityFilter(filter)}>
            {children}
        </a>
    );
};


const TodoItem = ({ todo: { text, completed }, index }: { todo: ITodo; index: number }) => {
    return (
        <li
            style={{
                textDecoration: completed ? "line-through" : "none",
            }}
            onClick={() => todoService.toggleTodo(index)}
        >
            {text}
        </li>
    );
};

function getVisibleTodos(todos: ITodo[], filter: VisibilityFilter): ITodo[] {
    switch (filter) {
        case VisibilityFilter.SHOW_ALL:
            return todos;
        case VisibilityFilter.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilter.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
    }
}