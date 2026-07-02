import React from 'react';

function Counter({count,setCount}){
    function handleClick(){
        setCount(count+1);
    }
    return (
        <button className="btn" onClick={handleClick}>Clicked {count} {(count===1)?"time":"times"}</button>
    );
}

function Reset({count,setCount}){
    function handleClick(){
        setCount(0);
    }
    return (
        <button onClick={handleClick}>Reset</button>
    );
}

function App(){
    const [count,setCount]=React.useState(0);

    return (
    <>
        <Counter count={count} setCount={setCount}/>
        <Counter count={count} setCount={setCount}/>
        <Reset count={count} setCount={setCount}/>
    </>
    );
}

export default App;