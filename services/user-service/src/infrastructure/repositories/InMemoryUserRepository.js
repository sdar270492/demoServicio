const UserRepository = require('../../domain/repositories/UserRepository');

class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.store = new Map();
  }

  async findById(id) {
    return this.store.get(id) ?? null;
  }

  async findByEmail(email) {
    for (const user of this.store.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async findAll() {
    return Array.from(this.store.values());
  }

  async save(user) {
    this.store.set(user.id, user);
    return user;
  }

  async delete(id) {
    this.store.delete(id);
  }
}

module.exports = InMemoryUserRepository;
