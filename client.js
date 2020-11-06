const protoUserOne = "./user.proto";
const protoUserTwo = "./user2.proto";

const grpc = require("grpc")
const protoloader = require("@grpc/proto-loader");

const packageDefinition = protoloader.loadSync(protoUserOne, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const client = new UserService("localhost:30043", grpc.credentials.createInsecure())
module.exports = client;