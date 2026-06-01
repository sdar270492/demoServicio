const User = require('../../domain/entities/User');

class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, { name, email }) {
    const existing = await this.userRepository.findById(id);
    if (!existing) throw new Error('User not found');

    const updated = new User({
      id: existing.id,
      name: name ?? existing.name,
      email: email ?? existing.email,
      createdAt: existing.createdAt,
    });

    return this.userRepository.save(updated);
  }
}

module.exports = UpdateUser;
