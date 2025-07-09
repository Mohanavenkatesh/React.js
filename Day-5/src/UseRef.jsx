import React, { useRef, useState, useEffect } from 'react'

/**
 * 🎯 useRef Hook Tutorial - Production Level Learning
 * 
 * What is useRef?
 * - useRef is a React Hook that returns a mutable object with a .current property
 * - It persists between re-renders but doesn't trigger re-renders when changed
 * - Perfect for storing values that don't affect the UI directly
 * 
 * When to use useRef?
 * 1. Direct DOM manipulation (focus, scroll, measurements)
 * 2. Storing previous values
 * 3. Storing timer IDs, intervals
 * 4. Storing any mutable value that shouldn't trigger re-renders
 */

// Level 1: DOM Manipulation Component
const DomManipulation = () => {
    const inputRef = useRef(null)
    const buttonRef = useRef(null)
    const divRef = useRef(null)

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
        transition: 'all 0.3s ease'
    }

    // Input focus/blur/select
    const focusInput = () => {
        // This line focuses the input element referenced by inputRef, if it exists.
        inputRef.current?.focus()
        console.log('Input focused')
    }
    const blurInput = () => {
        inputRef.current?.blur()
        console.log('Input blurred')
    }
    const selectInput = () => {
        inputRef.current?.select()
        console.log('Input text selected')
    }

    // Button manipulation
    const changeButtonText = () => {
        if (buttonRef.current) {
            buttonRef.current.textContent = 'Button Clicked!'
            buttonRef.current.style.backgroundColor = '#ff6b6b'
            console.log('Button text and style changed')
        }
    }
    const resetButton = () => {
        if (buttonRef.current) {
            buttonRef.current.textContent = 'Click Me'
            buttonRef.current.style.backgroundColor = '#007bff'
            console.log('Button reset')
        }
    }

    // Div style manipulation
    const changeDivStyle = () => {
        if (divRef.current) {
            divRef.current.style.backgroundColor = '#51cf66'
            divRef.current.style.color = 'white'
            divRef.current.style.padding = '20px'
            divRef.current.style.borderRadius = '10px'
            console.log('Div style changed')
        }
    }
    const resetDiv = () => {
        if (divRef.current) {
            divRef.current.style.backgroundColor = '#f8f9fa'
            divRef.current.style.color = '#212529'
            divRef.current.style.padding = '10px'
            divRef.current.style.borderRadius = '5px'
            console.log('Div style reset')
        }
    }

    return (
        <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #007bff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#007bff', marginBottom: '20px' }}>
                📝 1. DOM Element Manipulation
            </h2>
            {/* Input Focus Control */}
            <div style={{ marginBottom: '20px' }}>
                <h3>🎯 Input Focus Control:</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type something here..."
                    style={{
                        padding: '10px',
                        marginRight: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '250px',
                        fontSize: '16px'
                    }}
                />
                <button
                    onClick={focusInput}
                    style={{ ...buttonStyle, backgroundColor: '#007bff', color: 'white' }}
                >
                    🎯 Focus Input
                </button>
                <button
                    onClick={blurInput}
                    style={{ ...buttonStyle, backgroundColor: '#6c757d', color: 'white' }}
                >
                    🔍 Blur Input
                </button>
                <button
                    onClick={selectInput}
                    style={{ ...buttonStyle, backgroundColor: '#28a745', color: 'white' }}
                >
                    📋 Select Text
                </button>
            </div>
            {/* Button Manipulation */}
            <div style={{ marginBottom: '20px' }}>
                <h3>🔘 Button Manipulation:</h3>
                <button
                    ref={buttonRef}
                    onClick={changeButtonText}
                    style={{
                        ...buttonStyle,
                        backgroundColor: '#007bff',
                        color: 'white'
                    }}
                >
                    Click Me
                </button>
                <button
                    onClick={resetButton}
                    style={{ ...buttonStyle, backgroundColor: '#6c757d', color: 'white' }}
                >
                    🔄 Reset Button
                </button>
            </div>
            {/* Div Style Manipulation */}
            <div>
                <h3>🎨 Div Style Manipulation:</h3>
                <div
                    ref={divRef}
                    style={{
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '5px',
                        marginBottom: '10px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    This div's style can be changed using useRef!
                </div>
                <button
                    onClick={changeDivStyle}
                    style={{ ...buttonStyle, backgroundColor: '#28a745', color: 'white' }}
                >
                    🎨 Change Style
                </button>
                <button
                    onClick={resetDiv}
                    style={{ ...buttonStyle, backgroundColor: '#6c757d', color: 'white' }}
                >
                    🔄 Reset Style
                </button>
            </div>
        </div>
    )
}

// Level 2: Previous Value Counter Component
const PreviousValueCounter = () => {
    const [count, setCount] = useState(0)
    const prevCountRef = useRef()

    useEffect(() => {
        prevCountRef.current = count
        console.log('Previous count updated:', prevCountRef.current)
    }, [count])

    return (
        <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #28a745', borderRadius: '10px' }}>
            <h2 style={{ color: '#28a745' }}>2. Storing Previous Values</h2>
            <p><strong>Current Count:</strong> {count}</p>
            <p><strong>Previous Count:</strong> {prevCountRef.current}</p>
            <button
                onClick={() => setCount(count + 1)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
            >
                Increment Count
            </button>
            <button
                onClick={() => setCount(count - 1)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px'
                }}
            >
                Decrement Count
            </button>
        </div>
    )
}

// Level 3: Timer Management Component
const TimerManagement = () => {
    const [timer, setTimer] = useState(0)
    const intervalRef = useRef(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                console.log('Timer cleaned up')
            }
        }
    }, [])

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            console.log('Timer stopped')
        }
    }

    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
            console.log('Timer started')
        }
    }

    return (
        <div style={{ marginBottom: '40px', padding: '20px', border: '2px solid #ffc107', borderRadius: '10px' }}>
            <h2 style={{ color: '#ffc107' }}>3. Timer Management</h2>
            <p><strong>Timer:</strong> {timer} seconds</p>
            <button
                onClick={stopTimer}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
            >
                Stop Timer
            </button>
            <button
                onClick={startTimer}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px'
                }}
            >
                Start Timer
            </button>
        </div>
    )
}

