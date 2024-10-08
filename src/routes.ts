import express, { Router, Response, Request } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';
import { ListHaircutController } from './controllers/haircut/ListHaircutController';
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController';
import { CountHaircutsController } from './controllers/haircut/CountHaircutsController';
import { DetailHaircutController } from './controllers/haircut/DetailHaircutController';
import { NewScheduleController } from './controllers/schedule/NewScheduleController';
import { ListScheduleController } from './controllers/schedule/ListScheduleController';
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController';
import { DeleteHaircutController } from './controllers/haircut/DeleteHaircutController';
import { SubscribeController } from './controllers/subscriptions/SubscribeController';
import { WebhooksController } from './controllers/subscriptions/WebhooksController';
import { CreatePortalController } from './controllers/subscriptions/CreatePortalController';

const router = Router();

//Rotas User

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated ,new DetailUserController().handle);
router.put('/users', isAuthenticated ,new UpdateUserController().handle);

//Rotas Haircut
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle);
router.get('/haircuts', isAuthenticated, new ListHaircutController().handle);
router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle);
router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle);
router.get('/haircut/count', isAuthenticated, new CountHaircutsController().handle);
router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle);
router.delete('/haircut', isAuthenticated, new DeleteHaircutController().handle);

//Rotas Schedule
router.post('/schedule', isAuthenticated, new NewScheduleController().handle);
router.get('/schedules', isAuthenticated, new ListScheduleController().handle);
router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle);

//Rotas Subscription
router.post('/subscribe', isAuthenticated, new SubscribeController().handle);
router.post('/webhooks', express.raw({ type: "aplication/json" }), new WebhooksController().handle);
router.post('/create-portal', isAuthenticated, new CreatePortalController().handle);

export {router};