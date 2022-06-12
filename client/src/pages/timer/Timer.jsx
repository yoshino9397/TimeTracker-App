import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

import "./timer.scss";
import TimerShowSummary from "../../components/showSummary/TimerShowSummary";
import SetTask from "../../components/setTask/SetTask";
import TimerShowDetail from "../../components/showDetail/TimerShowDetail";

const absDate = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6];
const Timer = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const setTask = (task) => {
    setNewTask(task);
  };

  const setWeeklyTasks = (task) => {
    const list = absDate.map((date) => task.filter((el) => el.date === date));
    setTasks(list);
  };

  const addWeeklyTask = (task) => {
    setTasks(task);
  };

  return (
    <div className='timer'>
      <Sidebar />
      <div className='timerContainer'>
        <SetTask setTask={setTask} />
        <TimerShowSummary
          tasks={[...tasks]}
          newTask={newTask}
          setWeeklyTasks={setWeeklyTasks}
          addWeeklyTask={addWeeklyTask}
        />
        <div className='timerShowDetailsContainer'>
          {tasks.map(
            (data, idx) =>
              data.length !== 0 && <TimerShowDetail key={idx} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
