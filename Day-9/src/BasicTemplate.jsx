import React, { useReducer } from 'react'

const INCREMENT = 'increment'
const DECREMENT = 'decrement'

const InbuildFn = (state, action) => {

    switch (action.type) {
        case INCREMENT:
            return { value: state.value + 1 }

        case DECREMENT:
            return { value: state.value - 1 }

        default:
            return state;
    }

}

const Practice = () => {

    const [state, dispatch] = useReducer(InbuildFn, { value: 1 })

    const increment = () => {
        dispatch({ type: INCREMENT })
    }

    const decrement = () => {
        dispatch({ type: DECREMENT })
    }

    return (
        <div>
            <button onClick={increment}>Increment</button>
            <h1>{state.value}</h1>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

export default Practice