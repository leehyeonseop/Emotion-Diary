const MyButton = (props) => {

    const {type, text, onClick} = props

    // 이상한 타입으로 와도 default로 유지 시킬 수 있음
    const btnType = ['positive','negative'].includes(type) ? type : 'default';


    return (
        // 이런식으로 작성을 해준다면 className은 MyButton MyButton_타입
        <button className={["MyButton",`MyButton_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    )
}

MyButton.defaultProps = {
    type : 'default'
}

export default MyButton;