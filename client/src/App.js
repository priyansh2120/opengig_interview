import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-400">Task Timer Application</h1>
                <p className="text-gray-400 mt-2">Manage your tasks with ease</p>
            </header>
            <main className="max-w-4xl mx-auto bg-gray-800 p-8 shadow-md rounded-lg">
                <TaskList />
            </main>
        </div>
    );
};

export default App;