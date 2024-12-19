import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const API_URL = "http://localhost:3002/tasks/";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_URL}`);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await axios.post(`${API_URL}`, task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (id, updates) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updates);
            setTasks(tasks.map(task => task._id === id ? response.data : task));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Sort tasks: Uncompleted first, then completed
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.isCompleted === b.isCompleted) return 0;
        return a.isCompleted ? 1 : -1;
    });

    return (
        <div>
            <TaskForm onAddTask={addTask} />
            <ul className="mt-6 space-y-4">
                {sortedTasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onUpdateTask={updateTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

