import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';

import Sidebar from '../../components/sidebar/Sidebar';
import { AuthContext } from '../../context/AuthContext';

import './timer.scss';
import { BsTagFill, BsPlayCircle, BsPlusSquareDotted } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaStopCircle } from 'react-icons/fa';
import TimerShowSummary from './showSummary/TimerShowSummary';
import TimerShowDetails from './showDetail/TimerShowDetails';

let timerId;
const Timer = () => {
  const { user } = useContext(AuthContext);
  const timeMinutes = Math.floor(user.duration / 60);
  const timeSeconds = Math.floor(user.duration % 60);

  const [startTimer, setStartTimer] = useState(true);
  // this value is pomodoro from settings
  const [settingTimerMin, setSettingTimerMin] = useState(timeMinutes);
  const [settingTimerSec, setSettingTimerSec] = useState(timeSeconds);
  const [beginTime, setBeginTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const taskName = useRef();

  const timerInit = () => {
    setSettingTimerMin(timeMinutes);
    setSettingTimerSec(timeSeconds); // initial time
  };

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

  const taskSubmit = async () => {
    console.log('task:', taskName.current.value);
    console.log('user:', user);
    console.log('user duration:', user.duration);
    // const res = await axios.post('/tasks', {
    //   userId: user._id,
    //   title: taskName.current.value,
    //   startTime: beginTime,
    //   finishTime: endTime,
    // });
    // if (res.status === 200) {
    //   // show task
    // }
    // console.log('res:', res);
  };

  useEffect(() => {
    if (!startTimer) {
      if (settingTimerSec === 0 && settingTimerMin === 0) {
        setStartTimer(true); // stop
        clearTimeout(timerId); // clear timer
        timerInit();
        taskSubmit();
      } else countDown();
    }
  }, [startTimer, settingTimerSec]);

  const handleTimer = () => {
    if (startTimer) {
      console.log('begin date:', new Date());
      setBeginTime(new Date());
    } else {
      console.log('end date:', new Date());
      setEndTime(new Date());
      clearTimeout(timerId); // clear timer
      timerInit();
      // api call
      taskSubmit();
    }
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
              ref={taskName}
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
              {startTimer ? <BsPlayCircle /> : <FaStopCircle />}
            </button>
            <button className='timerAddBtn' disabled={!startTimer}>
              <BsPlusSquareDotted />
            </button>
          </div>
          <button className='timerSetting'>
            <AiTwotoneSetting />
          </button>
        </div>
        <TimerShowSummary />
        <TimerShowDetails />
      </div>
    </div>
  );
};

export default Timer;
