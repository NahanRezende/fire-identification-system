import { Router } from 'express';
import { CreateSensorController } from '../controllers/CreateSensorController';
import { FindAllSensorsController } from '../controllers/FindAllSensorsController';
import { DeleteSensorController } from '../controllers/DeleteSensorController';
import { FindSensorByUserIdController } from '../controllers/FindSensorByUserIdController';
import { UpdateSensorController } from '../controllers/UpdateSensorController';
import { TemperatureCheckController } from '../controllers/TemperatureCheckController';

const sensorRouter = Router();

const createSensorController = new CreateSensorController();
const temperatureCheckController = new TemperatureCheckController();
const findAllSensorsController = new FindAllSensorsController();
const deleteSensorController = new DeleteSensorController();
const findSensorByUserIdController = new FindSensorByUserIdController();
const updateSensorController = new UpdateSensorController();

sensorRouter.post('/', createSensorController.handle);

sensorRouter.post('/teperature-check', temperatureCheckController.handle);

sensorRouter.delete('/:sensor_id', deleteSensorController.handle);

sensorRouter.get('/:user_id', findSensorByUserIdController.handle);

sensorRouter.get('/', findAllSensorsController.handle);

sensorRouter.put('/', updateSensorController.handle);

sensorRouter.put('/:driver_id', findAllSensorsController.handle);


export { sensorRouter }
