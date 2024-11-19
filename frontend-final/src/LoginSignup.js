import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Div, Text, Button, Input } from 'atomize';
import axiosInstance from './axiosConfig';
import SuccessModal from './components/SuccessModal';
import UserProfileIcon from './components/UserProfileIcon'; // Importing UserProfileIcon component

function LoginSignup() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setErrorMessage('');

        if (!validateForm()) {
            return; // Stop execution if validation fails
        }
            
            if (isLoginMode) {
                // Login
                const response = await axiosInstance.post('/auth/login', {
                    email,
                    password
                });
                
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setIsModalOpen(true); // Open the success modal
                    // Navigation will happen after modal is closed
                }
            } else {
                // Signup
                const response = await axiosInstance.post('/auth/signup', {
                    username,
                    email,
                    password
                });
                
                if (response.data) {
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setIsLoginMode(true);
                    setErrorMessage('Signup successful! Please login.');
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            setErrorMessage(
                error.response?.data?.message || 
                error.response?.data || 
                (isLoginMode ? 'Login failed. Please check your credentials.' : 'Signup failed. Please try again.')
            );
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/problem-library'); // Navigate after modal is closed
    };
    

    // Form validation
    const validateForm = () => {
        if (!email || !password || (!isLoginMode && !username)) {
            setErrorMessage('Please fill in all fields');
            return false;
        }
        if (!email.includes('@')) {
            setErrorMessage('Please enter a valid email');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return false;
        }
        return true;
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
                    <Link to="/leaderboard" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Leaderboard</Link>
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
                        <Text 
                            textSize="body" 
                            textColor={errorMessage.includes('successful') ? "success700" : "danger700"}
                            m={{ t: "1rem" }}
                            textAlign="center"
                        >
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

                {/* Success Modal */}
                <Div
                pos="fixed"
                top="0"
                left="0"
                right="0"
                bottom="0"
                d={isModalOpen ? "flex" : "none"}
                justify="center"
                align="center"
                bg="rgba(0,0,0,0.5)"
                zIndex="1000"
                onClick={handleModalClose}
            >
                <Div
                    bg="white"
                    p="2rem"
                    rounded="lg"
                    shadow="4"
                    maxW="400px"
                    onClick={e => e.stopPropagation()}
                >
                    <Text
                        tag="h2"
                        textSize="title"
                        m={{ b: "1rem" }}
                        textColor="success700"
                    >
                        Login Successful!
                    </Text>
                    <Text
                        textSize="paragraph"
                        m={{ b: "1.5rem" }}
                        textColor="gray800"
                    >
                        Welcome! You can now start coding and solving problems.
                    </Text>
                    <Button
                        onClick={handleModalClose}
                        bg="info700"
                        hoverBg="info800"
                        w="100%"
                        textColor="white"
                    >
                        Let's Start Coding!
                    </Button>
                </Div>
            </Div>
        </Div>
    );
}

export default LoginSignup;