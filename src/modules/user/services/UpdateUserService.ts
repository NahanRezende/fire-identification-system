import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../infra/typeorm/entities/User';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<User>{
    return this.userRepository.update(user);
  }
}
