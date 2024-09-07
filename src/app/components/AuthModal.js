'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { ArrowLeft, Envelope, EyeSlashFill, TicketPerforated } from 'react-bootstrap-icons';
import Image from 'react-bootstrap/Image';

export default function AuthModal({ show, onHide }) {
  const [authMode, setAuthMode] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    const response = await fetch('https://movieapp-back-pcy3.onrender.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, lastname, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setAuthMode('login'); 
      resetForm(); 
    } else {
      setErrorMessage(data.message || 'Registration failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    const response = await fetch('https://movieapp-back-pcy3.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push('/'); 
      onHide(); 
      resetForm(); 
    } else {
      const data = await response.json();
      setErrorMessage(data.message || 'Invalid email or password.');
    }
  };

  const resetForm = () => {
    setName('');
    setLastname('');
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <Modal show={show} onHide={() => { onHide(); resetForm(); }} size="xl" centered>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row>
            <Col xs={12} md={7} className="bg-transparent p-4">
              <Button variant="link" className="text-white mb-4" onClick={() => { onHide(); resetForm(); }}>
                <ArrowLeft /> Back
              </Button>
              <div className="text-center mb-4">
                <Button
                  variant={authMode === 'signup' ? 'warning' : 'dark'}
                  className="me-2"
                  onClick={() => {
                    setAuthMode('signup');
                    resetForm(); 
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  variant={authMode === 'login' ? 'warning' : 'dark'}
                  onClick={() => {
                    setAuthMode('login');
                    resetForm(); 
                  }}
                >
                  Log In
                </Button>
              </div>
              {errorMessage && (
                <Alert variant="danger" className="text-center">
                  {errorMessage}
                </Alert>
              )}
              {authMode === 'signup' ? (
                <>
                  <Form onSubmit={handleSignup}>
                    <Form.Group className="mb-4" controlId="formBasicName">
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicLastname">
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <EyeSlashFill
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      />
                    </Form.Group>
                    <Button variant="warning" type="submit" className="w-100">
                      <TicketPerforated className="me-2" />
                      Continue
                    </Button>
                  </Form>
                  <p className="text-white text-center mt-3">
                    For any questions, reach out to support@Quickbetdmovies.com
                  </p>
                </>
              ) : (
                <>
                  <h4 className="text-white text-center mb-4">We love having you back</h4>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <EyeSlashFill
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      />
                    </Form.Group>
                    <Button variant="warning" type="submit" className="w-100">
                      <TicketPerforated className="me-2" />
                      Continue
                    </Button>
                  </Form>
                  <p className="text-white text-center mt-3">
                    For any questions, reach out to support@Quickbetdmovies.com
                  </p>
                </>
              )}
            </Col>
            <Col xs={12} md={5} className="bg-dark p-4">
              <h2 className="text-white">
                {authMode === 'signup'
                  ? 'Welcome to Quickbet Movies!'
                  : 'Welcome back to Quickbet Movies!'}
              </h2>
              <p className="text-white">
                {authMode === 'signup'
                  ? '🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us'
                  : '🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin'}
              </p>
              <Image
                src={authMode === 'signup' ? '/images/02.png' : '/images/03.png'}
                alt="Movie illustration"
                className="img-fluid mt-3"
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
