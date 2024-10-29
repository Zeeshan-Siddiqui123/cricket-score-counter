import React, { useEffect, useState } from 'react'
import { Select, Button } from 'antd';

const { Option } = Select;

const Counter = () => {
    const [count, setCount] = useState(0)
    const [out, setOut] = useState(0)
    const [over, setOver] = useState(1)
    const [balls, setBalls] = useState(6)

    const handleSelectChange = (value) => {
        setOver(value);
        setBalls(value * 6);
    };
    const updateCountAndBalls = (runs) => {
        setCount(prevCount => prevCount + runs);
        if (balls > 0) {
            setBalls(prevBalls => prevBalls - 1);
        }
        if (balls===6){
            alert("over Completed")
        }
    };
    const Out = () => {
        if (out < 10) {
            setOut(out + 1)
        }
        if (balls > 0) {
            setBalls(prevBalls => prevBalls - 1);
        }
    }
    useEffect(() => {
        if (out === 10) {
            alert(`Team All Out and your Score is ${count}`);
        }
    }, [out, count]);
    return (
        <div className='flex items-center gap-2 flex-col'>
            <span className='bg-slate-900 text-white w-[100px] p-2 rounded-md'>{count}/{out}</span>
            <div className='flex items-center gap-2 flex-row w-[500px] flex-wrap justify-center'>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400' 
                onClick={() => updateCountAndBalls(1)}>1</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400'
                 onClick={() => updateCountAndBalls(2)}>2</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400'
                 onClick={() => updateCountAndBalls(3)}>3</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400'
                 onClick={() => updateCountAndBalls(4)}>4</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400'
                 onClick={() => updateCountAndBalls(5)}>5</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400'
                 onClick={() => updateCountAndBalls(6)}>6</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400' onClick={() => setCount(count + 1)}>Wide Ball</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400' onClick={() => setCount(count + 1)}>No Ball</button>
                <button className='w-[150px] p-2 rounded-md text-white bg-slate-400' onClick={Out}>Out</button>
                <label className='w-[150px] p-2 rounded-md text-white bg-slate-400 flex gap-2 justify-between'>
                    <p>Overs:</p> <Select value={over} onChange={handleSelectChange}
                        className='bg-slate-400 text-white w-[50px] h-[20px]'>
                        Select Overs
                        {[...Array(50).keys()].map(i => (
                            <Option key={i + 1} value={i + 1} >{i + 1}</Option>
                        ))}
                    </Select>
                </label>
                <p className='w-[150px] p-2 rounded-md text-white bg-slate-400'>Total Balls: {balls}</p>

            </div>
        </div>
    )
}

export default Counter
