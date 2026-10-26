const express = require('express');

const app = express();
const port = 3000;

//parse the JSON request bodies
app.use(express.json());

//in memory array for books
let books = [
    {   id: 1, title: "The Hobbit", 
        author: "J.R.R. Tolkien", year: 1937,
        genre: "Fantasy", available: true
    },
    {   id: 2, title: "1984", author: "George Orwell", year: 1949,
        genre: "Dystopian", available: true
    },
    {   id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960,
        genre: "Fiction", available: true
    },
    {   id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813,
        genre: "Romance", available: true
    },
    {   id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925,
        genre: "Fiction", available: true
    }, 
    {   id: 6, title: "Moby Dick", author: "Herman Melville", year: 1851,
        genre: "Adventure", available: true
    },
    {   id: 7, title: "War and Peace", author: "Leo Tolstoy", year: 1869,
        genre: "Historical Fiction", available: true
    },
    {   id: 8, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951,
        genre: "Fiction", available: true
    },
    {   id: 9, title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954,
        genre: "Fantasy", available: true
    },
    {   id: 10, title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950,
        genre: "Fantasy", available: true
    }   
];

let nextId = 11;

//validate book data
function validateBook(body) {
    const { title, author, year, genre } = body;
    if(typeof title !== 'string' || !title.trim()) return "title is requied";
    if(typeof author !== 'string' || !author.trim()) return "author is requied";
    if(!Number.isInteger(year)) return "year must be a positive number";
    if(typeof genre !== 'string' || !genre.trim()) return "genre is requied";
    return null;
}

//routes 
//GET /books - get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

//GET /books/:id - get a book by id
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find((b) => b.id === id);
    if(!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
});

//create a book
//POST /books - create a new book
app.post('/books', (req, res) => {
    const error = validateBook(req.body);
    if(error) {
        return res.status(400).json({ error });
    }
    const {title, author, year, genre, available = true} = req.body;
    const newBook = { id: nextId++, title, author, year, genre, available };
    books.push(newBook);
    res.status(201).json(newBook);
});

//put 
//PUT /books/:id - update a book by id
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex((b) => b.id === id);
    if(bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }
    const error = validateBook(req.body);
    if(error) {
        return res.status(400).json({ error });
    }
    const {title, author, year, genre, available = true} = req.body;
    const updatedBook = { id, title, author, year, genre, available };
    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
});

//delete
//DELETE /books/:id - delete a book by id

//start our server
app.listen(port, () => {
    console.log(`Library API is running on http://localhost:${port}`);
});