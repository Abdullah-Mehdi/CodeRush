import React, { useState } from 'react';
import { Div, Text, Button, Anchor, Input, Icon } from 'atomize';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginSignup() {
    const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const handleSubmit = async () => {
        if (isLoginMode) {
            // Login API call
            try {
                const response = await axios.post('http://localhost:8080/auth/login', {
                    email,
                    password,
                });
                alert('Login successful!');
                localStorage.setItem('token', response.data.token); // Store token
                window.location.href = '/problem-library'; // Redirect
            } catch (error) {
                setErrorMessage('Login failed. Please check your credentials.');
                console.error(error);
            }
        } else {
            // Signup API call
            try {
                await axios.post('http://localhost:8080/auth/signup', {
                    username,
                    email,
                    password,
                });
                alert('Signup successful! Please login.');
                setIsLoginMode(true); // Switch to login mode
            } catch (error) {
                setErrorMessage('Signup failed. Please try again.');
                console.error(error);
            }
        }
    };

    return (
        <Div d="flex" flexDir="column" minH="100vh">
            {/* Header and Navigation */}
            <Div d="flex" justify="space-between" align="center" p="2rem" bg="white">
                {/* Logo */}
                <Text textSize="title" textColor="black" m={{ l: "1rem" }}>CodeRush</Text>

                {/* Navigation Links */}
                <Div d="flex">
                    <Link to="/" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Home</Link>
                    <Link to="/problem-library" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Problem Library</Link>
                    <Link to="/leaderboard" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Leaderboard
                    </Link>
                    <Link to="/login-signup" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Login or Signup</Link>
                </Div>
            </Div>

            {/* Main Content Section */}
            <Div d="flex" flexDir="column" align="center" p="3rem" flexGrow="1" m={{ b: "1rem" }}>
                {/* Title */}
                <Text tag="h1" textSize="display2" m={{ b: "1rem" }}>Login or Signup</Text>

                {/* Description */}
                <Text textSize="subheader" textAlign="center" m={{ b: "-2rem" }} maxW="30rem">
                    Access your account or create a new one to start coding and tracking your progress.
                </Text>
            </Div>

            {/* Form Section */}
            <Div d="flex" justify="center" align="center" m={{ b: "3rem" }}>
                <Div p="2rem" bg="white" shadow="4" rounded="lg" w={{ xs: "90%", sm: "20rem" }}>

                    {/* Title */}
                    <Text tag="h2" textSize="heading" textAlign="center" m={{ b: "1rem" }}>
                        {isLoginMode ? 'Login into your account' : 'Create a New Account'}
                    </Text>

                    {/* Error Message */}
                    {errorMessage && (
                        <Text textColor="danger700" textAlign="center" m={{ b: "1rem" }}>
                            {errorMessage}
                        </Text>
                    )}

                    {/* Switch between Login and Signup */}
                    <Text
                        textSize="body"
                        textAlign="center"
                        textColor="info700"
                        cursor="pointer"
                        m={{ b: "1.5rem" }}
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setErrorMessage(''); // Clear error message on toggle
                        }}
                    >
                        {isLoginMode ? 'Don’t have an account? Sign Up' : 'Already have an account? Log In'}
                    </Text>


                    {/* Signup-specific Input */}
                    {!isLoginMode && (
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                            m={{ b: "1rem" }}
                        />
                    )}

                    {/* Email Input */}
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        m={{ b: "1rem" }}
                    />

                    {/* Password Input */}
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        m={{ b: "1.5rem" }}
                    />

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        bg="info200"
                        hoverBg="info300"
                        textColor="info700"
                        w="100%"
                        rounded="circle"
                    >
                        {isLoginMode ? 'Login' : 'Signup'}
                    </Button>
                </Div>
            </Div>

            {/* Footer */}
            <Div bg="gray100" p="3rem" d="flex" justify="space-between" position="relative" bottom="0" left="0" right="0">
                <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Coderush</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Features</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Setup</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Development</Link>
                </Div>

                {/* Other footer sections */}
                <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Resources</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Learn Java</Link>
                </Div>

                <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>About</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Our Team</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Contact</Link>
                </Div>

                <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Extras</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Help</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Feedback</Link>
                </Div>
            </Div>

            <Div bg="gray100" d="flex" justify="center" p="1rem">
                <Text textSize="body" textColor="gray800">
                    Designed & Developed by Team 6
                </Text>
            </Div>
        </Div>
    );
}

export default LoginSignup;