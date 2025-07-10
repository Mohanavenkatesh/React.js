import React, { useCallback, useState } from 'react'

const Practice = () => {


    const [stateone, setStateone] = useState(0);
    const [statetwo, setStatetwo] = useState(0)

    const useCallbackFN = useCallback(() => {
        setStatetwo(statetwo + 1)
        console.log("From State two");
    })

    console.log("From State one");

    return (
        <>
            <div>
                <h1>{stateone}</h1>
                <button onClick={() => setStateone(stateone + 1)}>Click</button>
                <h1>{statetwo}</h1>
                <button onClick={useCallbackFN}>Click</button>
            </div>
        </>
    )
}

export default Practice