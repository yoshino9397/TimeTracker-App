import "./changeView.scss";
import { AiOutlineUnorderedList, AiTwotoneCalendar } from "react-icons/ai";

const ChangeView = ({ handleChangeViewWindow }) => {
  const saveInputValue = (e) => {
    console.log(e.target.id);
    if (e.target.id === "listMode") {
      handleChangeViewWindow();
    } else if (e.target.id === "calendarMode") {
      handleChangeViewWindow();
    }
  };

  return (
    <>
      <div
        className='changeViewContainerBack'
        onClick={handleChangeViewWindow}
      />
      <div className='changeViewContainer'>
        <div className='selectViewTitle'>SELECT VIEW</div>
        <div className='selectViewContainer'>
          <div className='selectListContainer' onClick={saveInputValue}>
            <input
              type='radio'
              id='listMode'
              name='viewMode'
              value='listMode'
              defaultChecked={true}
              // defaultChecked={user.timerMode === "pomodoro" && "checked"}
            />
            <label htmlFor='listMode'>
              <AiOutlineUnorderedList />
              <span>LIST</span>
            </label>
          </div>
          <div className='selectCalendarContainer' onClick={saveInputValue}>
            <input
              type='radio'
              id='calendarMode'
              name='viewMode'
              value='calendarMode'
              // defaultChecked={user.timerMode === "timer" && "checked"}
            />
            <label htmlFor='calendarMode'>
              <AiTwotoneCalendar />
              <span>CALENDAR</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeView;
