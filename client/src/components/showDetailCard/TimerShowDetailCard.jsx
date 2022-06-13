import { useState } from "react";
import { BsTagFill } from "react-icons/bs";
import Projects from "../projects/Projects";

import "./timerShowDetailCard.scss";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { useEffect } from "react";

const TimerShowDetailCard = ({
  el,
  checkBoxData,
  dataLength,
  addCheckBoxData,
}) => {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    if (checkBoxData.length === dataLength) setCheckBox(true);
    else if (checkBoxData.length === 0) setCheckBox(false);
  }, [checkBoxData]);

  const setProject = (project) => {
    setProjectName(project);
  };

  const handleModal = () => {
    setProjectsOpen((prev) => !prev);
  };

  const handleCheckBox = () => {
    if (!checkBox) {
      addCheckBoxData(1, el);
      setCheckBox(true);
    } else {
      addCheckBoxData(-1, el);
      setCheckBox(false);
    }
  };

  return (
    <div className='detailsDateContainerTask'>
      <div className='detailsTaskDateEditContainer'>
        <div className='detailsDateCardEditCheckbox' onClick={handleCheckBox}>
          {checkBox ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>
        <div className='detailTask'>{el.val.title}</div>
        {projectName && (
          <div
            className='detailsDateProjectTag'
            onClick={() => setProjectsOpen((prev) => !prev)}
          >
            <span
              className='detailsDateProjectTagBack'
              style={{
                backgroundColor: `${projectName.colorCode}`,
              }}
            >
              &nbsp;
            </span>
            <GoPrimitiveDot style={{ fill: `${projectName.colorCode}` }} />
            {projectName.title}
            {projectsOpen && (
              <Projects handleModal={handleModal} setProject={setProject} />
            )}
          </div>
        )}
        {!projectName && (
          <div className='detailTaskTag'>
            <button className='detailTaskTagBtn' onClick={() => handleModal()}>
              <BsTagFill />
              {projectsOpen && (
                <Projects handleModal={handleModal} setProject={setProject} />
              )}
            </button>
          </div>
        )}
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
