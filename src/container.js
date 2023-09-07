import dotenv from 'dotenv';
dotenv.config();

import { createContainer, asClass, Lifetime } from "awilix";

import UserMongooseRepository from "./data/repositories/mongoose/userMongooseReporitory.js";
import RoleMongooseRepository from "./data/repositories/mongoose/roleMongooseRepository.js";
import ProductMongooseRepository from "./data/repositories/mongoose/productMongooseRepository.js";
import CartMongooseRepository from "./data/repositories/mongoose/cartMongooseRepository.js";
import TicketMongooseRepository from "./data/repositories/mongoose/ticketMongooseRepository.js";

const container = createContainer();

if(process.env.DB === 'MongooseAdapter')
{
  container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('RoleRepository', asClass(RoleMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('TicketRepository', asClass(TicketMongooseRepository), { lifetime: Lifetime.SINGLETON });
}
else if(process.env.DB === 'FileAdapter')
{

}

export default container;
