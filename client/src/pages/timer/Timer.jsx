import Sidebar from '../../components/sidebar/Sidebar';
import './timer.scss';
import { BsTagFill, BsPlayCircle, BsPlusSquareDotted } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaPauseCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';

let timerId;
const Timer = () => {
  const [startTimer, setStartTimer] = useState(true);
  const [settingTimerMin, setSettingTimerMin] = useState(0);
  const [settingTimerSec, setSettingTimerSec] = useState(3);

  const countDown = () => {
    timerId = setTimeout(() => {
      if (settingTimerSec === 0) {
        setSettingTimerMin((prev) => prev - 1);
        setSettingTimerSec(59);
      } else {
        setSettingTimerSec((prev) => prev - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!startTimer) {
      if (settingTimerSec === 0 && settingTimerMin === 0) {
        setStartTimer((prev) => !prev);
        setSettingTimerSec(3);
      } else countDown();
    } else clearTimeout(timerId);
  }, [startTimer, settingTimerSec]);

  const handleTimer = () => {
    setStartTimer((prev) => !prev);
  };

  return (
    <div className='timer'>
      <Sidebar />
      <div className='timerContainer'>
        <div className='timerSetContainer'>
          <div className='timerSetTask'>
            <input
              type='text'
              className='timerSetTaskInput'
              placeholder='Please enter task name'
            />
          </div>
          <button className='timerSetTag'>
            <BsTagFill />
          </button>
          <div className='timerStartContainer'>
            <div className='timerBox'>
              <span>
                {`${('00' + settingTimerMin).slice(-2)}:${(
                  '00' + settingTimerSec
                ).slice(-2)}`}
              </span>
            </div>
            <button className='timerStartBtn' onClick={handleTimer}>
              {startTimer ? <BsPlayCircle /> : <FaPauseCircle />}
            </button>
            <button className='timerAddBtn'>
              <BsPlusSquareDotted />
            </button>
          </div>
          <button className='timerSetting'>
            <AiTwotoneSetting />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
