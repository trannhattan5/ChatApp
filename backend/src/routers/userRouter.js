import express from 'express'
import { authMe, test } from '../controllers/userController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const route = express.Router();

route.get('/me',authMe)
route.get('/test', test)
export default route;