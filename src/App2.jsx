import React from 'react';

function Counter(){
    const [count,setCount]=React.useState(0);

    function handleClick(){
        setCount(count+1);
    }

    return (
        <button className="btn" onClick={handleClick}>Clicked {count} {(count===1)?"time":"times"}</button>
    );
}

function App(){
    return (
    <>
        <Counter />
        <Counter />
    </>
    );
}

export default App;