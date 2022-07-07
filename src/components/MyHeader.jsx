import React from 'react'

function MyHeader(props) {

    const {headText, leftChild, rightChild} = props

    return (
        <header>
            <div className='head_btn_left'>{leftChild}</div>
            <div className='head_text'>{headText}</div>
            <div className='head_btn_right'>{rightChild}</div>
        </header>
    )
}

export default MyHeader