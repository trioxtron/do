import './App.css';
import { useState } from 'react';
import Overlay from './components/overlay';
import Page from './components/page';
import Nav from './components/nav';

export default function App() {
    const [newTodoOverlay, setNewTodoOverlay] = useState(false);
    const [isArchive, setIsArchive] = useState(false);

    const toggleOverlay = () => {
        setNewTodoOverlay(!newTodoOverlay);
    }

    const toggleArchive = () => {
        setIsArchive(!isArchive);
    }

    const ChoseHeader = () => {
        if (isArchive) {
            return <Nav site="archive" />;
        }
        return <Nav site="main" />;
    }


    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-4xl font-bold'>DO!</h1>
                <button onClick={toggleArchive}>
                    <ChoseHeader />
                </button>
            </div>
            <div className='flex justify-center'>
                <div className="flex flex-col text-center items-center w-80">
                    <Page toggleOverlay={toggleOverlay} isArchive={isArchive} />
                    <Overlay isOpen={newTodoOverlay} onClose={toggleOverlay}>
                        <h1>Content in Overlay</h1>
                    </Overlay>
                </div>
            </div>
        </div>
    );
}

