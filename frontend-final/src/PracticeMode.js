import React from 'react'; // Importing React library
import ProblemPage from './ProblemPage'; // Importing the reusable ProblemPage layout component

function PracticeMode() {
    return (
        <ProblemPage isDuelMode={false} /> // Render ProblemPage with Practice mode enabled
    );
}

export default PracticeMode; // Export PracticeMode component as default
