import React, { useEffect, useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Fragment } from "react";

export default function Overlay({ isOpen, onClose}) {
    const newTodoDescriptionInput = useRef();
    const [newTodoDescription, setNewTodoDescription] = useState(null);
    useEffect(() => {
        let ignore = false;

        async function startFetch () {
            if (!ignore && newTodoDescription !== null) {
                ignore = true;
                await fetch("http://localhost:4000/api/todo", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "description": newTodoDescription, "completed": false })
                })
                    .then(response => response.json())
                    .then(response => console.log(JSON.stringify(response)))
                    .then(() => console.log(newTodoDescription));
            }
        }
        startFetch();

    }, [newTodoDescription]);

    const writeTodoDescription = () => {
        if (newTodoDescriptionInput.current.value.trim() !== "") {
            console.log("newTodoDescription written!!");
            setNewTodoDescription(newTodoDescriptionInput.current.value);
        }
    };

    return (
        <Fragment>
            {isOpen && (
                <div>
                    <p>Create a new Todo here:</p>
                    <form className="flex justify-center group m-2">
                        <input
                            type="text"
                            placeholder="Take out garbage"
                            ref={newTodoDescriptionInput}
                            className="rounded-full px-4 text-midnight outline-none hover:scale-105 focus:scale-105"
                        />
                        <button
                            onClick={() => {
                                writeTodoDescription();
                                onClose();
                            }}
                            className='mx-2 bg-gradient-to-br from-soft-pink to-soft-purple p-1.5 text-sm rounded-3xl hover:scale-105'>
                            <IconPlus />
                        </button>
                    </form>
                </div>
            )}
        </Fragment>
    );
} 
