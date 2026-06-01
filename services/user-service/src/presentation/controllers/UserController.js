class UserController {
  constructor({ createUser, getUser, listUsers, updateUser, deleteUser }) {
    this.createUser = createUser;
    this.getUser = getUser;
    this.listUsers = listUsers;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
  }

  async list(req, res, next) {
    try {
      const users = await this.listUsers.execute();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await this.getUser.execute(req.params.id);
      res.json(user);
    } catch (err) {
      if (err.message === 'User not found') return res.status(404).json({ error: err.message });
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const user = await this.createUser.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      if (err.message.includes('already exists') || err.message.includes('required') || err.message.includes('valid')) {
        return res.status(400).json({ error: err.message });
      }
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      if (err.message === 'User not found') return res.status(404).json({ error: err.message });
      if (err.message.includes('required') || err.message.includes('valid')) {
        return res.status(400).json({ error: err.message });
      }
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      await this.deleteUser.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      if (err.message === 'User not found') return res.status(404).json({ error: err.message });
      next(err);
    }
  }
}

module.exports = UserController;
