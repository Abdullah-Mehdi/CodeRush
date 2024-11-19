import React, { useState, useEffect } from 'react';
import { Div, Text, Anchor } from 'atomize';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import UserProfileIcon from '../components/UserProfileIcon';

const Leaderboard = () => {
    const [selectedProblem, setSelectedProblem] = useState(1);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')); // Add this for header

    const problems = [
        { id: 1, title: "Two Sum" },
        { id: 2, title: "Longest Common Prefix" },
        { id: 3, title: "Palindrome Number" },
        // ... add all problems
    ];

    useEffect(() => {
        fetchLeaderboardData();
    }, [selectedProblem]);

    const fetchLeaderboardData = async () => {
        try {
            const response = await axiosInstance.get(`/leaderboard/problem/${selectedProblem}`);
            setLeaderboardData(response.data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

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

            {/* Main Content */}
            <Div d="flex" flexDir="column" align="center" p="2rem" flexGrow="1">
                <Text tag="h1" textSize="display2" m={{ b: "1rem" }}>
                    Leaderboard
                </Text>

                {/* Problem Selector */}
                <select
                    onChange={(e) => setSelectedProblem(e.target.value)}
                    value={selectedProblem}
                    style={{
                        marginBottom: '2rem',
                        width: '300px',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                    }}
                >
                    {problems.map(problem => (
                        <option key={problem.id} value={problem.id}>
                            {problem.title}
                        </option>
                    ))}
                </select>

                {/* Leaderboard Table */}
                <Div w="100%" maxW="800px" shadow="4" rounded="lg" overflow="hidden">
                    <Div d="flex" justify="space-between" p="1rem" bg="gray200">
                        <Text w="10%" textWeight="700">Rank</Text>
                        <Text w="30%" textWeight="700">Username</Text>
                        <Text w="20%" textWeight="700">Time</Text>
                        <Text w="25%" textWeight="700">Date</Text>
                        <Text w="15%" textWeight="700">Score</Text>
                    </Div>

                    {leaderboardData.map((entry, index) => (
                        <Div
                            key={`${entry.username}-${entry.completedAt}`}
                            d="flex"
                            justify="space-between"
                            p="1rem"
                            bg={index % 2 === 0 ? "white" : "gray100"}
                        >
                            <Text w="10%">{index + 1}</Text>
                            <Text w="30%">{entry.username}</Text>
                            <Text w="20%">
                                {Math.floor(entry.timeInSeconds / 60)}:
                                {(entry.timeInSeconds % 60).toString().padStart(2, '0')}
                            </Text>
                            <Text w="25%">
                                {new Date(entry.completedAt).toLocaleDateString()}
                            </Text>
                            <Text w="15%">
                                {900 - entry.timeInSeconds}
                            </Text>
                        </Div>
                    ))}
                </Div>
            </Div>

            {/* Footer */}
            <Div bg="gray100" p="3rem" d="flex" justify="space-between">
                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Coderush</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Features</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Setup</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Development</Link>
                </Div>

                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Resources</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Learn Java</Link>
                </Div>

                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>About</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Our Team</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Contact</Link>
                </Div>

                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Extras</Text>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Help</Link>
                    <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Feedback</Link>
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

export default Leaderboard;
