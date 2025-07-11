import React, { createContext, useState } from 'react'
import ComponentOne from './ComponentOne'
export const ThemeContextHook = createContext();

const UseContextHook = () => {

    const [themeColor, setThemeColor] = useState("light")

 


    const toggleTheme = () => {

        setThemeColor((prev) => prev === "light" ? "dark" : "light")

    }



    return (
        <ThemeContextHook.Provider value={{themeColor}}>
            <div>
                <h1>Main Component</h1>
                <button onClick={toggleTheme}>Theme</button>
                <h1>This is another component</h1>
                <ComponentOne></ComponentOne>
            </div>
        </ThemeContextHook.Provider>

    )
}

export default UseContextHook