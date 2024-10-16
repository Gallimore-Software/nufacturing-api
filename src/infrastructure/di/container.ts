import { Container } from 'inversify';
import { TYPES } from './types';
import { JWTService } from '@app/services/jwt-service/jwt-service-service';
import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository.interface';
import { CheckUserRoleUseCase } from '@app/use-cases/user/check-user-role/check-user-role.use-case';
import { AuthService } from '@app/auth/auth.service';
import { HashService } from '@infrastructure/auth/hash/hash-service';

const container = new Container();

// Bind interfaces to implementations
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<JWTService>(TYPES.JWTService).to(JWTService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<HashService>(TYPES.HashService).to(HashService); // Add this line
container
  .bind<CheckUserRoleUseCase>(TYPES.CheckUserRoleUseCase)
  .to(CheckUserRoleUseCase);

export { container };
