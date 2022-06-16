import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  format,
  previousMonday,
  nextMonday,
  nextDay,
  parseISO,
} from "date-fns";

import { AuthContext } from "../../context/AuthContext";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import "./timerShowSummary.scss";

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
  const [baseMonday, setBaseMonday] = useState("");
  const today = format(new Date(), "yyyy-MM-dd");
  const WEEK_ARR = [0, 2, 3, 4, 5, 6];
  // const WEEK_NAME = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const tmpTasks = [];
  let tmpTodaySumTime = 0,
    tmpThisWeekSumTime = 0;

  // set init Monday
  useEffect(() => {
    const todayDay = format(new Date(), "c");
    if (todayDay === "2") {
      setBaseMonday(format(new Date(), "yyyy-MM-dd"));
    } else {
      setBaseMonday(format(previousMonday(new Date()), "yyyy-MM-dd"));
    }
  }, []);

  useEffect(() => {
    if (baseMonday !== "") loadTasks();
  }, [loadFlg, baseMonday]);

  useEffect(() => {
    if (newTask.length !== 0) {
      const taskDate = format(new Date(newTask.startTime), "yyyy-MM-dd");
      if (taskDate === baseMonday) {
        setWeekSumTime((prev) => prev + newTask.taskDuration);
        if (taskDate === today) {
          setTodaySumTime((prev) => prev + newTask.taskDuration);
        }
        tasks[1].unshift({
          date: 1,
          val: newTask,
        });
        addWeeklyTask(tasks);
      } else {
        WEEK_ARR.forEach((DAY, idx) => {
          if (
            taskDate.slice(0, 10) ===
            format(nextDay(parseISO(baseMonday), DAY), "yyyy-MM-dd")
          ) {
            setWeekSumTime((prev) => prev + newTask.taskDuration);
            if (taskDate.slice(0, 10) === today) {
              setTodaySumTime((prev) => prev + newTask.taskDuration);
            }
            tasks[idx].unshift({
              date: DAY,
              val: newTask,
            });
            addWeeklyTask(tasks);
          }
        });
      }
    }
  }, [newTask]);

  const loadTasks = async () => {
    const res = await axios.get(`/tasks/user/${user._id}`);
    if (res.status === 200) {
      res.data.map((val) => {
        if (val.startTime.slice(0, 10) === baseMonday) {
          tmpThisWeekSumTime += val.taskDuration;
          if (val.startTime.slice(0, 10) === today) {
            tmpTodaySumTime += val.taskDuration;
          }
          tmpTasks.push({
            date: 1,
            val,
          });
        } else {
          WEEK_ARR.forEach((DAY) => {
            if (
              val.startTime.slice(0, 10) ===
              format(nextDay(parseISO(baseMonday), DAY), "yyyy-MM-dd")
            ) {
              tmpThisWeekSumTime += val.taskDuration;
              if (val.startTime.slice(0, 10) === today) {
                tmpTodaySumTime += val.taskDuration;
              }
              tmpTasks.push({
                date: DAY,
                val,
              });
            }
          });
        }
      });
    }
    setWeeklyTasks(tmpTasks);
    setTodaySumTime(tmpTodaySumTime);
    setWeekSumTime(tmpThisWeekSumTime);
  };

  const prevWeek = () => {
    setBaseMonday(previousMonday(baseMonday));
  };

  const nextWeek = () => {
    setBaseMonday(nextMonday(baseMonday));
  };

  return (
    <div className='showSummaryContainer'>
      <div className='showLeftItem'>
        <BiChevronLeft className='testetst' onClick={prevWeek} />
        <span>Today</span>
        <BiChevronRight />
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
