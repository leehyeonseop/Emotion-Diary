import { useParams } from "react-router-dom";

const Diary = () =>  {

    // useParams를 이용을 하면 전달받아 들어오는 path variable들을 모아서 객체로 갖다준다!
    const {id} = useParams();
    console.log(id)

    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기 상세 페이지입니다.</p>
        </div>
    )
}

export default Diary;