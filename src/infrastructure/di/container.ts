import { Container } from 'inversify';

import { TYPES } from './types';
import { JWTService } from '@app/services/jwt-service/jwt-service-service';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';
import { IUserRepository } from '@domain/interfaces/repositories/user-repository.interface';
import { CheckUserRoleUseCase } from '@use-cases/user/check-user-role/check-user-role-use-case';

const container = new Container();

// Bind interfaces to implementations
container.bind<JWTService>(TYPES.JWTService).to(JWTService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<CheckUserRoleUseCase>(TYPES.CheckUserRoleUseCase).to(CheckUserRoleUseCase);

export { container };
