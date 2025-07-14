import React, { useLayoutEffect, useState } from 'react'

const UseLayoutEffect = () => {

    const [state, setState] = useState(1000)

    console.log("Normal State Render");

    useLayoutEffect(() => { console.log("UseLayoutEffect Running State"); }, [state])

    return (
        <>

            <h1>Use LayoutEffectHook</h1>
            <h1>{state}</h1>
            <button type="submit" onClick={() => setState(event => event + 1)}>Click</button>
        </>
    )
}

export default UseLayoutEffect