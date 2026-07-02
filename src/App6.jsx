import { useState } from 'react';

export default function App() {
    const [isOn,setIsOn]=useState(true);
    function handleClick(){
        setIsOn(!isOn);
    }
    return (
        <div className="p-5">
            <button className={`btn ${(isOn)?"btn-on":"btn-off"}`} onClick={handleClick}>
                {
                    (isOn) ?
                    "ON" : "OFF"
                }
            </button>
        </div>
    )
};