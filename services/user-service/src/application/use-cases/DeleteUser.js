class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const existing = await this.userRepository.findById(id);
    if (!existing) throw new Error('User not found');
    await this.userRepository.delete(id);
  }
}

module.exports = DeleteUser;
