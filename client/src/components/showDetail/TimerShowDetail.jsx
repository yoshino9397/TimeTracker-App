import { useState } from "react";
import TimerShowDetailCard from "../showDetailCard/TimerShowDetailCard";
import Edit from "../../components/edit/Edit";
import { format } from "date-fns";

import "./timerShowDetail.scss";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox,
} from "react-icons/md";

const TimerShowDetail = ({ data, handleEditProjectWindow }) => {
  const [checkBoxData, setCheckBoxData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  let totalTime = 0;
  data.forEach((el) => (totalTime += el.val.taskDuration));
  data.sort((a, b) => b.val.startTime.localeCompare(a.val.startTime));
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(
    new Date().setDate(new Date().getDate() - 1),
    "yyyy-MM-dd"
  );

  const allSelect = () => {
    if (checkBoxData.length > 0) setCheckBoxData([]);
    else setCheckBoxData(data);
  };

  const addCheckBoxData = (addFlg, addData) => {
    if (addFlg === 1) {
      setCheckBoxData((prev) => {
        const tmpData = [...prev];
        tmpData.splice(0, 0, addData);
        return tmpData;
      });
    } else {
      setCheckBoxData((prev) => {
        const tmpData = [...prev];
        return tmpData.filter((el) => !(el === addData));
      });
    }
  };

  const handleEditTaskWindow = () => {
    setEditOpen((prev) => !prev);
  };

  return (
    <>
      <div className='detailsDateContainer'>
        <div className='detailsDateContainerTitle'>
          <div className='detailsDateEditContainer'>
            <div className='detailsDateEditCheckbox' onClick={allSelect}>
              {checkBoxData.length === data.length ? (
                <MdCheckBox />
              ) : checkBoxData.length !== 0 ? (
                <MdIndeterminateCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </div>
            <div className='detailDate'>
              {data[0].val.startTime.slice(0, 10) === today
                ? "Today"
                : data[0].val.startTime.slice(0, 10) === yesterday
                ? "Yesterday"
                : data[0].val.startTime.slice(0, 10)}
            </div>
            <span className='detailDateSelect'>
              {checkBoxData.length} / {data.length} items selected
            </span>
            <button
              className='detailDateEdit'
              disabled={checkBoxData.length === 0}
              onClick={handleEditTaskWindow}
            >
              Edit
            </button>
            <button
              className='detailDateDelete'
              disabled={checkBoxData.length === 0}
            >
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
              checkBoxData={checkBoxData}
              dataLength={data.length}
              addCheckBoxData={addCheckBoxData}
              handleEditProjectWindow={handleEditProjectWindow}
            />
          ))}
        </div>
      </div>
      {editOpen && (
        <Edit
          handleEditTaskWindow={handleEditTaskWindow}
          checkBoxData={checkBoxData}
        />
      )}
    </>
  );
};

export default TimerShowDetail;
