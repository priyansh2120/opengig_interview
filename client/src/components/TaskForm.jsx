import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) return;
        onAddTask({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Name"
                className="bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                className="bg-gray-700 text-gray-100 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;