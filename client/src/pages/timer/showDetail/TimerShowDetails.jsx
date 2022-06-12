import React from 'react';

import './timerShowDetails.scss';
import { BsTagFill } from 'react-icons/bs';
import { useState } from 'react';

const TimerShowDetails = ({ newTask }) => {
  // _id : 62a2fabb4391f54c23e56743
  // userId : "62a2d930972d4e7b2ac57902"
  // title : "Sleep Well"
  // startTime : 2022-05-17T00:55:11.210+00:00
  // finishTime : 2022-05-17T02:55:11.210+00:00
  // duration : 1500
  // projectId : "62a2e01c552a46d92294ab2d"
  // projectTitle : "Sleep Well"
  // projectColorCode : "black"
  // createdAt : 2022-06-10T08:03:07.385+00:00
  // updatedAt : 2022-06-10T08:03:07.385+00:00

  console.log('newTask:', newTask);
  console.log('Date:', new Date(newTask.startTime).getFullYear());
  // console.log(newTask.taskDuration);
  // const hour = ('00' + Math.floor(newTask.taskDuration / 60 / 60)).slice(-2);
  // const min = ('00' + Math.floor((newTask.taskDuration % 1200) / 60)).slice(-2);
  // const sec = ('00' + Math.floor(newTask.taskDuration % 60)).slice(-2);
  // console.log('time:', hour, ':', min, ':', sec);

  return (
    <div className='timerShowDetailsContainer'>
      <div className='detailsDateContainer'>
        <div className='detailsDateContainerTitle'>
          <div className='detailsDateEditContainer'>
            <input
              className='detailCheckBox'
              type='checkbox'
              name='detailsDate'
              id='detailsDate'
            />
            <div className='detailDate'>{`${new Date(
              newTask.startTime
            ).getFullYear()}-${new Date(
              newTask.startTime
            ).getMonth()}-${new Date(newTask.startTime).getDate()}`}</div>
            <span className='detailDateSelect'>0 items selected</span>
            <button className='detailDateEdit' disabled={true}>
              Edit
            </button>
            <button className='detailDateDelete' disabled={true}>
              Delete
            </button>
          </div>
          <div className='detailTimeSum'>00:00:00</div>
        </div>
        <div className='detailsDateContainerTask'>
          <div className='detailsTaskDateEditContainer'>
            <input
              className='detailTaskCheckBox'
              type='checkbox'
              name='detailsDate'
              id='detailsDate'
            />
            <div className='detailTask'>{newTask.title}</div>
            <div className='detailTaskTag'>
              <button className='detailTaskTagBtn'>
                <BsTagFill />
              </button>
            </div>
          </div>
          <div className='detailTaskTimeSum'>{`${(
            '00' + Math.floor(newTask.taskDuration / 60 / 60)
          ).slice(-2)}:${(
            '00' + Math.floor((newTask.taskDuration % 1200) / 60)
          ).slice(-2)}:${('00' + Math.floor(newTask.taskDuration % 60)).slice(
            -2
          )}`}</div>
        </div>
      </div>
    </div>
  );
};

export default TimerShowDetails;
