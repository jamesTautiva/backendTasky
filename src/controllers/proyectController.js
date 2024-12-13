
const express = require('express');
const Project = require('../models/projectsModels')

const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los proyectos' });
    }
}

const createProject =  async (req, res) => {
    try{
        const { name, description, user_id } = req.body;
        const newProject = await Project.create({
            name,
            description,
            user_id
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ message: 'Hubo un error al crear el proyecto' });
    }

}

const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { name, description, user_id } = req.body;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        project.name = name || project.name;
        project.description = description || project.description;
        project.user_id = user_id || project.user_id;

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ message: 'Hubo un error al actualizar el proyecto' });
    }
};

const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        await project.destroy();
        res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar el proyecto' });
    }
};

const getProjectsUser = async (req, res) => {
    const userId = req.params.userId;  // Captura el parámetro de la URL
    try {
    const projects = await Project.findAll({
      where: { user_id: userId }  // Filtra por el userId
    });
    res.json(projects);
    } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
    }

}
module.exports = { 
    getProjects,
    createProject, 
    updateProject, 
    deleteProject,
    getProjectsUser
};

