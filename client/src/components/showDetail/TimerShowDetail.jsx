import TimerShowDetailCard from "../showDetailCard/TimerShowDetailCard";

import "./timerShowDetail.scss";

const TimerShowDetail = ({ data }) => {
  let totalTime = 0;
  data.map((el) => (totalTime += el.val.taskDuration));
  data.sort((a, b) => b.val.startTime.localeCompare(a.val.startTime));

  return (
    <div className='detailsDateContainer'>
      <div className='detailsDateContainerTitle'>
        <div className='detailsDateEditContainer'>
          <input
            className='detailCheckBox'
            type='checkbox'
            name='detailsDate'
            id='detailsDate'
          />
          <div className='detailDate'>{data[0].val.startTime.slice(0, 10)}</div>
          <span className='detailDateSelect'>0 items selected</span>
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
          <TimerShowDetailCard key={idx} el={el} />
        ))}
      </div>
    </div>
  );
};

export default TimerShowDetail;
