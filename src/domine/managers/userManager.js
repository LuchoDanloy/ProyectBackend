import container from "../../container.js";


class UserManager
{
  constructor()
  {
     this.userRepository = container.resolve('UserRepository');
  }

  async paginate(criteria)
  {
    return this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email)
  {
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id)
  {
    return this.userRepository.getOne(id);
  }

  async create(data)
  {
    const user = await this.userRepository.create(data);

    return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id)
  {
    return this.userRepository.deleteOne(id);
  }

  async deleteOldUsers(){
    return this.userRepository.deleteOldUsers();
  }

}

export default UserManager;
