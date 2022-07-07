import { useState } from "react";
import MyHeader from './../components/MyHeader'
import MyButton from './../components/MyButton'
import { useContext } from "react";
import { DiaryStateContext } from "../App";
import { useEffect } from "react";

const Home = () =>  {

    const diaryList = useContext(DiaryStateContext)

    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());

    // 월을 가져오는거는 1월이 0임
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    useEffect(() => {

        if(diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime()
    
            setData(diaryList.filter((item) => item.date >= firstDay && item.date <= lastDay))
            
        }


    },[diaryList,curDate])

    useEffect(() => {
        console.log(data)
    },[data])


    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
    }

    return (
        <div>
            <MyHeader 
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
                rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
            />
        </div>
    )
}

export default Home;