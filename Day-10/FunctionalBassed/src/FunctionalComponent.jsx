import React, { useState } from 'react'

const FunctionalComponent = () => {

    const [state, setState] = useState(0)
    const [statetwo, setStatetwo] = useState(1)

    const handleClickState = () => {
        setState(evnent => evnent + 1)
        console.log("State One Function");
    }
    const handleClickStatetwo = () => {
        setStatetwo(evnent => evnent + 1)
        console.log("State One Function");
    }

    return (
        <>
            <h1>State one : {state}</h1>
            <button onClick={handleClickState} >Click</button>
            <h1>State two : {statetwo}</h1>
            <button onClick={handleClickStatetwo} >Click</button>
        </>
    )
}

export default FunctionalComponent