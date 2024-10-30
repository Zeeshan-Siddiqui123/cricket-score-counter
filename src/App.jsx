import React, { useState } from 'react';
import { Select, Modal, Button } from 'antd';

const { Option } = Select;

const Counter = () => {
    const [count, setCount] = useState(0);
    const [out, setOut] = useState(0);
    const [over, setOver] = useState(1);
    const [balls, setBalls] = useState(6);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const handleSelectChange = (value) => {
        setOver(value);
        setBalls(value * 6);
    };
    const handleWideChange = (value) => {
        setCount(prevCount => prevCount + parseInt(value));
    };

    const handleNoBallChange = (value) => {
        setCount(prevCount => prevCount + parseInt(value));
    };
    const showModal = (message) => {
        setModalContent(message);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        resetGame();
    };

    const updateCountAndBalls = (runs) => {
        if (balls > 0) {
            setCount(prevCount => prevCount + runs);
            setBalls(prevBalls => {
                const newBalls = prevBalls - 1;
                if (newBalls === 0) {
                    showModal(`Overs completed! Your score is ${count}`);
                    setOver(over / over)
                    setCount(count * 0)
                    setOut(out * 0)
                    setBalls(balls + 5)
                }
                return newBalls;
            });
        }
    };

    const handleOut = () => {
        if (out < 10) {
            setOut(prevOut => {
                const newOut = prevOut + 1;
                if (newOut === 10) {
                    showModal(`Team All Out! Your Score is ${count}`);
                }
                return newOut;
            });
        }
    };
    if (out === 10) {
        setOver(over / over)
        setCount(count * 0)
        setOut(out * 0)
        setBalls(6)
    }

    return (
        <div className='flex items-center gap-4 flex-col mt-10 p-8 border rounded-lg shadow-lg max-w-md mx-auto bg-gray-800 text-white'>
            <h1 className='text-2xl font-semibold mb-4'>Cricket Score Counter</h1>
            <span className='bg-gray-700 text-white text-lg px-4 py-2 rounded-md'>{count}/{out}</span>
            <div className='flex items-center gap-3 flex-wrap justify-center'>
                {[0, 1, 2, 3, 4, 5, 6].map(runs => (
                    <button
                        key={runs}
                        className='w-24 p-2 rounded-md bg-indigo-500 hover:bg-indigo-700 transition'
                        onClick={() => updateCountAndBalls(runs)}
                    >
                        {runs}
                    </button>
                ))}
             <div className='w-24 p-2 rounded-md bg-green-500 hover:bg-green-700 transition flex gap-2 justify-between items-center'>
                    <span>Wide Ball</span>
                    <Select
                        value={'Wd'}
                        onChange={handleWideChange}
                        className='w-16'
                    >
                        <Option value="1">Wd</Option>
                        <Option value="2">Wd1</Option>
                        <Option value="3">Wd2</Option>
                        <Option value="4">Wd3</Option>
                        <Option value="5">Wd4</Option>
                        <Option value="6">Wd5</Option>
                    </Select>
                </div>
                <div className='w-24 p-2 rounded-md bg-green-500 hover:bg-green-700 transition flex gap-2 justify-between items-center'>
                    <span>No Ball</span>
                    <Select
                        value={'Nb'}
                        onChange={handleNoBallChange}
                        className='w-16'
                    >
                        <Option value="1">Nb</Option>
                        <Option value="2">Nb1</Option>
                        <Option value="3">Nb2</Option>
                        <Option value="4">Nb3</Option>
                        <Option value="5">Nb4</Option>
                        <Option value="6">Nb5</Option>
                    </Select>
                </div>
                <button className='w-24 p-2 rounded-md bg-red-500 hover:bg-red-700 transition' onClick={handleOut}>Out</button>
                <label className='w-24 p-2 rounded-md bg-gray-600 flex gap-2 justify-between items-center'>
                    <span>Overs:</span>
                    <Select
                        value={over}
                        onChange={handleSelectChange}
                        className='w-16'
                    >
                        {[...Array(50).keys()].map(i => (
                            <Option key={i + 1} value={i + 1}>{i + 1}</Option>
                        ))}
                    </Select>
                </label>
                <p className='w-full text-center bg-gray-700 py-2 rounded-md'>Balls Left: {balls}</p>
            </div>

            <Modal
                title="Game Update"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>
                ]}
            >
                <p>{modalContent}</p>
            </Modal>
        </div>
    );
};

export default Counter;
