// // get-all-users.use-case.integration.test.ts

// import { GetAllUsersUseCase } from './get-all-users.use-case';
// import { UserRepository } from '@infrastructure/persistence/repositories/user/user-repository';

// describe('GetAllUsersUseCase Integration Test', () => {
//   let getAllUsersUseCase: GetAllUsersUseCase;
//   let userRepository: UserRepository;

//   beforeEach(() => {
//     userRepository = new UserRepository();
//     getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
//   });

//   it('should retrieve all users from the database', async () => {
//     const users = await getAllUsersUseCase.execute();
//     expect(users.length).toBeGreaterThan(0); // Assuming there's data in DB
//   });
// });
test.skip('should return success', () => {
  // Empty or not yet implemented
});

test.skip('should handle error', () => {
  // Empty or not yet implemented
});
