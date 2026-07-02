import { useState } from 'react';

export default function App() {
    const [isShow,setIsShow]=useState(false);
    function handleClick(){
        setIsShow(!isShow);
    }
    return (
        <div className="p-5 flex gap-3">
            <input type={`${(isShow)?"text":"password"}`} placeholder="Enter password"/>
            <button className="btn" onClick={handleClick}>
                {
                    (isShow) ?
                    "Hide" : "Show"
                }
            </button>
        </div>
    )
};