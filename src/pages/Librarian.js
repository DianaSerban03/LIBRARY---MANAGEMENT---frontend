import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(codISBN, title, autor, editura) {
    return { codISBN, title, autor, editura };
}


export default function Librarian() {
    const [books, setBooks] = useState([]);
    // const [rows, setRows] = useState(initialRows);
    const [rows, setRows] = useState(books);

    const [rentedBooks, setRentedBooks] = useState([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/books");
            const bookData = response.data.map((book) =>
                createData(book.codISBN, book.title, book.author, book.editura)
            );
            setRows(bookData);
            setBooks(bookData); // Actualizează și variabila 'books'
        } catch (error) {
            console.error("Error loading books:", error);
        }
    };


    //const handleRent = (codISBN) => {
    //    const book = books.find((book) => book.codISBN === codISBN);
    //    setBooks((prevBooks) => prevBooks.filter((book) => book.codISBN !== codISBN));
    //    setRentedBooks((prevBooks) => [...prevBooks, book]);
    //};

    const handleRent = async (codISBN) => {
        const book = rentedBooks.find((book) => book.codISBN === codISBN);
        setRentedBooks((prevBooks) => prevBooks.filter((book) => book.codISBN !== codISBN));

        try {
            await axios.delete(`http://localhost:8080/book/${codISBN}`);
            setBooks((prevBooks) => [...prevBooks, book]);
            loadBooks(); // Actualizează cărțile
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };


    return (
        <div style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="row">
                <h2 className="center" style={{ color: "black", fontWeight: "bold", fontSize: 100, textAlign: 'center' }}>WELCOME!</h2>
            </div>
            <div className="row">
                <h2 className="center" style={{ color: "black", fontWeight: "bold", fontSize: 25, textAlign: 'center' }}>BOOKS AVAILABLE</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TableContainer component={Paper} style={{ width: "1020px", marginBottom: '5px' }}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Cod ISBN</TableCell>
                                <TableCell style={{ fontWeight: "bold" }} align="right">Title</TableCell>
                                <TableCell style={{ fontWeight: "bold" }} align="right">Author</TableCell>
                                <TableCell style={{ fontWeight: "bold" }} align="right">Publishing house</TableCell>
                                <TableCell style={{ fontWeight: "bold" }} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.codISBN}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.codISBN}
                                    </TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.autor}</TableCell>
                                    <TableCell align="right">{row.editura}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={() => handleRent(row.codISBN)} style={{ color: 'black', fontSize: 10 }}>
                                            DELETE A BOOK
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>
            </div>
            <div style={{ color: 'black', fontSize: 30, display: 'center', left: '10%', position: 'absolute', top: '30%' }}>
                <Link
                    className="btn btn-outline-primary mx-2"
                    style={{ color: 'black', fontSize: 30 }}
                    to="/add"
                > MODIFY A BOOK
                </Link>
            </div>

        </div>
    );
}