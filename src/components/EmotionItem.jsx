import React from 'react'

function EmotionItem(props) {

    const {emotion_id, emotion_img, emotion_descript, onClick, isSelected} = props

    return (
        <div onClick={() => onClick(emotion_id)} className={['EmotionItem', isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(" ")}>
            <img src={emotion_img} />
            <span>{emotion_descript}</span>
        </div>
    )
}

export default React.memo(EmotionItem)
