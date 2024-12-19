import React, { useEffect, useState } from 'react';

const TaskItem = ({ task, onUpdateTask }) => {
    const [elapsedTime, setElapsedTime] = useState(task.activeTime);

    useEffect(() => {
        let interval;
        if (task.runningStatus === "running" && !task.isCompleted) {
            interval = setInterval(() => {
                setElapsedTime(
                    task.activeTime + (Date.now() - new Date(task.timeUpdated))
                );
            }, 1000);
        } else {
            setElapsedTime(task.activeTime);
        }

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [task.runningStatus, task.isCompleted, task.activeTime, task.timeUpdated]);

    const handleToggleTimer = () => {
        if (!task.isCompleted) {
            const newStatus = task.runningStatus === "running" ? "paused" : "running";
            onUpdateTask(task._id, { runningStatus: newStatus });
        }
    };

    const handleMarkComplete = () => {
        onUpdateTask(task._id, { isCompleted: true });
    };

    return (
        <li className={`flex flex-col gap-3 p-4 shadow-md rounded-lg ${task.isCompleted ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-100'}`}>
            <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-sm">
                    Status: 
                    <span className={`ml-2 font-bold ${task.runningStatus === 'running' ? 'text-green-400' : 'text-red-400'}`}>
                        {task.isCompleted ? "Completed" : task.runningStatus}
                    </span>
                </p>
                <p className="text-sm">
                    Active Time: {Math.floor(elapsedTime / 1000)} seconds
                </p>
            </div>
            {!task.isCompleted ? (
                <div className="flex gap-3">
                    <button
                        onClick={handleToggleTimer}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        {task.runningStatus === "running" ? "Pause" : "Start"}
                    </button>
                    <button
                        onClick={handleMarkComplete}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    >
                        Complete
                    </button>
                </div>
            ) : (
                <p className="text-center mt-4 font-bold text-green-500">Task Completed</p>
            )}
        </li>
    );
};

export default TaskItem;