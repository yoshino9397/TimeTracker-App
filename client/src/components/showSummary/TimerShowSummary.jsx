import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";

import { AuthContext } from "../../context/AuthContext";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import "./timerShowSummary.scss";

const absDate = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6];
const TimerShowSummary = ({
  tasks,
  newTask,
  setWeeklyTasks,
  addWeeklyTask,
  loadFlg,
}) => {
  const { user } = useContext(AuthContext);
  const [todaySumTime, setTodaySumTime] = useState(0);
  const [weekSumTime, setWeekSumTime] = useState(0);
  const tmpTasks = [];
  const today = format(new Date(), "yyyy-MM-dd");
  const todayDay = format(new Date(), "c");
  const todayMonth = format(new Date(), "yyyy-MM");
  let tmpTodaySumTime = 0,
    tmpWeekSumTime = 0;

  useEffect(() => {
    if (newTask.length !== 0) {
      const taskDate = format(new Date(newTask.startTime), "yyyy-MM-dd");
      if (taskDate.indexOf(todayMonth) === 0) {
        const checkBeforeDate = today.slice(8) - taskDate.slice(8);
        const checkAfterDate = taskDate.slice(8) - today.slice(8);
        // added -1 for start Monday
        if (checkBeforeDate >= 0 && checkBeforeDate < todayDay - 1) {
          if (checkBeforeDate === 0) {
            setTodaySumTime((prev) => prev + newTask.taskDuration);
          }
          tasks[absDate.findIndex((el) => el === checkAfterDate)].unshift({
            date: checkAfterDate,
            val: newTask,
          });
          addWeeklyTask(tasks);
          setWeekSumTime((prev) => prev + newTask.taskDuration);
        } else if (checkAfterDate > 0 && checkAfterDate < 9 - todayDay) {
          // changed from 8 to 9 for start Monday
          tasks[absDate.findIndex((el) => el === checkAfterDate)].unshift({
            date: checkAfterDate,
            val: newTask,
          });
          addWeeklyTask(tasks);
          setWeekSumTime((prev) => prev + newTask.taskDuration);
        }
      }
    }
  }, [newTask]);

  useEffect(() => {
    loadTasks();
  }, [loadFlg]);

  const loadTasks = async () => {
    const res = await axios.get(`/tasks/user/${user._id}`);
    if (res.status === 200) {
      res.data.map((val) => {
        const taskDate = format(new Date(val.startTime), "yyyy-MM-dd");
        if (taskDate.indexOf(todayMonth) === 0) {
          const checkBeforeDate = today.slice(8) - taskDate.slice(8);
          const checkAfterDate = taskDate.slice(8) - today.slice(8);
          console.log("taskDate", taskDate);
          // added -1 for start Monday
          if (checkBeforeDate >= 0 && checkBeforeDate < todayDay - 1) {
            if (checkBeforeDate === 0) {
              tmpTodaySumTime += val.taskDuration;
            }
            tmpTasks.splice(checkBeforeDate, 0, {
              date: checkAfterDate,
              val,
            });
            tmpWeekSumTime += val.taskDuration;
          } else if (checkAfterDate > 0 && checkAfterDate < 9 - todayDay) {
            // changed from 8 to 9 for start Monday
            tmpTasks.splice(checkAfterDate, 0, {
              date: checkAfterDate,
              val,
            });
            tmpWeekSumTime += val.taskDuration;
          }
        }
      });
    }
    setWeeklyTasks(tmpTasks);
    setTodaySumTime(tmpTodaySumTime);
    setWeekSumTime(tmpWeekSumTime);
  };

  return (
    <div className='showSummaryContainer'>
      <div className='showLeftItem'>
        <GrFormPrevious />
        <span>Today</span>
        <GrFormNext />
      </div>
      <div className='showRightItem'>
        <div className='showTodayTitle'>TODAY</div>
        <div className='showTodayTime'>
          {`${("00" + Math.floor(todaySumTime / 60 / 60)).slice(-2)}:${(
            "00" +
            (Math.floor(todaySumTime / 60) % 60)
          ).slice(-2)}:${("00" + (todaySumTime % 60)).slice(-2)}`}
        </div>
        <hr className='timerShowSummaryHr' />
        <div className='showThisWeekTitle'>THIS WEEK</div>
        <div className='showThisWeekTime'>
          {`${("00" + Math.floor(weekSumTime / 60 / 60)).slice(-2)}:${(
            "00" +
            (Math.floor(weekSumTime / 60) % 60)
          ).slice(-2)}:${("00" + (weekSumTime % 60)).slice(-2)}`}
        </div>
      </div>
    </div>
  );
};

export default TimerShowSummary;
