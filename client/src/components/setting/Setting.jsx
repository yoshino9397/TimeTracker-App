import { useEffect, useState, useRef, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import "./setting.scss";
import { MdAlarm, MdOutlineTimer } from "react-icons/md";

const Setting = ({ handleSettingWindow }) => {
  const { user } = useContext(AuthContext);
  const [pomodoroErrMsg, setPomodoroErrMsg] = useState("");
  const [shortBreakErrMsg, setShortBreakErrMsg] = useState("");
  const [longBreakErrMsg, setLongBreakErrMsg] = useState("");
  // const durationMin = user.duration / 60;
  // const shortBreakMin = user.shortBreak / 60;
  // const longBreakMin = user.longBreak / 60;
  console.log("user", user);

  const checkTimerValidation = (e) => {
    console.log(e.target.id);
    // if (e.target.id === "start-time") {
    //   setTimeInputErr(e.target.value >= maxTime.current.value);
    //   setTimeInputErrMsg("Start time should be set to a time before Stop time");
    // } else {
    //   setTimeInputErr(e.target.value <= minTime.current.value);
    //   setTimeInputErrMsg("Start time should be set to a time before Stop time");
    // }
  };

  return (
    <>
      <div className='settingContainerBack' onClick={handleSettingWindow}></div>
      <div className='settingContainer'>
        <span className='settingContainerTitle'>Setting</span>

        <form
          // onSubmit={submitSetting}
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
                  defaultChecked='checked'
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
                step='1'
              />
            </div>
          </div>
          <button className='settingFormBtn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Setting;
