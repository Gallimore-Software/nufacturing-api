// src/infrastructure/di/container.ts
import { Container } from 'inversify';

import { TYPES } from './types';
import { JWTService } from '@app/services/jwt-service/jwt-service-service';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';
import { IUserRepository } from '@interfaces/repositories/user/user-repository-interface';

const container = new Container();

// Bind interfaces to implementations
container.bind<JWTService>(TYPES.JWTService).to(JWTService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

export { container };
