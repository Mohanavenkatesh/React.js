import React from 'react'
import { useParams } from 'react-router-dom'

const About = () => {

    const { anything } = useParams()

    return (
        <div>About : {anything} </div>
    )
}

export default About