import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import React, { useEffect, useReducer, useRef } from 'react';

const reducer = (state, action) => {

  let newState = [];
  switch (action.type) {
    case "INIT" : {
      return action.data
    }
    case "CREATE": {
      newState = [action.data, ...state]
      break;
    }
    case "REMOVE" : {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case "EDIT" : {
      newState = state.map((item) => item.id === action.data.id ? {...action.data} : item)
      break;
    }
    default : 
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState))
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id : 1,
//     emotion : 1,
//     content : "오늘의 일기 1번",
//     date : 1657170861389
//   },
//   {
//     id : 2,
//     emotion : 2,
//     content : "오늘의 일기 2번",
//     date : 1657170861390
//   },
//   {
//     id : 3,
//     emotion : 1,
//     content : "오늘의 일기 3번",
//     date : 1657170861391
//   },
//   {
//     id : 4,
//     emotion : 4,
//     content : "오늘의 일기 4번",
//     date : 1657170861395
//   },
//   {
//     id : 5,
//     emotion : 5,
//     content : "오늘의 일기 5번",
//     date : 1657170861399
//   },
// ]

function App() {

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if(localData) {
      // 아이디는 가장 높은거에 +1을 해주면 되므로 애초에 내림차순으로 정렬해서 0번째 인덱스를 뽑으면 가장 높은 id 값이 된다.
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));

      if(diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1

        // console.log(diaryList);
        // console.log(dataId)
  
        dispatch({type : "INIT", data : diaryList})
      }


    }
  },[])


  const dataId = useRef(0)

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type : "CREATE", data : {
      id : dataId.current,
      date : new Date(date).getTime(),
      content,
      emotion
    }})
    dataId.current += 1;
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type : 'REMOVE', targetId})
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type : "EDIT",
      data : {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove
      }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/diary/:id' element={<Diary />} />
          </Routes>
        </div>
      </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;