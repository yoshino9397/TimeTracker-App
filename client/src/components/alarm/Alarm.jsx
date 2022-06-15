import "./alarm.scss";
import Confetti from "react-confetti";
import soundfile from "../../assets/ClockAlarm.mp3";
import { useState, useEffect } from "react";

const Alarm = ({ handleAlarmWindow, pomodoroCycle }) => {
  const [audio] = useState(new Audio(soundfile));

  useEffect(() => {
    audio.play();
    const interval = setInterval(() => {
      audio.pause();
      clearInterval(interval);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='alarmContainerBack' onClick={handleAlarmWindow}></div>
      <div className='alarmContainer'>
        {pomodoroCycle % 2 ? (
          <div className='alarmMsg'>Congratulation!! 🥳</div>
        ) : (
          <div className='alarmMsg'>Break Time Finish!</div>
        )}
        <button className='alarmStopBtn' onClick={handleAlarmWindow}>
          OK
        </button>
        <Confetti />
      </div>
    </>
  );
};

export default Alarm;
