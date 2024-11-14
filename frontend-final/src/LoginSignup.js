import React from 'react';
import { Div, Text, Button, Anchor, Input, Icon } from 'atomize';
import { Link } from 'react-router-dom';

function LoginSignup() {
    return (
        <Div d="flex" flexDir="column" minH="100vh">
            {/* Header and Navigation */}
            <Div
                d="flex"
                justify="space-between"
                align="center"
                p="2rem"
                bg="white"
            >
                {/* Logo */}
                <Text textSize="title" textColor="black" m={{ l: "1rem" }}>
                    CodeRush
                </Text>

                {/* Navigation Links */}
                <Div d="flex">
                    <Link to="/" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Home
                    </Link>
                    <Link to="/problem-library" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Problem Library
                    </Link>
                    {/*
                    <Link to="/practice-mode" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Practice Mode
                    </Link>
                    <Link to="/duel" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Duel
                    </Link>
                    */}
                    <Link to="/login-signup" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Login or Signup
                    </Link>
                </Div>
            </Div>

            {/* Main Content Section */}
            <Div d="flex" flexDir="column" align="center" p="3rem" flexGrow="1" m={{ b: "1rem" }}>
                {/* Title */}
                <Text tag="h1" textSize="display2" m={{ b: "1rem" }}>
                    Login or Signup
                </Text>

                {/* Description */}
                <Text textSize="subheader" textAlign="center" m={{ b: "0rem" }} maxW="30rem">
                    Access your account or create a new one to start coding and tracking your progress.
                </Text>
            </Div>

            {/* Login Form Section */}
            <Div d="flex" justify="center" align="center" m={{ b: "3rem" }}>
                <Div p="2rem" bg="white" shadow="4" rounded="lg" w={{ xs: "90%", sm: "20rem" }}>

                    {/* Title */}
                    <Text tag="h2" textSize="heading" textAlign="center" m={{ b: "1rem" }}>
                        Login into your account
                    </Text>

                    {/* Signup Link */}
                    <Text textSize="body" textAlign="center" textColor="gray600" m={{ b: "2rem" }}>
                        Don't have an account yet? <Anchor href="/signup" textColor="info700">Create New</Anchor>
                    </Text>

                    {/* Email Input */}
                    <Input
                        placeholder="johndoe@gmail.com"
                        suffix={
                            <Icon
                                name="Email"
                                color="gray700"
                                size="16px"
                                cursor="pointer"
                                pos="absolute"
                                top="50%"
                                right="1rem"
                                transform="translateY(-50%)"
                            />
                        }
                        m={{ b: "1rem" }}
                    />

                    {/* Password Input */}
                    <Input
                        placeholder="Password"
                        type="password"
                        suffix={
                            <Icon
                                name="Eye"
                                color="gray700"
                                size="16px"
                                cursor="pointer"
                                pos="absolute"
                                top="50%"
                                right="1rem"
                                transform="translateY(-50%)"
                            />
                        }
                        m={{ b: "1.5rem" }}
                    />

                    {/* Login Button */}
                    <Button
                        bg="info200"
                        hoverBg="info300"
                        textColor="info700"
                        w="100%"
                        rounded="circle"
                    >
                        Login
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