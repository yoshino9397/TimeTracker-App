import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import "./setting.scss";
import { MdAlarm, MdOutlineTimer } from "react-icons/md";

const Setting = ({ handleSettingWindow }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [pomodoroErrMsg, setPomodoroErrMsg] = useState("");
  const [shortBreakErrMsg, setShortBreakErrMsg] = useState("");
  const [longBreakErrMsg, setLongBreakErrMsg] = useState("");
  const [longBreakIntervalErrMsg, setLongBreakIntervalErrMsg] = useState("");
  const [settingSubmitErrFlg, setSettingSubmitErrFlg] = useState(false);
  // const durationMin = user.duration / 60;
  // const shortBreakMin = user.shortBreak / 60;
  // const longBreakMin = user.longBreak / 60;
  console.log("user", user);

  const checkTimerValidation = (e) => {
    console.log(e.target.id);
    if (e.target.id === "pomodoro") {
      if (
        !Number.isInteger(parseInt(e.target.value)) ||
        parseInt(e.target.value) <= 0
      ) {
        setPomodoroErrMsg("Please enter a valid positive number");
      } else {
        setPomodoroErrMsg("");
      }
    } else if (e.target.id === "shortBreak") {
      if (
        !Number.isInteger(parseInt(e.target.value)) ||
        parseInt(e.target.value) <= 0
      ) {
        setShortBreakErrMsg("Please enter a valid positive number");
      } else {
        setShortBreakErrMsg("");
      }
    } else if (e.target.id === "longBreak") {
      if (
        !Number.isInteger(parseInt(e.target.value)) ||
        parseInt(e.target.value) <= 0
      ) {
        setLongBreakErrMsg("Please enter a valid positive number");
      } else {
        setLongBreakErrMsg("");
      }
    } else if (e.target.id === "longBreakInterval") {
      if (
        !Number.isInteger(parseInt(e.target.value)) ||
        parseInt(e.target.value) <= 0
      ) {
        setLongBreakIntervalErrMsg("Please enter a valid positive number");
      } else {
        setLongBreakIntervalErrMsg("");
      }
    }
  };

  const submitSetting = async (e) => {
    e.preventDefault();
    if (
      pomodoroErrMsg ||
      shortBreakErrMsg ||
      longBreakErrMsg ||
      longBreakIntervalErrMsg
    ) {
      return setSettingSubmitErrFlg(true);
    } else setSettingSubmitErrFlg(false);

    try {
      const res = await axios.put(`/users/${user._id}`, {
        userId: user._id,
        email: user.email,
        timerMode: e.target[0].checked ? "pomodoro" : "timer",
        duration: e.target[2].value,
        shortBreak: e.target[3].value,
        longBreak: e.target[4].value,
        longBreakInterval: e.target[5].value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    } catch (err) {
      console.log("err:", err);
    }
    handleSettingWindow();
  };

  return (
    <>
      <div className='settingContainerBack' onClick={handleSettingWindow}></div>
      <div className='settingContainer'>
        <span className='settingContainerTitle'>Setting</span>

        <form
          onSubmit={submitSetting}
          autoComplete='off'
          className='settingForm'
        >
          <div className='settingFormContainer'>
            <div className='settingTimerFormInputSetContainer'>
              <div className='settingTimerFormLabel'>Timer Mode</div>
              <div className='settingTimerModeContainer'>
                <input
                  type='radio'
                  id='pomodoroIcon'
                  name='timerMode'
                  value='pomodoro'
                  defaultChecked={user.timerMode === "pomodoro" && "checked"}
                />
                <label htmlFor='pomodoroIcon'>
                  <span>Pomodoro</span>
                  <MdAlarm />
                </label>
                <input
                  type='radio'
                  id='timerIcon'
                  name='timerMode'
                  value='timer'
                  defaultChecked={user.timerMode === "timer" && "checked"}
                />
                <label htmlFor='timerIcon'>
                  <span>Timer</span>
                  <MdOutlineTimer />
                </label>
              </div>
            </div>
            <div className='settingTimerFormInputSetContainer'>
              <label htmlFor='pomodoro' className='settingTimerFormLabel'>
                Pomodoro 🍅 (sec)
              </label>
              <input
                type='number'
                id='pomodoro'
                name='pomodoro'
                defaultValue={user.duration}
                className='settingTimerFormInput'
                placeholder='1500'
                onBlur={checkTimerValidation}
                step='1'
              />
            </div>
            {pomodoroErrMsg && (
              <div className='timerInputErrMsg'>{pomodoroErrMsg}</div>
            )}
            <div className='settingTimerFormInputSetContainer'>
              <label htmlFor='shortBreak' className='settingTimerFormLabel'>
                Short Break (sec)
              </label>
              <input
                type='number'
                id='shortBreak'
                name='shortBreak'
                defaultValue={user.shortBreak}
                className='settingTimerFormInput'
                placeholder='300'
                onBlur={checkTimerValidation}
                step='1'
              />
            </div>
            {shortBreakErrMsg && (
              <div className='timerInputErrMsg'>{shortBreakErrMsg}</div>
            )}
            <div className='settingTimerFormInputSetContainer'>
              <label htmlFor='longBreak' className='settingTimerFormLabel'>
                Long Break (sec)
              </label>
              <input
                type='number'
                id='longBreak'
                name='longBreak'
                defaultValue={user.longBreak}
                className='settingTimerFormInput'
                placeholder='900'
                onBlur={checkTimerValidation}
                step='1'
              />
            </div>
            {longBreakErrMsg && (
              <div className='timerInputErrMsg'>{longBreakErrMsg}</div>
            )}
            <div className='settingTimerFormInputSetContainer'>
              <label
                htmlFor='longBreakInterval'
                className='settingTimerFormLabel'
              >
                Long Break Interval
              </label>
              <input
                type='number'
                id='longBreakInterval'
                name='longBreakInterval'
                defaultValue={4}
                placeholder='4'
                className='settingTimerFormInput'
                onBlur={checkTimerValidation}
                step='1'
              />
            </div>
            {longBreakIntervalErrMsg && (
              <div className='timerInputErrMsg'>{longBreakIntervalErrMsg}</div>
            )}
          </div>
          <button className='settingFormBtn' type='submit'>
            Submit
          </button>
          {settingSubmitErrFlg && (
            <div className='timerInputErrMsg'>Please clear error</div>
          )}
        </form>
      </div>
    </>
  );
};

export default Setting;
