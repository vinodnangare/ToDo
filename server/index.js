import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());

let todoList = [];

app.get('/', (req, res) => {
    res.json(todoList);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
