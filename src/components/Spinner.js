import React from 'react'

const Spinner = ({enable}) => {

    return enable ? <div className='spinner'>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
    </div> : null
}

export default Spinner