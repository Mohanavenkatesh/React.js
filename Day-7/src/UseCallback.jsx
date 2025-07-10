import React, { useState, useCallback } from 'react';

function UseCallback() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(0);

    const increment = useCallback(() => {
        setCount((c) => c + 1);
        console.log("UseCallback State")
    }, []);

    console.log("Normal State")
    return (
        <div>
            <h2>useCallback Example</h2>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment Count</button>
            <p>Other: {other}</p>
            <button onClick={() => setOther((o) => o + 1)}>Increment Other</button>
        </div>
    );
}

export default UseCallback;
