import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai, { use } from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../data/repositories/mongoose/userMongooseReporitory.js";

describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_TEST);
        this.userRepository = new UserMongooseRepository();
    });
    after(function () {
        db.drop();
        db.close();
    }); 
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            {
                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            password: 12345678,
            isAdmin: false

        };
        
        return this.userRepository
            .create(user)
            .then(result =>
            {
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
            }
        );
    });
    
    it('El repositorio debe poder realizar un GETONE de un user', async function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            password: 12345678,
            isAdmin: false
        };
        
        const usercreado = await this.userRepository.create(user)

        return this.userRepository
            .getOne(usercreado.id)
            .then(result => {
                expect(result.firstName).to.be.equals(usercreado.firstName);
                expect(result.email).to.be.equals(usercreado.email);
            }
        );
    });

    it('El repositorio debe poder hacer un UPDATE sobre un user', async function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            password: 12345678,
            isAdmin: false
        };

        const usercreado = await this.userRepository.create(user);
        
        const newUser = {...usercreado, firstName: "Luciano", age: 50}

        return this.userRepository
            .updateOne(usercreado.id, newUser)
            .then(result =>
            {
                expect(result.firstName).to.be.equals("Luciano");
                expect(result.age).to.be.equals(50);
            }
        );
    });


    it('El repositorio debe poder hacer un DELETE de un user', async function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            password: 12345678,
            isAdmin: false
        };

        const usercreado = await this.userRepository.create(user);

        return this.userRepository
            .deleteOne(usercreado.id)
            .then(result =>
            {
                expect(result.firstName).to.not.be.equals(usercreado.firstName);
                expect(result.email).to.not.be.equals(usercreado.email);
            }
        );
    });
});

