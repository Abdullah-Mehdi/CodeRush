import React from 'react'; // Importing React library
import ProblemPage from './ProblemPage'; // Importing the reusable ProblemPage layout component

function Duel() {
    return (
        <ProblemPage isDuelMode={true} /> // Render ProblemPage with Duel mode enabled
    );
}

export default Duel; // Export Duel component as default
