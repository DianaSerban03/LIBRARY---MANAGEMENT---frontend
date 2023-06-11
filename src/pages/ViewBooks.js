import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(codISBN, title, author, editura) {
    return { codISBN, title, author, editura };
}

export default function ViewBooks() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username') || location.pathname.split('/')[2];

    const [books, setBooks] = useState([]);
    const [rows, setRows] = useState([]);
    const [rentedBooks, setRentedBooks] = useState([]);

    useEffect(() => {
        loadBooks();
        loadRentedBooks();
        console.log(username);
    }, []);

    const loadBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/books");
            const bookData = response.data.map((book) =>
                createData(book.codISBN, book.title, book.author, book.editura)
            );
            setRows(bookData);
        } catch (error) {
            console.error("Error loading books:", error);
        }
    };

    const loadRentedBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/rentedbooks/${username}`);
            const rentedBookData = response.data.map((book) =>
                createData(book.codISBN, book.title, book.author, book.editura)
            );
            setRentedBooks(rentedBookData);
        } catch (error) {
            console.error("Error loading rented books:", error);
        }
    };



    const handleRent = async (codISBN) => {
        try {
            const book = rows.find((row) => row.codISBN === codISBN);

            // Adaugă cartea în lista de cărți împrumutate
            await axios.post(`http://localhost:8080/addbook/${username}`, book);

            // Șterge cartea din lista de cărți disponibile
           // await axios.delete(`http://localhost:8080/deletebook/${codISBN}/${username}`);
            await axios.delete(`http://localhost:8080/book/${codISBN}`);

            setRows((prevRows) => prevRows.filter((row) => row.codISBN !== codISBN));
            setRentedBooks((prevBooks) => [...prevBooks, book]);
        } catch (error) {
            console.error("Error renting book:", error);
        }
    };



    const handleReturn = async (codISBN) => {
        try {
            const book = rentedBooks.find((book) => book.codISBN === codISBN);
            await axios.post("http://localhost:8080/book", book);
            await axios.delete(`http://localhost:8080/deletebook/${codISBN}/${username}`);
            setRentedBooks((prevBooks) =>
                prevBooks.filter((book) => book.codISBN !== codISBN)
            );
            setRows((prevRows) => [...prevRows, book]);
        } catch (error) {
            console.error("Error returning book:", error);
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
                <h2 className="center" style={{ color: "black", fontWeight: "bold", fontSize: 100, textAlign: 'center' }}>WELCOME, {username}!</h2>
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
                                    <TableCell align="right">{row.author}</TableCell>
                                    <TableCell align="right">{row.editura}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={() => handleRent(row.codISBN)}>
                                            RENT
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="row">
                <h2 className="center" style={{ color: "black", fontWeight: "bold", fontSize: 25, textAlign: 'center', marginBottom: '5px' }}>RENTED BOOKS</h2>
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
                            {rentedBooks.map((book) => (
                                <TableRow
                                    key={book.codISBN}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {book.codISBN}
                                    </TableCell>
                                    <TableCell align="right">{book.title}</TableCell>
                                    <TableCell align="right">{book.author}</TableCell>
                                    <TableCell align="right">{book.editura}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={() => handleReturn(book.codISBN)}>
                                            RETURN
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                <Link
                    className="btn btn-outline-primary mx-2"
                    style={{ color: 'black', marginBottom: '1px', display: 'block', marginTop: '20px', fontWeight: 'bold', width: '300px', height: '40px', fontSize: 30 }}
                    to="/pay"
                > Make a payment
                </Link>
            </div>
        </div>
    );
}

