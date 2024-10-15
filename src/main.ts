import 'reflect-metadata'; // Necessary for InversifyJS to work
import express from 'express';
import { container } from '@infrastructure/di/container';
import { TYPES } from '@infrastructure/di/types';
import { RoleMiddleware } from '@interfaces/http/middleware/role.middleware';
import { UserRole } from '@domain/entities/user/user-role';
import { JWTService } from '@app/services/jwt-service/jwt-service-service';

const app = express();
app.use(express.json());

const jwtService = container.get<JWTService>(TYPES.JWTService);

// Temporary route to generate a token based on email
app.post('/generate-token', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Create a temporary payload
  const payload = {
    email: email,
    role: 'Admin', // Assign the role that your protected route checks for (e.g., Admin)
  };

  // Generate a JWT token (expires in 1 hour)
  const token = jwtService.generateToken(
    payload,
    process.env.JWT_SECRET as string,
    '1h'
  );

  return res.json({ token });
});

// Example usage of middleware with DI
app.use(
  '/protected-route',
  (req, res, next) => {
    console.log('Request received in app.use() middleware');
    next(); // Pass control to the next middleware or route handler
  },
  new RoleMiddleware(container.get(TYPES.JWTService)).handle([
    new UserRole('Admin'),
  ])
);

// Define route handlers for specific methods (GET, POST, etc.)
app.get('/protected-route', (req, res) => {
  res.send('GET request - Access granted');
});

app.post('/protected-route', (req, res) => {
  res.send('POST request - Access granted');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
