import { useEffect, useState } from 'react';
import Todo from './todo';
import { IconPlus } from '@tabler/icons-react';

export default function Page({ toggleOverlay, isArchive }) {
    const [receivedTodos, setReceivedTodos] = useState(null);

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
                    setReceivedTodos(data);
                }
            });

        return () => {
            ignore = true;
        }
    }, []);

    if (!receivedTodos) return <div>Loading...</div>;
    const todoRender = receivedTodos.map((todo) => {
        if (!isArchive &&  todo.completed == false) {
            return <Todo key={todo.description} todoDescription={todo.description} todoID={todo.ID} todoCompleted={todo.completed} />;
        } else if (isArchive && todo.completed == true) {
            return <Todo key={todo.description} todoDescription={todo.description} todoID={todo.ID} todoCompleted={todo.completed} />;
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
