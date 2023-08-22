import { userRouter } from '@modules/user/infra/http/routes/user.routes';
import { sensorRouter } from '@modules/sensor/infra/http/routes/sensor.router';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);
router.use('/sensor', sensorRouter);

export { router };
