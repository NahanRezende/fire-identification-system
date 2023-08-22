import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { FindAllUsersController } from '../controllers/FindAllUsersController';
import { FindUserByIdController } from '../controllers/FindUserByIdController';
import { UpdateUserController } from '../controllers/UpdateUserController';

const userRouter = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findAllUsersController = new FindAllUsersController();
const findUserByIdController = new FindUserByIdController();
const updateUserController = new UpdateUserController();

userRouter.post('/', createUserController.handle);

userRouter.delete('/:user_id', deleteUserController.handle);

userRouter.get('/', findAllUsersController.handle);

userRouter.get('/:user_id', findUserByIdController.handle);

userRouter.put('/', updateUserController.handle);




export { userRouter };
