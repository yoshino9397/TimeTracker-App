import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import "./addProject.scss";
import EditProjectsList from "./editProjectsList/EditProjectsList";

const AddProject = ({ handleAddProjectWindow }) => {
  const { user } = useContext(AuthContext);
  const { projects, dispatch } = useContext(ProjectsContext);
  const [showProjectList, setShowProjectList] = useState(projects);
  const [submitErrCheck, setSubmitErrCheck] = useState("");
  const [submitErrFlg, setSubmitErrFlg] = useState(false);
  const [removeProject, setRemoveProject] = useState([]);
  console.log("removeProject", removeProject);

  const addShowList = (project) => {
    const existingListIndex = projects.findIndex(
      (projectList) => projectList.title === project.title
    );
    if (existingListIndex === -1) {
      setShowProjectList((prev) => [...prev, project]);
    }
  };

  const removeShowList = (project) => {
    const existingListIndex = showProjectList.findIndex(
      (projectList) => projectList.title === project.title
    );
    if (existingListIndex !== -1) {
      const chgCategory = showProjectList.slice();
      const removeProject = chgCategory.splice(existingListIndex, 1)[0];
      setRemoveProject((prev) => [...prev, removeProject]);
      setShowProjectList(chgCategory);
    }
  };

  const setErrMsg = (err) => {
    setSubmitErrCheck(err);
  };

  const editProjects = async (e) => {
    e.preventDefault();
    if (submitErrCheck) {
      return setSubmitErrFlg(true);
    } else setSubmitErrFlg(false);

    for (let i = 0; i < e.target.length - 1; i += 3) {
      if (e.target[i].value !== "") {
        const existingTitleIndex = projects.findIndex(
          (projectList) => projectList.title === e.target[i + 2].value
        );
        if (existingTitleIndex !== -1) {
          const existingCodeIndex = projects.findIndex(
            (projectList) => projectList.colorCode === e.target[i + 1].value
          );
          if (existingCodeIndex !== -1) continue;
        }

        try {
          await axios.put(`/projects/${e.target[i].value}`, {
            colorCode: e.target[i + 1].value,
            title: e.target[i + 2].value,
          });
        } catch (err) {
          dispatch({
            type: "PROJECT_CHANGE_FAILURE",
            payload: err,
          });
          console.log("err:", err);
        }
      } else {
        try {
          await axios.post(`/projects/`, {
            userId: user._id,
            title: e.target[i + 2].value,
            colorCode: e.target[i + 1].value,
          });
        } catch (err) {
          dispatch({
            type: "PROJECT_CHANGE_FAILURE",
            payload: err,
          });
          console.log("err:", err);
        }
      }
    }

    removeProject.forEach(async (el) => {
      try {
        await axios.delete(`/projects/${el._id}`);
      } catch (err) {
        dispatch({
          type: "PROJECT_CHANGE_FAILURE",
          payload: err,
        });
        console.log("err:", err);
      }
    });

    const res = await axios.get(`/projects/user/${user._id}`);
    dispatch({ type: "PROJECT_CHANGE", payload: res.data });
    setRemoveProject([]);
    handleAddProjectWindow();
  };

  return (
    <>
      <div
        className='addProjectContainerBack'
        onClick={handleAddProjectWindow}
      />
      <div className='addProjectContainer'>
        <span className='addProjectContainerTitle'>Project List</span>
        <EditProjectsList
          project=''
          mode={true}
          addShowList={addShowList}
          removeShowList={removeShowList}
          setErrMsg={setErrMsg}
        />
        <hr className='editProjectsListHr' />
        <form
          onSubmit={editProjects}
          autoComplete='off'
          className='editProjectForm'
        >
          {showProjectList.map((project, idx) => (
            <EditProjectsList
              project={project}
              mode={false}
              addShowList={addShowList}
              removeShowList={removeShowList}
              setErrMsg={setErrMsg}
              key={idx}
            />
          ))}
          <button className='editProjectFormBtn' type='submit'>
            Submit
          </button>
          {submitErrFlg && (
            <div className='formSubmitInputErr'>{submitErrCheck}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddProject;
