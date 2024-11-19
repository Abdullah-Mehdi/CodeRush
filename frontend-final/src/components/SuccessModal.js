import React from 'react';
import { Div, Text, Button } from 'atomize';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Div
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      d="flex"
      justify="center"
      align="center"
      bg="rgba(0,0,0,0.5)"
      zIndex="1000"
      onClick={onClose}
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
          onClick={onClose}
          bg="info700"
          hoverBg="info800"
          w="100%"
        >
          Let's Start Coding!
        </Button>
      </Div>
    </Div>
  );
};

export default SuccessModal;
