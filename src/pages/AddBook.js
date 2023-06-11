import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddBook() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [book, setBook] = useState({
        codISBN: "",
        title: "",
        author: "",
        editura: ""
    });

    useEffect(() => {
        if (id) {
            // Încărcați datele cărții existente dacă este furnizat un ID în parametrii URL-ului
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/book/${id}`);
            const bookData = response.data;
            setBook(bookData);
        } catch (error) {
            console.error("Error loading book:", error);
        }
    };

    const onInputChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const { codISBN, title, author, editura } = book;

    const onSubmit = async (e) => {
        e.preventDefault();
        const isUpdate = e.target.name === "update";
        const url = isUpdate ? `http://localhost:8080/book/${id}` : "http://localhost:8080/book";
        const method = isUpdate ? "PUT" : "POST";

        try {
            const response = await axios({
                method: method,
                url: url,
                data: {
                    codISBN: codISBN,
                    title: title,
                    author: author,
                    editura: editura
                }
            });

            if (response.status === 200) {
                navigate("/librarian");
            } else {
                // Handle error case
            }
        } catch (error) {
            // Handle error case
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div
                    className="container"
                    style={{
                        display: "left",
                        top: "10%",
                        position: "absolute",
                        left: "30%",
                        fontSize: 25
                    }}
                >
                    <div className="row">
                        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                            <h2
                                className="text-center m-4"
                                style={{
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: 40,
                                    textAlign: "left",
                                    top: "1000px"
                                }}
                            >
                                {id ? "Update the book" : "Introduce the data of the book"}
                            </h2>

                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="mb-3" style={{ textAlign: "left" }}>
                                    <label
                                        htmlFor="codISBN"
                                        className="form-label"
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Cod ISBN
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Enter the ISBN code"
                                        name="codISBN"
                                        value={codISBN}
                                        onChange={(e) => onInputChange(e)}
                                        style={{ width: "500px", fontSize: 20 }}
                                    />
                                </div>
                                <div className="mb-3" style={{ textAlign: "left" }}>
                                    <label
                                        htmlFor="title"
                                        className="form-label"
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Title
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Enter the title"
                                        name="title"
                                        value={title}
                                        style={{ width: "500px", fontSize: 20 }}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3" style={{ textAlign: "left" }}>
                                    <label
                                        htmlFor="author"
                                        className="form-label"
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Author
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Enter the author"
                                        name="author"
                                        value={author}
                                        onChange={(e) => onInputChange(e)}
                                        style={{ width: "500px", fontSize: 20 }}
                                    />
                                </div>
                                <div className="mb-3" style={{ textAlign: "left" }}>
                                    <label
                                        htmlFor="editura"
                                        className="form-label"
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Publishing house
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Enter the publishing house"
                                        name="editura"
                                        value={editura}
                                        onChange={(e) => onInputChange(e)}
                                        style={{ width: "500px", fontSize: 20 }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    name={id ? "update" : "add"}
                                    className="btn btn-outline-primary"
                                    style={{
                                        float: "left",
                                        color: "black",
                                        marginBottom: "5px",
                                        display: "block",
                                        marginTop: "10px",
                                        fontWeight: "bold",
                                        width: "110px",
                                        height: "40px"
                                    }}
                                >
                                    {id ? "Update book" : "MODIFY"}
                                </button>
                                {id && (
                                    <Link
                                        to="/librarian"
                                        className="btn btn-outline-secondary"
                                        style={{
                                            float: "right",
                                            color: "black",
                                            display: "block",
                                            marginTop: "10px",
                                            fontWeight: "bold",
                                            width: "110px",
                                            height: "40px",
                                            marginRight: "70px"
                                        }}
                                    >
                                        Cancel
                                    </Link>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
