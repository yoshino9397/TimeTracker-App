import { useState } from "react";
import TimerShowDetailCard from "../showDetailCard/TimerShowDetailCard";

import "./timerShowDetail.scss";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox,
} from "react-icons/md";

const TimerShowDetail = ({ data }) => {
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [checkBoxNum, setCheckBoxNum] = useState(0);
  let totalTime = 0;
  console.log("data", data.length);
  data.map((el) => (totalTime += el.val.taskDuration));
  data.sort((a, b) => b.val.startTime.localeCompare(a.val.startTime));
  console.log("checkBoxNum:", checkBoxNum);

  const allSelect = () => {
    setCheckBoxStatus((prev) => !prev);
  };

  const addCheckBoxNum = (num) => {
    setCheckBoxNum((prev) => prev + num);
  };

  return (
    <div className='detailsDateContainer'>
      <div className='detailsDateContainerTitle'>
        <div className='detailsDateEditContainer'>
          <div className='detailsDateEditCheckbox' onClick={allSelect}>
            {checkBoxStatus && checkBoxNum === data.length ? (
              <MdCheckBox />
            ) : checkBoxNum !== 0 && checkBoxNum < data.length ? (
              <MdIndeterminateCheckBox />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </div>
          <div className='detailDate'>{data[0].val.startTime.slice(0, 10)}</div>
          <span className='detailDateSelect'>
            {checkBoxNum} / {data.length} items selected
          </span>
          <button className='detailDateEdit' disabled={true}>
            Edit
          </button>
          <button className='detailDateDelete' disabled={true}>
            Delete
          </button>
        </div>
        <div className='detailTimeSum'>
          {`${("00" + Math.floor(totalTime / 60 / 60)).slice(-2)}:${(
            "00" +
            (Math.floor(totalTime / 60) % 60)
          ).slice(-2)}:${("00" + (totalTime % 60)).slice(-2)}`}
        </div>
      </div>
      <div className='detailsTasksContainer'>
        {data.map((el, idx) => (
          <TimerShowDetailCard
            key={idx}
            el={el}
            checkBoxStatus={checkBoxStatus}
            addCheckBoxNum={addCheckBoxNum}
          />
        ))}
      </div>
    </div>
  );
};

export default TimerShowDetail;
