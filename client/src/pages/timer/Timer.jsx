import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

import './timer.scss';
import TimerShowSummary from './showSummary/TimerShowSummary';
import TimerShowDetails from './showDetail/TimerShowDetails';
import SetTask from './setTask/SetTask';

const Timer = () => {
  const [newTask, setNewTask] = useState('');

  const setTask = (task) => {
    setNewTask(task);
  };

  return (
    <div className='timer'>
      <Sidebar />
      <div className='timerContainer'>
        <SetTask setTask={setTask} />
        <TimerShowSummary />
        <TimerShowDetails newTask={newTask} />
      </div>
    </div>
  );
};

export default Timer;
