// src/components/UserProfileIcon.js
import React, { useState, useRef, useEffect } from 'react';
import { Div, Text, Button } from 'atomize';
import { useNavigate } from 'react-router-dom';

const UserProfileIcon = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload(); // Refresh to update navigation
    };

    return (
        <Div pos="relative" ref={dropdownRef}>
            <Div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                cursor="pointer"
                d="flex"
                align="center"
                justify="center"
                bg="gray200"
                rounded="circle"
                w="2.5rem"
                h="2.5rem"
                m={{ r: "0.5rem" }}
            >
                {/* User Icon */}
                <Text fontSize="1.2rem" textColor="gray800">👤</Text>
            </Div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <Div
                    pos="absolute"
                    right="0"
                    top="3rem"
                    bg="white"
                    shadow="4"
                    rounded="md"
                    p="0.5rem"
                    w="10rem"
                    zIndex="1000"
                >
                    <Button
                        onClick={() => {
                            navigate('/profile');
                            setIsDropdownOpen(false);
                        }}
                        bg="transparent"
                        hoverBg="gray200"
                        w="100%"
                        textColor="gray800"
                        p="0.5rem"
                        m={{ b: "0.5rem" }}
                    >
                        Profile
                    </Button>
                    <Button
                        onClick={handleSignOut}
                        bg="transparent"
                        hoverBg="gray200"
                        w="100%"
                        textColor="gray800"
                        p="0.5rem"
                    >
                        Sign Out
                    </Button>
                </Div>
            )}
        </Div>
    );
};

export default UserProfileIcon;
