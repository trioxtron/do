import { IconCircle, IconCircleCheck, IconTrash } from "@tabler/icons-react";

export default function Todo(props) {
    const deleteTodo = () => {
        fetch(`http://trioxtron.mooo.com:4000/api/todo/${props.todoID}`, { method: 'DELETE' })
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
                props.todoReload(data)
            })
    }
    const patchTodo = () => {
        fetch(`http://trioxtron.mooo.com:4000/api/todo/${props.todoID}`, { method: 'PATCH' })
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
                props.todoReload(data)
            })
    }

    const CheckDone = () => {
        if (props.todoCompleted === false) {
            return <IconCircle />;
        }
        return <IconCircleCheck />;
    }

    return (
        <div className="flex items-center my-1.5 p-2 bg-slight-gray rounded-lg hover:scale-105">
            <div className="flex flex-col items-center">
                <button
                    onClick={patchTodo}
                    className="hover:scale-105 py-0.5">
                    <CheckDone />
                </button>
                <button onClick={deleteTodo} className="hover:scale-105">
                    <IconTrash />
                </button>
            </div>
            <div className="mx-2 flex flex-col items-start">
                <p>{props.todoDescription}</p>
                <p className="text-gray text-xs">{props.todoCreatedAt}</p>
            </div>
        </div>
    );
}
