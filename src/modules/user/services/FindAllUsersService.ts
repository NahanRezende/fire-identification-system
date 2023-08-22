import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../infra/typeorm/entities/User';

@injectable()
export class FindAllUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]>{
    return this.userRepository.findAll();
  }
}
