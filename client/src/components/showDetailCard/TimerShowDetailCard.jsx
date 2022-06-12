import { useState } from "react";
import { BsTagFill } from "react-icons/bs";
import Projects from "../projects/Projects";

import "./timerShowDetailCard.scss";

const TimerShowDetailCard = ({ el }) => {
  const [projectsOpen, setProjectsOpen] = useState(false);

  const handleModal = () => {
    setProjectsOpen((prev) => !prev);
  };

  return (
    <div className='detailsDateContainerTask'>
      <div className='detailsTaskDateEditContainer'>
        <input
          className='detailTaskCheckBox'
          type='checkbox'
          name='detailsDate'
          id='detailsDate'
        />
        <div className='detailTask'>{el.val.title}</div>
        <div className='detailTaskTag'>
          <button className='detailTaskTagBtn' onClick={handleModal}>
            <BsTagFill />
          </button>
          {projectsOpen && <Projects handleModal={handleModal} />}
        </div>
      </div>
      <div className='detailTaskTimeSum'>
        {`${("00" + Math.floor(el.val.taskDuration / 60 / 60)).slice(-2)}:${(
          "00" +
          (Math.floor(el.val.taskDuration / 60) % 60)
        ).slice(-2)}:${("00" + (el.val.taskDuration % 60)).slice(-2)}`}
      </div>
    </div>
  );
};

export default TimerShowDetailCard;
