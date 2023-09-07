import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai, { use } from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/repositories/mongoose/roleMongooseRepository.js";

describe("Testing Rol Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_TEST);
        this.roleRepository = new RoleMongooseRepository();
    });
    after(function () {
        db.drop();
        db.close();
    }); 
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.roleRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            {
                expect(Array.isArray(result.roles)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un Rol', function () {
        const rol = {
            name: faker.internet.userName(),
            permissions: [faker.internet.userName(),faker.internet.userName()],
        };
        
        return this.roleRepository
            .create(rol)
            .then(result =>
            {
                expect(result.name).to.be.equals(rol.name);
                expect(result.permissions[1]).to.be.equals(rol.permissions[1]);
            }
        );
    });
    
    it('El repositorio debe poder realizar un GETONE de un Rol', async function () {
        const rol = {
            name: faker.internet.userName(),
            permissions: [faker.internet.userName(),faker.internet.userName()],
        };
        
        const rolcreado = await this.roleRepository.create(rol)

        return this.roleRepository
            .getOne(rolcreado.id)
            .then(result => {
                expect(result.name).to.be.equals(rolcreado.name);
                expect(result.permissions[1]).to.be.equals(rolcreado.permissions[1]);
            }
        );
    });

    it('El repositorio debe poder hacer un UPDATE sobre un Rol', async function () {
        const rol = {
            name: faker.internet.userName(),
            permissions: [faker.internet.userName(),faker.internet.userName()],
        };

        const rolcreado = await this.roleRepository.create(rol)
        
        const newRol = {...rolcreado, name: "Administrador"}

        return this.roleRepository
            .updateOne(newRol.id, newRol)
            .then(result =>
            {
                expect(result.name).to.be.equals("Administrador");
            }
        );
    });


    it('El repositorio debe poder hacer un DELETE de un Rol', async function () {
        const rol = {
            name: faker.internet.userName(),
            permissions: [faker.internet.userName(),faker.internet.userName()],
        };

        const rolcreado = await this.roleRepository.create(rol)

        return this.roleRepository
            .deleteOne(rolcreado.id)
            .then(result =>
            {
                expect(result.name).to.not.be.equals(rolcreado.name);
            }
        );
    });
});

