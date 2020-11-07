const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/unary", (req, res) => {
    client.getAllUnary(null, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data)
    });
});
app.get("/stream", (req, res) => {
    client.getAll(null, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data)
    });
});

app.get("/findone", (req, res) => {
    client.getOne(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data)
    });
});
app.post("/save", (req, res) => {
    let newUser = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        age: req.body.age
    };

    client.insert({ user: newUser }, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
app.post("/insert-many", async (req, res) => {

    let Users = req.body.users;
    let user = client.insertMany({ user: Users });
    const u = [];
    await user.on('data', async (response) => {
        await u.push(response.user)

        console.log('------1------');
    })
    console.log('-----3------');
    res.send(u);
});
app.put("/update", (req, res) => {
    const updateUser = {
        id: req.body.id,
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        age: req.body.age
    };

    client.update({ user: updateUser }, (err, data) => {
        if (err) console.log(err);
        res.send(data);
    });
});

app.delete("/remove", (req, res) => {
    client.delete({ id: req.body.id }, (err, data) => {
        if (err) throw err;
        res.send(data)
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});