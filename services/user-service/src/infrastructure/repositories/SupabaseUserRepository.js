const UserRepository = require('../../domain/repositories/UserRepository');
const User = require('../../domain/entities/User');

const toUser = (row) =>
  new User({ id: row.id, name: row.name, email: row.email, createdAt: row.created_at });

class SupabaseUserRepository extends UserRepository {
  constructor(client) {
    super();
    this.client = client;
  }

  async findById(id) {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? toUser(data) : null;
  }

  async findByEmail(email) {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? toUser(data) : null;
  }

  async findAll() {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data.map(toUser);
  }

  async save(user) {
    const { data, error } = await this.client
      .from('users')
      .upsert(
        { id: user.id, name: user.name, email: user.email, created_at: user.createdAt },
        { onConflict: 'id' }
      )
      .select()
      .single();
    if (error) throw new Error(error.message);
    return toUser(data);
  }

  async delete(id) {
    const { error } = await this.client.from('users').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
}

module.exports = SupabaseUserRepository;
