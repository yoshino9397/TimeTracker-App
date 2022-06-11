import React from 'react';

import './timerShowSummary.scss';

const TimerShowSummary = () => {
  return (
    <div className='showSummaryContainer'>
      <div className='showTodayTitle'>TODAY</div>
      <div className='showTodayTime'>00:00:00</div>
      <hr className='timerShowSummaryHr' />
      <div className='showThisWeekTitle'>THIS WEEK</div>
      <div className='showThisWeekTime'>00:00:00</div>
    </div>
  );
};

export default TimerShowSummary;
