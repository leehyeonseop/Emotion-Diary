import React, { useEffect, useState } from 'react'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom'
import DiaryItem from './DiaryItem'

const sortOptionList = [
    { value : "latest", name : "최신순" },
    { value : "oldest", name : "오래된 순" }
]

const filterOptionList = [
    { value : "all", name : "모두 다"},
    { value : "good", name : "좋은 감정만"},
    { value : "bad", name : "안좋은 감정만"},
]

const ControlMenu = React.memo((props) => {

    const {value, onChange, optionList} = props

    // useEffect(() => {
    //     console.log("Control Menu")
    // })

    return (
        <select className='ControlMenu' value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((item,index) => {
                return (
                    <option key={index} value={item.value}>
                        {item.name}
                    </option>
                )
            })}
        </select>
    )
})

function DiaryList(props) {

    const {diaryList} = props
    const [sortType, setSortType] = useState("latest")
    const [filter, setFilter] = useState("all")

    const navigate = useNavigate()

    // sort를 하게되면 원본배열이 바뀌므로 복사를 하려고함 => JSON.parse(JSON.stringify(diaryList))
    const getProcessedDiaryList = () => {

        const filterCallback = (item) => {
            if(filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) >3
            }
        }

        const compare = (a,b) => {
            if(sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date)
            } else {
                return parseInt(a.date) - parseInt(b.date)
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filtereList = 
            filter === "all" ? copyList : copyList.filter((item) => filterCallback(item));
        const sortedList = filtereList.sort(compare);

        return sortedList
    }

    return (
        <div className='DiaryList'>

            <div className='menu_wrapper'>
                <div className='left_col'>
                <ControlMenu 
                    value={sortType}
                    onChange={setSortType}
                    optionList={sortOptionList}
                />
                <ControlMenu 
                    value={filter}
                    onChange={setFilter}
                    optionList={filterOptionList}
                />
                </div>
                <div className='right_col'>
                    <MyButton type={"positive"} text={"새 일기쓰기"} onClick={() => navigate("/new")}/>
                </div>
            </div>

            {getProcessedDiaryList().map((item) => {
                return (
                    <DiaryItem key={item.id} {...item} />
                )
            })}
        </div>
    )
}

// 다이어리 리스트가 혹시 정상적으로 넘어오지 않을 수 있으므로 디폴트 프롭스 지정
DiaryList.defaultProps = {
    diaryList : []
}

export default DiaryList