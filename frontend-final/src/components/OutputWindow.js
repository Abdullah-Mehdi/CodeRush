import React from 'react';
import { Div, Text } from 'atomize';

const OutputWindow = ({ output }) => {
  return (
    <Div p="1rem" bg="gray100" rounded="md" minH="200px" maxH="400px" overflowY="auto">
      <Text tag="pre" textSize="body" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {output || 'No output yet. Run your code to see the results.'}
      </Text>
    </Div>
  );
};

export default OutputWindow;

