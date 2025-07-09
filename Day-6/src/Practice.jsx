import React, { useState, useEffect, useRef } from 'react'

function Practice() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    const [isVisible, setIsVisible] = useState(true)
    const inputRef = useRef(null)
    const countRef = useRef(0)

    // useEffect to update document title when count changes
    useEffect(() => {
        document.title = `Count: ${count}`
    }, [count])

    // useEffect to focus input when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleIncrement = () => {
        setCount(prev => prev + 1)
        countRef.current += 1
    }

    const handleReset = () => {
        setCount(0)
        countRef.current = 0
    }

    return (
        <div style={{
            padding: '20px',
            border: '2px solid #007bff',
            borderRadius: '10px',
            margin: '20px',
            backgroundColor: '#f8f9fa'
        }}>
            <h2>React Hooks Practice</h2>

            {isVisible && (
                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <h3>useState Example</h3>
                        <p>Count: {count}</p>
                        <button onClick={handleIncrement} style={{ marginRight: '10px' }}>
                            Increment
                        </button>
                        <button onClick={handleReset}>
                            Reset
                        </button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3>useRef Example</h3>
                        <p>Ref Count: {countRef.current}</p>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="This input is focused automatically"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: '5px', marginRight: '10px' }}
                        />
                        <p>You typed: {name}</p>
                    </div>

                    <div>
                        <h3>useEffect Example</h3>
                        <p>Check the browser tab title - it updates with the count!</p>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsVisible(!isVisible)}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: isVisible ? '#dc3545' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                {isVisible ? 'Hide Content' : 'Show Content'}
            </button>
        </div>
    )
}

export default Practice
