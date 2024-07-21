import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button className='bg-[#FEBD69] p-3 rounded-md w-full'>{props.name}</button>
        </div>
    )
}

export default Button
