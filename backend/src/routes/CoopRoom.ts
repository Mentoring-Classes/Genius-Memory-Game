import { createRoom, getRoom, joinRoom, leaveRoom, updateRoom } from '../controllers/CoopRoom';
import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/coopRoom/create', authMiddleware,(req: Request, res: Response) => { createRoom(req, res); });
router.get('/coopRoom/:id', authMiddleware,(req: Request, res: Response) => { getRoom(req, res); });
router.patch('/coopRoom/join', authMiddleware,(req: Request, res: Response) => { joinRoom(req, res); });
router.patch('/coopRoom/update', authMiddleware,(req: Request, res: Response) => { updateRoom(req, res); });
router.patch('/coopRoom/leave', authMiddleware,(req: Request, res: Response) => { leaveRoom(req, res); });
export default router;