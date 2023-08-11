import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function Newssubscibe() {
    const [data,setData]=useState([])
    const [message, Setmessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState(null); // Changed to null to avoid default value being sent as string
    const [name, setName] = useState(' ');
    const [expandedIndex, setExpandedIndex] = useState(-1);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 30000);
        return () => clearTimeout(timer);
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('https://backend-ekms.onrender.com/subscription/get_post_social/', {
                name: name,
                email: email,
                whatsapp: whatsapp
            })
            .then(response => {
                console.log(response);
                if (name.trim() === '' || email.trim() === '') {
                    setError('Please fill in all fields.');
                    setShowModal(true);
                    return;
                }
                if (response.statusText === 'Created') {
                    console.log('Created Rajan');
                    Setmessage('You are Subscribed !!')
                    setShowModal(false);
                } else {
                    setShowModal(true);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            {data.map((item, index) => (
                <div key={index}>
                    {/* Render data from API */}
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Button onClick={() => setExpandedIndex(index)}>Read More</Button>

                    {/* Popup Card */}
                    <Modal show={expandedIndex === index} onHide={() => setExpandedIndex(-1)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{item.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{item.description}</p>
                            {/* Add more details from the API if needed */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setExpandedIndex(-1)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ))}

            {/* Popup for Subscription */}
            <Modal show={showModal} onHide={handleClose}  >
                <Modal.Header closeButton>

                    <Modal.Title >
                        <div className='d-flex justify-content-center'>
                            <img src="https://img.freepik.com/free-vector/envelope-concept-illustration_114360-1363.jpg?size=626&ext=jpg&ga=GA1.2.180599784.1691488875&semt=ais" alt="" style={{height:'100px',
                        marginLeft:'180px'
                        
                        }} />
                        </div>
                    </Modal.Title>


                </Modal.Header>
                <Modal.Body className='news-subcribe' style={{
                    backgroundImage: 'url("https://img.freepik.com/free-vector/gradient-ipl-cricket-illustration_23-2149205212.jpg?size=626&ext=jpg&ga=GA1.2.180599784.1691488875&semt=ais")',
                    backgroundSize: 'cover'
                }}> <p className='text-success'>{message}</p>

                    <Form onSubmit={handleSubmit}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>WhatsApp Mobile No.</Form.Label>
                            <Form.Control
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" className='my-3 btn btn-light w-100' style={{backgroundColor:'#311c60',color:'white'}}>Subscribe</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Newssubscibe;
