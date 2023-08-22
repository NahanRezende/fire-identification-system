import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user_id: string): Promise<void>{
    await this.userRepository.delete(user_id);
  }
}
