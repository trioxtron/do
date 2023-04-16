import { IconCircle, IconCircleCheck, IconTrash } from "@tabler/icons-react";

export default function Todo(props) {
    const deleteTodo = () => {
        fetch(`http://localhost:4000/api/todo/${props.todoID}`, { method: 'DELETE' })
            .catch((error) => {
                console.error(error)
            })
    }
    const patchTodo = () => {
        fetch(`http://localhost:4000/api/todo/${props.todoID}`, { method: 'PATCH' })
            .catch((error) => {
                console.error(error)
            })
    }

    const CheckDone = () => {
        if (props.todoCompleted === false) {
            return <IconCircle />;
        } 
        return <IconCircleCheck />;
    }

    return (
        <div className="flex justify-between items-center my-1.5 p-2 bg-slight-gray rounded-lg hover:scale-105">
            <button
                onClick={patchTodo}
                className="hover:scale-105">
                <CheckDone />
            </button>
            <p>{props.todoDescription}</p>
            <button onClick={deleteTodo} className="hover:scale-105">
                <IconTrash />
            </button>
        </div>
    );
}
