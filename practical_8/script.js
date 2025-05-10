const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let users = [
    { id: 1, name: 'Krushna', age : 30 },
    { id: 2, name: 'Arjun', age : 25 },
    { id: 3, name: 'Karn', age : 35 }
]
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.put('/users/:id',(req,res) =>{
    const UserID = parseInt(req.params.id);
    const updatedData = req.body;

    let user = users.find(user => user.id === UserID);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    user.name = updatedData.name || user.name;
    user.age = updatedData.age || user.age;
    res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully',deletedUser });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});