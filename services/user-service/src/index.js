require('dotenv').config();
const express = require('express');

// Infrastructure
const InMemoryUserRepository = require('./infrastructure/repositories/InMemoryUserRepository');

// Use Cases
const CreateUser = require('./application/use-cases/CreateUser');
const GetUser = require('./application/use-cases/GetUser');
const ListUsers = require('./application/use-cases/ListUsers');
const UpdateUser = require('./application/use-cases/UpdateUser');
const DeleteUser = require('./application/use-cases/DeleteUser');

// Presentation
const UserController = require('./presentation/controllers/UserController');
const createUserRoutes = require('./presentation/routes/userRoutes');

// ── Dependency Injection (manual) ──────────────────────────────────────────
const userRepository = new InMemoryUserRepository();

const useCases = {
  createUser: new CreateUser(userRepository),
  getUser: new GetUser(userRepository),
  listUsers: new ListUsers(userRepository),
  updateUser: new UpdateUser(userRepository),
  deleteUser: new DeleteUser(userRepository),
};

const userController = new UserController(useCases);

// ── Express App ────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'user-service' }));

app.use('/users', createUserRoutes(userController));

app.use((err, req, res, next) => {
  console.error(`[user-service] ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`user-service running on http://localhost:${PORT}`);
});
