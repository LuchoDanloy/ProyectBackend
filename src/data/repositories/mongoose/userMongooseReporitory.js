import userSchema from "../../models/mongoose/userSchema.js";
import User from '../../../domine/entities/user.js';

class UserMongooseReporitory
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const userDocuments = await userSchema.paginate({}, { limit, page });
    const { docs, ...pagination } = userDocuments;

    const users = docs.map(document => new User({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age,
      password:document.password,
      isAdmin: document?.isAdmin,
      role: document?.role,
      lastDate: document?.lastDate
    }));

    return {
      users,
      pagination
    };
  }

  async getOne(id)
  {
    const userDocument = await userSchema.findOne({ _id: id });

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        role: userDocument?.role,
        lastDate: userDocument?.lastDate
    });
  }

  async getOneByEmail(email)
  {
    const userDocument = await userSchema.findOne({ email });

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        role: userDocument?.role,
        lastDate: userDocument?.lastDate
    });
  }

  async create(data)
  {
    const userDocument = await userSchema.create(data);

    return new User({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
        isAdmin: userDocument?.isAdmin,
        lastDate: userDocument?.lastDate
    });
  }

  async updateOne(id, data)
  {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        lastDate: userDocument.lastDate
    });
  }

  async deleteOne(id)
  {
    return userSchema.deleteOne({ _id: id });
  }

  async deleteOldUsers()
  {
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
    
    const users = await userSchema.find(); 

    console.log(users)

    for (const user of users) {
      if (user.lastDate && user.lastDate <= twentyDaysAgo) {
        await this.deleteOne(user._id)
        console.log(`Eliminando usuario: ${user._id}`);
      }
    }
  }
}

export default UserMongooseReporitory;
