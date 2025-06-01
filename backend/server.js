const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Добавляем импорт cors

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:4200', // Разрешаем запросы с этого origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP-методы
  allowedHeaders: ['Content-Type'] // Разрешенные заголовки
}));

app.use(bodyParser.json());

// Хранилище данных (в реальном приложении используйте базу данных)
let entities = [];
let nextId = 1;

// Модель сущности
// {
//   id: number,
//   name: string,
//   description: string,
//   date: string
// }

// Создание сущности
app.post('/entities', (req, res) => {
    const { name, description, date } = req.body;
    
    if (!name || !description || !date) {
        return res.status(400).json({ error: 'Все поля (name, description, date) обязательны' });
    }
    
    const newEntity = {
        id: nextId++,
        name,
        description,
        date
    };
    
    entities.push(newEntity);
    res.status(201).json(newEntity);
});

// Получение всех сущностей
app.get('/entities', (req, res) => {
    res.json(entities);
});

// Получение одной сущности по ID
app.get('/entities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entity = entities.find(e => e.id === id);
    
    if (!entity) {
        return res.status(404).json({ error: 'Сущность не найдена' });
    }
    
    res.json(entity);
});

// Обновление сущности
app.put('/entities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, date } = req.body;
    
    const entityIndex = entities.findIndex(e => e.id === id);
    
    if (entityIndex === -1) {
        return res.status(404).json({ error: 'Сущность не найдена' });
    }
    
    if (!name || !description || !date) {
        return res.status(400).json({ error: 'Все поля (name, description, date) обязательны' });
    }
    
    entities[entityIndex] = {
        id,
        name,
        description,
        date
    };
    
    res.json(entities[entityIndex]);
});

// Удаление сущности
app.delete('/entities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entityIndex = entities.findIndex(e => e.id === id);
    
    if (entityIndex === -1) {
        return res.status(404).json({ error: 'Сущность не найдена' });
    }
    
    const deletedEntity = entities.splice(entityIndex, 1)[0];
    res.json(deletedEntity);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});