import React, { useEffect, useState } from 'react'

const UseEffect = () => {
    const [number, setNumber] = useState(0)

    const handleAdd = () => {
        setNumber(number + 1)
        console.log("Nan useState")
    }

    useEffect(() => {
        console.log("Nan useEffect")
        return () => {
            console.log("Memory Clean Paniten")
        }
    }, [number])

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={handleAdd}>Click</button>
        </div>
    )
}

export default UseEffect

/*
// Import React and necessary hooks from React library
// Define a functional component named UseEffect
// Create a state variable 'number' with initial value 0
// setNumber is the function to update this state
// Define a function that handles button click events
// Update the number state by adding 1 to current value
// Log message to console when button is clicked
// useEffect hook - runs side effects in functional components
// First parameter: function that contains the effect logic
// Second parameter: dependency array [number] - effect runs when 'number' changes
// This code runs every time the 'number' state changes
// Return a cleanup function - this runs before the next effect or when component unmounts
// Cleanup function - runs when component unmounts or before next effect
// This cleanup code runs before the next useEffect or when component is destroyed
// Dependency array - effect only runs when 'number' changes
// Return JSX to render the component
// Main container div
// Display the current number value
// Button that calls handleAdd function when clicked
// Export the component so it can be imported and used in other files
*/