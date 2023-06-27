import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

function ManualNewsGet() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [name, setName] = useState(' ');
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://65.1.75.185/subscription/get_post_social/', {
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

  useEffect(() => {
    getManualNews();
  }, []);

  const getManualNews = () => {
    axios
      .get('https://65.1.75.185/manual_news/get_post_social/')
      .then(function (response) {
        console.log(response.data);
        const newsData = response.data;
        const currentDate = new Date();
        const filteredNews = newsData.filter(
          newsItem =>
            new Date(newsItem.date).toDateString() ===
            currentDate.toDateString()
        );

        setData(filteredNews);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const isMoreThan20Words = (text) => {
    const words = text.split(' ');
    return words.length > 20;
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ');
    }
    return text;
  };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <>
      <div className='container-fluid py-3 d-flex justify-content-center align-items-center' id='AdminEmp'>
        <div className='container'>
          <div className='row'>
            {data.map((item, index) => {
              // Add the base URL before the image URLs
              const photoUrl = `https://65.1.75.185/${item.upload_photo}`;
              const videoUrl = `https://65.1.75.185/${item.upload_video}`;

              return (
                <div className='col-md-10 mb-3' key={index}>
                  <div className='card' id='AdminEmp'>
                    <div className='row g-0'>
                      <div className='col-md-4'>
                        <img
                          src={photoUrl}
                          className='img-fluid rounded-start'
                          alt='Card'
                        />
                      </div>
                      <div className='col-md-8'>
                        <div className='card-body'>
                          <h5 className='card-title' id='h1'>
                            {item.title}
                          </h5>
                          <p className='card-text' id='h1'>
                            {isMoreThan20Words(item.description) && expandedIndex !== index
                              ? truncateText(item.description, 20) + '...'
                              : item.description}
                          </p>
                          {isMoreThan20Words(item.description) && (
                            <button
                              className='btn btn-link'
                              onClick={() => toggleExpand(index)}
                            >
                              {expandedIndex === index ? 'Read Less' : 'Read More'}
                            </button>
                          )}
                          <p className='text-text' id='h1'>
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        className='my-5 my-5'
        id='modal'
      >
        <Modal.Header closeButton id='modal'>
          <Modal.Title>
            <h2 class='badge badge-pill  text-center' style={{ color: 'purple' }}>
              <i class='fa-regular fa-newspaper mx-2'></i>News Subscribe Now
            </h2>{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal'>
          <Form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label>WhatsApp Mobile No. </Form.Label>
              <Form.Control
                type='number'
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' className='my-3'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManualNewsGet;
