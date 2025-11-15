import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());

let todoList = [];

app.get('/', (req, res) => {
    res.json(todoList);
});

app.post('/', (req, res) => {
    const { title, priority } = req.body;

    if (!title || !priority) {
        return res.status(400).json({
            error: "Missing title or priority in JSON body."
        });
    }

    const newTodo = {
        id: todoList.length + 1,
        title,
        priority
    };

    todoList.push(newTodo);

    res.json({
        message: "Todo added successfully",
        todo: newTodo
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
}
);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
