import React, { useEffect, useState } from 'react';
import { Div, Text } from 'atomize'; // Importing Atomize components
import { Link } from 'react-router-dom'; // Importing Link for navigation
import axios from 'axios'; // For API calls

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch leaderboard data on component mount
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/leaderboard?top=10'); // Backend endpoint
                setLeaderboard(response.data);
            } catch (err) {
                setError('Failed to load leaderboard. Please try again.');
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <Div d="flex" flexDir="column" minH="100vh">

            {/* Header and Navigation Section */}
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
                    <Link to="/leaderboard" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Leaderboard
                    </Link>
                    <Link to="/login-signup" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
                        Login or Signup
                    </Link>
                </Div>
            </Div>

            {/* Leaderboard Section */}
            <Div p="2rem" flexGrow="1" >
                <Text textSize="heading" m={{ b: "1.5rem" }} textAlign="center">
                    Leaderboard
                </Text>

                {error && (
                    <Text textSize="subheader" textColor="danger700" textAlign="center" m={{ b: "1rem" }}>
                        {error}
                    </Text>
                )}

                <Div p="1rem" bg="white" rounded="md" shadow="2">
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Rank</th>
                                <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Username</th>
                                <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.length > 0 ? (
                                leaderboard.map((user, index) => (
                                    <tr key={index}>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{index + 1}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{user.username}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{user.totalscore}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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

export default Leaderboard;

