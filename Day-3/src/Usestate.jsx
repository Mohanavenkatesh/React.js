import React from 'react'
import { useState } from 'react'

function UseStateExample () {
    const [num, setNum] = useState(1)

    const adding = () => {
        setNum(num+11)
    }
    return (
        <div>
            <h1>{num}</h1>
            <button onClick={adding}>Add</button>
        </div>
    )
}

export default UseStateExample;