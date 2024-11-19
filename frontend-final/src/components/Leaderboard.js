import React, { useState, useEffect } from 'react';
import { Div, Text } from 'atomize';
import axiosInstance from '../axiosConfig';

const Leaderboard = () => {
    const [selectedProblem, setSelectedProblem] = useState(1);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <Div d="flex" flexDir="column" align="center" p="2rem">
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
    );
};

export default Leaderboard;