// Level 4: Explanation Component
const UseRefExplanation = () => (
    <div style={{ padding: '20px', backgroundColor: '#e9ecef', borderRadius: '10px' }}>
        <h2 style={{ color: '#495057' }}>How useRef Works:</h2>
        <ul style={{ lineHeight: '1.6' }}>
            <li><strong>DOM Access:</strong> useRef allows direct access to DOM elements without re-rendering</li>
            <li><strong>Mutable Values:</strong> Can store values that persist between renders without causing re-renders</li>
            <li><strong>Previous Values:</strong> Useful for tracking previous state values</li>
            <li><strong>Timers/Intervals:</strong> Perfect for storing timer IDs and managing cleanup</li>
            <li><strong>Focus Management:</strong> Great for programmatically controlling focus on form elements</li>
        </ul>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px' }}>
            <h4>Key Points:</h4>
            <ul>
                <li>useRef returns a mutable object with a <code>.current</code> property</li>
                <li>Changes to <code>.current</code> don't trigger re-renders</li>
                <li>Perfect for values that need to persist but don't affect the UI</li>
                <li>Common use cases: DOM manipulation, timers, previous values</li>
            </ul>
        </div>
    </div>
)

// Main UseRef Component
const UseRef = () => {
    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    }

    return (
        <div style={containerStyle}>
            {/* 🎯 Header Section */}
            <h1 style={{
                color: '#007bff',
                textAlign: 'center',
                marginBottom: '30px',
                fontSize: '2.5rem',
                fontWeight: 'bold'
            }}>
                🎯 useRef Hook Tutorial
            </h1>
            <DomManipulation />
            <PreviousValueCounter />
            <TimerManagement />
            <UseRefExplanation />
        </div>
    )
}

export default UseRef
