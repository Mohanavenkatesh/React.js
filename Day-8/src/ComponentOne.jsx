import React, { useContext } from 'react'
import ComponentTwo from './ComponentTwo'
import { ThemeContextHook } from './UseContextHook';

const ComponentOne = () => {

    const  {themeColor} = useContext(ThemeContextHook);

    const themeStyle = {

        backgroundColor: themeColor === "light" ? "white" : "black",
        color: themeColor === "light" ? "black" : "white"

    }
    return (
        <div>
            <h1 style={themeStyle}>Component one</h1>
            <h1>This is another component</h1>
            <ComponentTwo></ComponentTwo>
        </div>
    )
}

export default ComponentOne