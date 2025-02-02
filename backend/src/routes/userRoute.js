import express from 'express';
import userController from '../controllers/userController.js';

const route = express.Router();

route.post('/', userController.register);
route.post('/login', userController.login);

export default route;