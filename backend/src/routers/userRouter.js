import express from 'express'
import { authMe } from '../controllers/userController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const route = express.Router();

route.get('/me',authMe)

export default route;