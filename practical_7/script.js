const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

let users = [
    {id : 1,name : "John", age : 25},
    {id : 2,name : "Jane", age : 30},
];

app.post('/users', (req, res) => {
    const {name, age} = req.body;
    const newUser = {id : users.length + 1, name, age};
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req,res) => {
    const userID = parseInt(req.params.id);
    const user = users.find(u => u.id === userID);
    if(user){
        res.status(200).json(user);
    } else {
        res.status(404).json({message : 'User not found'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});