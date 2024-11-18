import React from 'react';
import { Div, Text, Anchor } from 'atomize';
import { Link } from 'react-router-dom';
import UserProfileIcon from './components/UserProfileIcon';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Div d="flex" flexDir="column" minH="100vh">
            {/* Header and Navigation */}
            <Div d="flex" justify="space-between" align="center" p="2rem" bg="white">
                <Text textSize="title" textColor="black" m={{ l: "1rem" }}>CodeRush</Text>
                <Div d="flex" align="center">
                    <Link to="/" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Home</Link>
                    <Link to="/problem-library" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Problem Library</Link>
                    {user ? (
                        <UserProfileIcon />
                    ) : (
                        <Link to="/login-signup" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                            Login or Signup
                        </Link>
                    )}
                </Div>
            </Div>

            {/* Profile Content */}
            <Div d="flex" flexDir="column" align="center" p="3rem" flexGrow="1">
                <Text tag="h1" textSize="display2" m={{ b: "1rem" }}>
                    Profile
                </Text>
                
                <Div 
                    bg="white" 
                    shadow="4" 
                    rounded="lg" 
                    p="2rem" 
                    m={{ t: "2rem" }}
                    w={{ xs: "90%", md: "40rem" }}
                >
                    <Div d="flex" flexDir="column" align="start">
                        <Text 
                            textSize="title"
                            textWeight="600"
                            m={{ b: "0.5rem" }}
                        >
                            Username
                        </Text>
                        <Text 
                            textSize="paragraph"
                            textColor="gray800"
                            m={{ b: "2rem" }}
                        >
                            {user?.username || 'N/A'}
                        </Text>
                        
                        <Text 
                            textSize="title"
                            textWeight="600"
                            m={{ b: "0.5rem" }}
                        >
                            Email
                        </Text>
                        <Text 
                            textSize="paragraph"
                            textColor="gray800"
                        >
                            {user?.email || 'N/A'}
                        </Text>
                    </Div>
                </Div>
            </Div>

            {/* Footer */}
            <Div bg="gray100" p="3rem" d="flex" justify="space-between">
                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Coderush</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Features</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Setup</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Development</Anchor>
                </Div>

                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Resources</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Learn Java</Anchor>
                </Div>

                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>About</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Our Team</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Contact</Anchor>
                </Div>

                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Extras</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Help</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Feedback</Anchor>
                </Div>
            </Div>

            {/* Footer Bottom */}
            <Div bg="gray100" d="flex" justify="center" p="1rem">
                <Text textSize="body" textColor="gray800">
                    Designed & Developed by Team 6
                </Text>
            </Div>
        </Div>
    );
};

export default Profile;

