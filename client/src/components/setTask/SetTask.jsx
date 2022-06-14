import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import "./setTask.scss";

import { BsTagFill, BsPlayCircle, BsPlusSquareDotted } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaStopCircle } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import Projects from "../projects/Projects";

let timerId;
const SetTask = ({ setTask, handleEditProjectWindow }) => {
  const { user } = useContext(AuthContext);
  const timeMinutes = Math.floor(user.duration / 60);
  const timeSeconds = Math.floor(user.duration % 60);

  const [startTimer, setStartTimer] = useState(true);
  // this value is pomodoro from settings
  // const [settingTimerMin, setSettingTimerMin] = useState(timeMinutes);
  // const [settingTimerSec, setSettingTimerSec] = useState(timeSeconds);
  const [settingTimerMin, setSettingTimerMin] = useState(0);
  const [settingTimerSec, setSettingTimerSec] = useState(3);
  const [endTime, setEndTime] = useState("");
  const [beginTime, setBeginTime] = useState("");
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
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

  useEffect(() => {
    const taskSubmit = async () => {
      if (endTime) {
        const duration = Math.floor((endTime - beginTime) / 1000);
        setEndTime("");
        const res = await axios.post("/tasks", {
          userId: user._id,
          title: taskName.current.value || "no name",
          startTime: beginTime,
          finishTime: endTime,
          taskDuration: duration,
          projectId: projectName._id,
          projectTitle: projectName.title,
          projectColorCode: projectName.colorCode,
        });
        if (res.status === 200) {
          setTask(res.data);
        }
        taskName.current.value = "";
        setProjectName("");
      }
    };
    taskSubmit();
  }, [endTime]);

  useEffect(() => {
    if (!startTimer) {
      if (settingTimerSec === 0 && settingTimerMin === 0) {
        clearTimeout(timerId); // clear timer
        timerInit();
        // api call
        setStartTimer(true); // stop
        setEndTime(new Date().getTime());
      } else countDown();
    }
  }, [startTimer, settingTimerSec]);

  const setProject = (project) => {
    setProjectName(project);
  };

  const handleModal = () => {
    setProjectsOpen((prev) => !prev);
  };

  const handleTimer = () => {
    if (startTimer) {
      setBeginTime(new Date().getTime());
    } else {
      clearTimeout(timerId); // clear timer
      timerInit();
      // api call
      setEndTime(new Date().getTime());
    }
    setStartTimer((prev) => !prev);
  };

  return (
    <div className='timerSetContainer'>
      <div className='timerSetTask'>
        <input
          type='text'
          className='timerSetTaskInput'
          placeholder='Please enter task name'
          ref={taskName}
        />
        {projectName && (
          <div
            className='timerSetProjectTag'
            onClick={() => setProjectsOpen((prev) => !prev)}
          >
            <span
              className='timerSetProjectTagBack'
              style={{
                backgroundColor: `${projectName.colorCode}`,
              }}
            >
              &nbsp;
            </span>
            <GoPrimitiveDot style={{ fill: `${projectName.colorCode}` }} />
            {projectName.title}
            {projectsOpen && (
              <Projects
                handleModal={handleModal}
                setProject={setProject}
                handleEditProjectWindow={handleEditProjectWindow}
              />
            )}
          </div>
        )}
      </div>
      {!projectName && (
        <button className='timerSetTag' onClick={() => handleModal()}>
          <BsTagFill />
          {projectsOpen && (
            <Projects
              handleModal={handleModal}
              setProject={setProject}
              handleEditProjectWindow={handleEditProjectWindow}
            />
          )}
        </button>
      )}
      <div className='timerStartContainer'>
        <div className='timerBox'>
          <span>
            {`${("00" + settingTimerMin).slice(-2)}:${(
              "00" + settingTimerSec
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
  );
};

export default SetTask;
