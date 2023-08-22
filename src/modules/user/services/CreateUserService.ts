import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User} from '../infra/typeorm/entities/User';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user: ICreateUserDTO): Promise<User>{
    return this.userRepository.create(user);
  }
}
