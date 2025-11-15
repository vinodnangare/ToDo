import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

let todoList = [];

app.get('/', (req, res) => {
    res.json(todoList);
});

app.post('/', (req, res) => {
    const { title, priority, completed } = req.body;

    if (!title || !priority) {
        return res.status(400).json({
            error: "Missing title or priority in JSON body."
        });
    }

    const newTodo = {
        id: todoList.length + 1,
        title,
        priority,
        completed: completed || false
    };

    todoList.push(newTodo);

    res.json({
        message: "Todo added successfully",
        todo: newTodo
    });
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, priority, completed } = req.body;
    const todo = todoList.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    if (title) todo.title = title;
    if (priority) todo.priority = priority;
    if (completed !== undefined) todo.completed = completed;
    res.json({
        message: "Todo updated successfully",
        todo
    });
});

app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, priority, completed } = req.body;
    const todo = todoList.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    if (title) todo.title = title;
    if (priority) todo.priority = priority;
    if (completed !== undefined) todo.completed = completed;
    res.json({
        message: "Todo updated successfully",
        todo
    });
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = todoList.findIndex(todo => todo.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todoList.splice(index, 1);
    res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
