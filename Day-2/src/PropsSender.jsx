import React from 'react'
import { PropReciver } from './PropReciver'

export const PropsSender = () => {
    const Sending = {

        name: "Mohan",
        role: "Rich Person",
        age: "young"

    }
    return (
        <>

            <h1>PropSender</h1>
            <PropReciver Sending={Sending}></PropReciver>
        </>
    )
}
