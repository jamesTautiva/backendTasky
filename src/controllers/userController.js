const express = require('express');
const User = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = "contraseña secreta";
const nodemailer = require('nodemailer');

// traer todos los usuarios
const getUsers= async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// crear un nuevo usuario
const postUsers = async (req, res) => {
    const {nameUser, email, passwordUser } = req.body;
    console.log(req.body);
    try {

        const hashedPassword = await bcrypt.hash(passwordUser, 10);
        const newUser = await User.create({
            nameUser,
            email,
            passwordUser: hashedPassword
        });
        res.status(201).json(newUser);
        } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Hubo un error al crear el usuario' });
        }
};

// login user
const loginUser = async (req, res) => {
    const { email, passwordUser } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ where: { email} });
        
        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({ message: 'Invalid email ' });
        }
        
        // Comparar la contraseña
        const isPasswordValid = await bcrypt.compare(passwordUser, user.passwordUser);  // Compara la contraseña
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });   
        } 
        // Generar token JWT
        const token = jwt.sign(
            { userId: user.id, name: user.nameUser, email: user.email },  // Usar 'user.id' ya que es el ID del usuario en Sequelize
            jwtSecret,
            { expiresIn: '1h' }
        );

        // Responder con los datos del usuario y el token
        res.json({ user: { id: user.id, name: user.nameUser, email: user.email }, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};

// recuperar contraseña del login

const emailUser = "jamestautiva@gmail.com";
const emailPass = "iwto iahe rotk vkjl";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: emailUser,
        pass: emailPass,
    },
    tls: {
        rejectUnauthorized: false, // Desactiva la verificación del certificado
    },
})

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    //verificar si el correo esta registrado
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    //crear token de recuperacion
    const recoveryToken = jwt.sign({
        userId: user.id
        },
    jwtSecret,
    { expiresIn: '1h' })

    //crear el enlace de recuperacion}
    
    const recoveryLink = `http://localhost:3000/recovery/${recoveryToken}`
    
    //enviar el email con el enlace de recuperacion



    const mailOptions = {
        form: emailUser,
        to: user.email,
        subject: 'Recuperación de contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${recoveryLink}`,
    }

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email de recuperación enviado' });
    } catch (error) {
        console.error('Error al enviar email:', error);
        res.status(500).json({ message: 'Hubo un error al enviar el email' });
    }
}

// resetear contraseña

const resetPassword = async (res, req) => {

    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // verificar el token
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.userId;

        // buscar el usuario por id
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // encriptar la nueva contraseña

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // actualizar la contraseña
        user.passwordUser = hashedPassword;
        await user.save();
        
        res.json({ message: 'Contraseña reseteada correctamente' });
    } catch {
        console.error('Error durante la recuperación de contraseña:', error);
        res.status(500).json({ message: 'Hubo un error durante la recuperación de contraseña' });
    }
}


// saludar

const dashboard = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(401).send('No autorizado');

    jwt.verify(token, 'mi_clave_secreta', (err, decoded) => {
        if (err) return res.status(401).send('Token no válido');
        res.json({ mensaje: `Bienvenido al Dashboard de ${decoded.username}`, userId: decoded.id });
    });

}







module.exports = {
    getUsers,
    postUsers,
    loginUser,
    forgotPassword,
    resetPassword,
    dashboard
}
