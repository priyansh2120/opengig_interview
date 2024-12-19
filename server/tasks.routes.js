import express from 'express';
import { getAllTasks, createNewTask, modifyTasks } from './tasks.controller.js';

const router = express.Router();

router.post('/', createNewTask); 
router.get('/', getAllTasks);    
router.put('/:id', modifyTasks); 

export default router;