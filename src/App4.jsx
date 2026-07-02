import React from 'react';

function App() {
    const [textInput,setTextInput]=React.useState("");
    function handleChange(e){
        setTextInput(e.target.value);
    }

    function handleClickReset(){
        setTextInput("");
    }

    function handleClickExample(){
        setTextInput("Alice");
    }

    return (
    <>
        <input type="text" onChange={handleChange} value={textInput}/>
        <button className="btn" onClick={handleClickReset}>Reset</button>
        <button className="btn" onClick={handleClickExample}>Example</button>
        <p>Hello {textInput}</p>
    </>
    );
}

export default App;