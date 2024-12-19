import taskModel from './task.model.js';

export const createNewTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        const task = new taskModel(req.body);
        await task.save();

        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Failed to create task.' });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();

        const updatedTasks = tasks.map(task => {
            const updatedTask = task.toObject(); 
            if (task.runningStatus === 'running') {
                const elapsedTime = Date.now() - task.timeUpdated; 
                updatedTask.activeTime += elapsedTime; 
            }
            return updatedTask;
        });

        res.status(200).json(updatedTasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
};

export const modifyTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { runningStatus, isCompleted } = req.body;

        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        if (runningStatus && runningStatus !== task.runningStatus) {
            if (task.runningStatus === 'paused' && runningStatus === 'running') {
                task.timeUpdated = Date.now();
            } else if (task.runningStatus === 'running' && runningStatus === 'paused') {
                task.activeTime += Date.now() - task.timeUpdated;
            }
            task.runningStatus = runningStatus;
        }

        
        if (typeof isCompleted === 'boolean') {
            task.isCompleted = isCompleted;
        }

        await task.save();
        res.status(200).json(task);
    } catch (err) {
        console.error('Error modifying task:', err);
        res.status(500).json({ error: 'Failed to modify task.' });
    }
};