import { useState } from "react";
import TimerShowDetailCard from "../showDetailCard/TimerShowDetailCard";

import "./timerShowDetail.scss";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox,
} from "react-icons/md";
import Edit from "../edit/Edit";

const TimerShowDetail = ({ data }) => {
  const [checkBoxData, setCheckBoxData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  let totalTime = 0;
  data.map((el) => (totalTime += el.val.taskDuration));
  data.sort((a, b) => b.val.startTime.localeCompare(a.val.startTime));

  const handleModal = () => {
    setEditOpen((prev) => !prev);
  };

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

  return (
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
          <div className='detailDate'>{data[0].val.startTime.slice(0, 10)}</div>
          <span className='detailDateSelect'>
            {checkBoxData.length} / {data.length} items selected
          </span>
          <button
            className='detailDateEdit'
            disabled={checkBoxData.length === 0}
            onClick={handleModal}
          >
            Edit
          </button>
          {editOpen && (
            <Edit handleModal={handleModal} checkBoxData={checkBoxData} />
          )}
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
          />
        ))}
      </div>
    </div>
  );
};

export default TimerShowDetail;
