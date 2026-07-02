import React, {useState, useRef} from 'react';

function Counter({count,setCount,counterRef}){
    function handleClick(){
        setCount(count+1);
    }

    return (
        <button className="btn btn-primary" onClick={handleClick} ref={counterRef}>Clicked {count} {(count===1)?"time":"times"}</button>
    );
}

function Reset({count,setCount}){
    function handleClick(){
        setCount(0);
    }
    return (
        <button className="btn btn-primary" onClick={handleClick}>Reset</button>
    );
}

function Autoclick({counterRef}){
    const [intervalId,setIntervalId]=useState(null);
    function handleClick(){
        let newId;
        if(intervalId===null){
            newId=setInterval(()=>{
                counterRef.current.click();
            },1000);
        }else {
            clearInterval(intervalId);
            newId=null;
        }
        setIntervalId(newId);
    }
    return (
        <button className="btn btn-primary" onClick={handleClick}>
            {(intervalId)?
                "Stop Autoclick":
                "Autoclick"
            }
        </button>
    );
}


function App(){
    const [count,setCount]=React.useState(0);
    const counterRef=useRef(null);
    return (
    <div className="flex h-dvh items-center justify-center gap-3">
        <Counter count={count} setCount={setCount} counterRef={counterRef}/>
        <Reset count={count} setCount={setCount}/>
        <Autoclick counterRef={counterRef}/>
    </div>
    );
}

export default App;