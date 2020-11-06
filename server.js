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

const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const users = [
    {
        id: '1',
        f_name: "Mohsen",
        l_name: "zanganeh",
        age: 33,
    },
    {
        id: "2",
        f_name: "Ali",
        l_name: "zanganeh",
        age: 55,
    }
];
server.addService(userProto.UserService.service, {
    //TODO: Not finish
    getAll: (_, callback) => {
        callback(null, { user: users[0] })
    },
    getAllUnary: (GetOneUserRequest, callback) => {
        callback(null, { user: users })
    },
    getOne: (GetOneUserRequest, callback) => {
        let user = users.find(n => n.id == GetOneUserRequest.request.id);
        if (user) {

            callback(null, { user: user });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    insert: (CreateUserRequest, callback) => {
        const user = CreateUserRequest.request.user;
        console.log('---user:', user);
        users.push(user);
        callback(null, { user: user });
    },
    // TODO: Not Finish
    insertmany: (CreateUserRequest, callback) => {
        const user = CreateUserRequest.user;
        users.push(user);
        callback(null, { user: user });
    },
    update: (UpdateUserRequest, callback) => {
        const user = users.find(n => n.id == UpdateUserRequest.request.user.id);
        if (user) {
            user.f_name = UpdateUserRequest.request.user.f_name;
            user.l_name = UpdateUserRequest.request.user.l_name;
            user.age = UpdateUserRequest.request.user.age;
            callback(null, { user: user });
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    delete: (DeleteUserRequest, callback) => {
        const user = users.find(n => n.id == DeleteUserRequest.request.id);
        if (user != -1) {
            users.splice(user, 1);
            callback(null, { user: users });
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    },
    // TODO: Not Finish
    deletemany: (DeleteUserRequest, callback) => {
        const user = users.find(n => n.id == DeleteUserRequest.request.id);
        if (usre != -1) {
            users.splice(user, 1);
            callback(null, { user: user, details: "Success Fully" });
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    }
})


server.bind("localhost:30043", grpc.ServerCredentials.createInsecure());
console.log('Server Running at 30043:');
server.start();