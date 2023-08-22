import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

 async execute(user_id: string): Promise<User>{
  return this.userRepository.findUserById(user_id)
 }
}
