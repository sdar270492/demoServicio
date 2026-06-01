class User {
  constructor({ id, name, email, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt || new Date().toISOString();
    this.#validate();
  }

  #validate() {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('A valid email is required');
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}

module.exports = User;
