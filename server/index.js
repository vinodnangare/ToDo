import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors()); 
app.use(express.json());

let todoList = [];

app.get('/', (req, res) => {
    res.json(todoList);
});

app.post('/', (req, res) => {
    const { title, priority } = req.body;

    if (!title || !priority) {
        return res.status(400).json({ error: "Missing title or priority" });
    }

    const newTodo = {
        id: todoList.length + 1,
        title,
        priority
    };

    todoList.push(newTodo);
    res.json({ message: "Todo added", todo: newTodo });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
