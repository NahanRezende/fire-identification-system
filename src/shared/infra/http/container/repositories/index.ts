import { container } from 'tsyringe';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { SensorRepository } from '@modules/sensor/infra/typeorm/repositories/SensorRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ISensorRepository>('SensorRepository', SensorRepository);
