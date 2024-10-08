// src/infrastructure/di/container.ts
import { Container } from 'inversify';
import { JWTService } from '@application/services/jwt-service';
import { IUserRepository } from '@domain/interfaces/repositories/user-repository.interface';
import { UserRepository } from '@infrastructure/persistence/repositories/user-repository';
import { TYPES } from './types';

const container = new Container();

// Bind interfaces to implementations
container.bind<JWTService>(TYPES.JWTService).to(JWTService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

export { container };
