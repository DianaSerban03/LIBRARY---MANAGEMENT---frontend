import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Payment() {
    let navigate = useNavigate();

    const [pay, setPay] = useState({
        nrCard: "",
        numeCard: "",
        cvv: "",
        date: ""
    });

    const { nrCard,
        lastName,
        numeCard,
        cvv,
        date } = pay;

    const onInputChange = (e) => {
        setPay({ ...pay, [e.target.name]: e.target.value });
    };

    //const signUp = async (e) => {
    //    e.preventDefault();
    //    await axios.post("http://localhost:8080/user", user);
    //    navigate("/");
    //};
    const signUp = async (e) => {
        e.preventDefault();

        // Validare număr card
        if (!/^\d{16}$/.test(pay.nrCard)) {
            alert("Introduceți un număr de card valid!");
            return;
        }

        // Validare nume card
        if (!/^[A-Za-z ]+$/.test(pay.numeCard)) {
            alert("Introduceți un nume de card valid!");
            return;
        }

        // Validare dată expirare
        if (!/^([1-9]|0[1-9]|1[0-2])\/[0-9]{2}$/.test(pay.date)) {
            alert("Introduceți o dată de expirare validă!");
            return;
        }

        // Validare CVV
        if (!/^\d{3}$/.test(pay.cvv)) {
            alert("Introduceți un CVV valid!");
            return;
        }

        //await axios.post("http://localhost:8080/user", user);
        navigate("/");
    };

    const [paymentConfirmed, setPaymentConfirmed] = useState(false);


    return (
        <>
            <div style={{
                backgroundImage: `url("https://img.freepik.com/free-photo/cropped-view-person-making-online-payment_1262-2109.jpg?w=1480&t=st=1684945434~exp=1684946034~hmac=1614bf1c4f2c2f60e99dfce6f52fb2a29aedd06ebf2b4567bc62ec41f48582c2")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="container" style={{ display: 'left', top: '5%', position: "absolute", left: '35%' }}>
                    <div className="row">
                        <h2 className="left" style={{ color: "black", fontWeight: "bold", fontSize: 80, textAlign: 'left', top: "1000px" }}>Make a payment!</h2>
                    </div>
                    <form onSubmit={(e) => signUp(e)}>

                        <div className="mb-3" style={{ textAlign: 'center' }}>
                            <label htmlFor="nrCard" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                CARD NUMBER
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your card number"
                                name="nrCard"
                                value={nrCard}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }}
                            />
                        </div>


                        <div className="mb-3" style={{ textAlign: 'center' }}>
                            <label htmlFor="numeCard" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                CARD NAME
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your card name"
                                name="numeCard"
                                value={numeCard}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>
                        <div className="mb-3" style={{ textAlign: 'center' }}>
                            <label htmlFor="date" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                EXPIRATION DATE
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your expiration date(ex. 12/01"
                                name="date"
                                value={date}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>
                        <div className="mb-3" style={{ textAlign: 'center' }}>
                            <label htmlFor="cvv" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                CVV
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your CVV"
                                name="cvv"
                                value={cvv}
                                onChange={(e) => onInputChange(e)}
                                style={{ width: "500px", fontSize: 20 }} // Adjust the width value as needed
                            />
                        </div>
                        

                        <button type="signup" className="btn btn-outline-primary" style={{
                            float: 'center', color: 'black', marginBottom: '5px', display: 'block', marginTop: '10px', fontWeight: 'bold', width: '110px', height: '40px'
                        }}>
                            PAY!
                        </button>
                        <Link
                            className="btn btn-outline-primary mx-2" style={{ float: 'right' }}
                            to="/viewbooks">
                            Back to main page!
                        </Link>

                    </form>
                </div>
            </div>
        </>
    );
}