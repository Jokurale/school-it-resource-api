class ServiceFactory {
  /**
   * Create new service factory (CRUD operations factory)
   * @param {PrismaClient} prismaInstance - Instantiated prisma client which functions within the factory will rely on
   * @param {validator} validator - Validator that will be used to produce CRUD functions
   * @param {string} objectName - Valid singular prisma property via which data will be received within factoried functions
   */
  constructor(prismaInstance, validator, objectName) {
    this.prismaInstance = prismaInstance;
    this.validator = validator;
    this.objectName = objectName;

    this.getServiceFunctions = this.getServiceFunctions.bind(this);
  }

  generateGetAll() {
    this.getAll = async () => {
      const objects = await this.prismaInstance[this.objectName].findMany();

      return objects;
    };
  }

  generateGetById() {
    this.getById = async (objectId) => {
      const object = await this.prismaInstance[this.objectName].findFirst({
        where: {
          id: objectId,
        },
      });

      return object;
    };
  }

  generateAdd() {
    this.add = async (object) => {
      const validObject = await this.validator(object);

      const result = await this.prismaInstance[this.objectName].create(
        validObject
      );

      return result;
    };
  }

  generateUpdate() {
    this.update = async (objectId, object) => {
      const validObject = await this.validator(object, "update");

      const result = await this.prismaInstance[this.objectName].update({
        where: {
          id: objectId,
        },
        ...validObject,
      });

      return result;
    };
  }

  generateRemove() {
    this.remove = async (objectId) => {
      const result = await this.prismaInstance[this.objectName].delete({
        where: {
          id: objectId,
        },
      });

      return result;
    };
  }

  getServiceFunctions() {
    this.generateGetAll();
    this.generateGetById();
    this.generateAdd();
    this.generateUpdate();
    this.generateRemove();

    return {
      getAll: this.getAll,
      getById: this.getById,
      add: this.add,
      update: this.update,
      remove: this.remove,
    };
  }
}

module.exports = ServiceFactory;
