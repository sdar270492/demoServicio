const User = require('../../domain/entities/User');

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email }) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('A user with this email already exists');

    const user = new User({ id: crypto.randomUUID(), name, email });
    return this.userRepository.save(user);
  }
}

module.exports = CreateUser;
