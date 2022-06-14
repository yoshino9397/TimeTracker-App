import { useContext, useState, useEffect } from "react";
import { format } from "date-fns";

import { ProjectsContext } from "../../context/ProjectsContext";

import "./edit.scss";
import { GoPrimitiveDot } from "react-icons/go";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const INITIAL_COLORCODE = "#ccc";
const INITIAL_PROJECTNAME = "No Project";
const INITIAL_PROJECT = {
  colorCode: INITIAL_COLORCODE,
  title: INITIAL_PROJECTNAME,
};
const Edit = ({ handleEditTaskWindow, checkBoxData }) => {
  const { projects } = useContext(ProjectsContext);
  const [projectName, setProjectName] = useState("");
  const [projectsList, setProjectsList] = useState([
    INITIAL_PROJECT,
    ...projects,
  ]);
  const [selectOption, setSelectOption] = useState(false);
  const thisDate = format(
    new Date(checkBoxData[0].val.startTime),
    "yyyy-MM-dd"
  );
  const startTime = new Date(checkBoxData[0].val.startTime)
    .toString()
    .slice(16, 24);
  const finishTime = new Date(checkBoxData[0].val.finishTime)
    .toString()
    .slice(16, 24);

  useEffect(() => {
    if (checkBoxData[0].val.projectTitle) {
      projectsList?.forEach((project) => {
        if (project._id === checkBoxData[0].val.projectId) {
          return setProjectName({
            colorCode: project.colorCode,
            title: project.title,
          });
        }
      });
    } else setProjectName("");
  }, []);

  const optionOpen = () => {
    setSelectOption((prev) => !prev);
  };

  const handleOption = (project) => {
    setProjectName({
      colorCode: project.colorCode,
      title: project.title,
    });
  };

  return (
    <>
      <div
        className='editTaskContainerBack'
        onClick={handleEditTaskWindow}
      ></div>
      <div className='editTaskContainer'>
        <span className='editTaskContainerTitle'>Task Edit</span>

        <form
          // onSubmit={editProjects}
          autoComplete='off'
          className='editTaskForm'
        >
          <div className='editTaskFormContainer'>
            <div className='editTaskFormInputSetContainer'>
              {/* <input type='hidden' name='project-id' value={project._id} /> */}
              {/* <label htmlFor='project-List' className='editTaskFormLabel'>
                Task Name
              </label> */}
              <input
                type='text'
                id='project-List'
                name='project-List'
                placeholder='Enter Task Name'
                defaultValue={checkBoxData[0].val.title}
                className='editTaskFormInput'
                // className={`editProjectFormInput ${
                //   inputErr ? "editTaskFormInputErr" : ""
                // }`}
                // ref={refAddProject}
                // onBlur={handleBlur}
              />

              {/* <label htmlFor='project' className='editTaskFormLabel'>
                Project Name
              </label> */}
              <select
                id='project'
                name='project'
                // defaultValue={planInfo === "" ? categoryList[0] : project}
              >
                <option>test</option>
                {/* {categoryList.map((project) => (
                  <option value={project} key={project}>
                    {project}
                  </option>
                ))} */}
              </select>
              <div className='editTaskFormSelect' onClick={optionOpen}>
                <div className='editTaskFormSelectOption'>
                  <GoPrimitiveDot
                    style={{
                      fill: `${projectName.colorCode || INITIAL_COLORCODE}`,
                    }}
                  />
                  {projectName.title || "No Project"}
                </div>
                {selectOption ? <BiChevronUp /> : <BiChevronDown />}
                {selectOption && (
                  <>
                    <div className='editTaskFormSelectOptionListBack'></div>
                    <div className='editTaskFormSelectOptionList'>
                      {projectsList.map((project, idx) => (
                        <div
                          key={idx}
                          className='optionListContainer'
                          onClick={() => handleOption(project)}
                        >
                          <GoPrimitiveDot
                            style={{ fill: `${project.colorCode}` }}
                          />
                          {project.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* <label htmlFor='task-date' className='editTaskFormLabel'>
                Date
              </label> */}
              <div className='editTaskFormDate'>
                <input
                  type='date'
                  id='task-date'
                  name='task-date'
                  min='2020-12-31'
                  max='2040-12-31'
                  defaultValue={thisDate}
                  className='editTaskFormDateInput'
                  required
                />
              </div>

              <div className='editTaskFormTimeContainer'>
                <div className='editTaskFormTimeSet'>
                  <label htmlFor='start-time' className='editTaskFormLabel'>
                    Start
                  </label>
                  <div className='editTaskFormTime'>
                    <input
                      type='time'
                      id='start-time'
                      name='start-time'
                      max={finishTime}
                      defaultValue={startTime}
                      className='editTaskFormTimeInput'
                      step='2'
                      required
                    />
                  </div>
                </div>

                <div className='editTaskFormTimeSet'>
                  <label htmlFor='start-time' className='editTaskFormLabel'>
                    Stop
                  </label>
                  <div className='editTaskFormTime'>
                    <input
                      type='time'
                      id='start-time'
                      name='start-time'
                      min={startTime}
                      defaultValue={finishTime}
                      className='editTaskFormTimeInput'
                      step='2'
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className='editTaskFormBtn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;
