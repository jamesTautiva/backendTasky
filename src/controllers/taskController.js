const  Task  = require('../models/taskModels');
const express = require('express');



const getTasks = async (req, res) => {
try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
    
} catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las tareas' });
}
};

const createTask = async (req, res) => {
    const { title, description, due_date, status, project_id, assigned_user_id } = req.body;

    try {
        const newTask = await Task.create({
        title,
        description,
        due_date,
        status,
        project_id,
        assigned_user_id,
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ message: 'Hubo un error al crear la tarea' });
        }
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, due_date, status, project_id, assigned_user_id } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.due_date = due_date || task.due_date;
        task.status = status || task.status;
        task.project_id = project_id || task.project_id;
        task.assigned_user_id = assigned_user_id || task.assigned_user_id;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ message: 'Hubo un error al actualizar la tarea' });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar la tarea' });
    }
};

module.exports = { 
    getTasks, 
    createTask, 
    updateTask, 
    deleteTask 
};
