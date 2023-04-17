import { useEffect } from 'react';
import Todo from './todo';
import { IconPlus } from '@tabler/icons-react';

export default function Page({ toggleOverlay, isArchived, todos, setTodos }) {

    useEffect(() => {
        let ignore = false;

        fetch('http://trioxtron.mooo.com:4000/api/todos')
            .catch((error) => {
                console.error(error)
            })
            .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText)
                }
                return res.json();
            })
            .then((data) => {
                if (data === undefined) {
                    throw Error("Data is undefined");
                }
                if (!ignore) {
                    setTodos(data);
                }
            });

        return () => {
            ignore = true;
        }
    }, []);

    if (!todos) return <div>Loading...</div>;
    const todoRender = todos.map((todo) => {
        if (!isArchived &&  todo.completed === false || isArchived && todo.completed === true) {
            return <Todo key={todo.description} todoCreatedAt={todo.CreatedAt} todoDescription={todo.description} todoID={todo.ID} todoCompleted={todo.completed} todo={todo} todoReload={setTodos} />;
        }
    })


    return (
        <div>
            <div className='flex flex-col'>
                {todoRender}
            </div>
            <button onClick={toggleOverlay} className='m-4 bg-gradient-to-br from-soft-pink to-soft-purple p-1.5 text-sm rounded-3xl hover:scale-105'>
                <IconPlus />
            </button>
        </div>
    );
};
