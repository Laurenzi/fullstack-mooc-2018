import React from 'react'

const Message = ({message}) => {
    if (message == null || message == '') return null
    return (
        <div className="message">
            {message}
        </div>
    )
}

export default Message