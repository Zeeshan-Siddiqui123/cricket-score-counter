import React, { useState } from 'react';
import { Select, Modal, Button } from 'antd';
import { BiSolidCricketBall } from 'react-icons/bi';

const { Option } = Select;

const Counter = () => {
    const [count, setCount] = useState(0);
    const [out, setOut] = useState(0);
    const [over, setOver] = useState(0);
    const [ballsLeft, setBallsLeft] = useState(6);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [oversLeft, setOversLeft] = useState(1);
    const [ballsBowled, setBallsBowled] = useState(0);

    const resetGame = () => {
        setCount(count * 0)
        setOut(out * 0)
        setOver(over * 0)
        setBallsLeft(6)
        setOversLeft(oversLeft / oversLeft)
    }
    const handleSelectChange = (value) => {
        setOversLeft(value);
        setBallsLeft(value * 6);
        setOver(0);
        setBallsBowled(0);
        // resetGame()
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
        if (ballsLeft > 0) {
            setCount(prevCount => prevCount + runs);
            setBallsLeft(prevBallsLeft => prevBallsLeft - 1);
            setBallsBowled(prevBallsBowled => {
                const newBallsBowled = prevBallsBowled + 1;
                if (newBallsBowled % 6 === 0) {
                    setOver(prevOver => prevOver + 1); // Increment over count every 6 balls
                }
                // resetGame()
                return newBallsBowled;
            });

            if (ballsLeft === 1) {
                showModal(`Overs completed! Your score is ${count}`);
            }
        }
    };

    const handleOut = () => {
        if (out < 10 && ballsLeft > 0) {
            setOut(prevOut => {
                const newOut = prevOut + 1;
                if (newOut === 10) {
                    showModal(`Team All Out! Your Score is ${count}`);
                }
                // resetGame()
                return newOut;
            });
            setBallsLeft(prevBallsLeft => prevBallsLeft - 1);
            setBallsBowled(prevBallsBowled => {
                const newBallsBowled = prevBallsBowled + 1;
                if (newBallsBowled % 6 === 0) {
                    setOver(prevOver => prevOver + 1);
                }
                return newBallsBowled;
            });
        }
    };
    return (
        <div className='body'>
            <div className="flex flex-col justify-center items-start mt-5 ml-10  mr-10 gap-1">
                <h2 className='text-red-600 text-xl'>Note:</h2>
                <div className='flex gap-1'>
                    <div><BiSolidCricketBall color='red' /></div>
                    <p className='text-white'>If your selection of over is wrong by mistake then you refresh and select over again.</p></div>
                <div className='flex gap-1'>
                    <div><BiSolidCricketBall color='red' /></div>
                    <p className='text-white'> When your selection of over is confirmed then you will start scoring and don't refresh and not select over again until your overs will completed.</p>
                </div>
                <div className='flex gap-1'>
                    <div><BiSolidCricketBall color='red' /></div>
                    <p className='text-white'> Remember that the game should not be refreshed between scoring If you refresh in between the scoring your score count is zero and the game will start again.</p>
                </div>
                <div className='flex gap-1'>
                    <div><BiSolidCricketBall color='red' /></div>
                    <p className='text-white'> 'Wd' and 'Nb' stands for 1 run of wide ball and No ball respectively 'Wd1 & Nb1' stands for wide & No ball + 1 respectively.</p>
                    </div>
            </div>
            <div className='flex items-center gap-4 flex-col mt-10 mb-10 p-8 border rounded-lg shadow-lg max-w-md mx-auto bg-transparent text-white glass'>
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
                            value={oversLeft}
                            onChange={handleSelectChange}
                            className='w-16'
                        >
                            {[...Array(50).keys()].map(i => (
                                <Option key={i + 1} value={i + 1}>{i + 1}</Option>
                            ))}
                        </Select>
                    </label>
                    <p className='w-full text-center bg-gray-700 py-2 rounded-md'>Overs Count: {over}</p>
                    <p className='w-full text-center bg-gray-700 py-2 rounded-md'>Balls Left: {ballsLeft}</p>
                </div>

                <Modal
                    title="Game Update"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleOk}
                    footer={[
                        <Button key="ok" type="primary" onClick={handleOk}>
                            OK
                        </Button>
                    ]}
                >
                    <p>{modalContent}</p>
                </Modal>
            </div>
        </div>
    );
};

export default Counter;
