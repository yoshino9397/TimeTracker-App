import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { ProjectsContext } from "../../context/ProjectsContext";
import "./addProject.scss";
import EditProjectsList from "./editProjectsList/EditProjectsList";

const AddProject = ({ handleAddProjectWindow, color }) => {
  const { user } = useContext(AuthContext);
  const { projects, dispatch } = useContext(ProjectsContext);
  console.log("AddProject", projects);
  const [showProjectList, setShowProjectList] = useState(projects);
  // const [showColorList, setShowColorList] = useState(projects);

  const addShowList = (project, color) => {
    const existingListIndex = projects.findIndex(
      (projectList) => projectList === project
    );
    if (existingListIndex === -1) {
      setShowProjectList((prev) => [...prev, project]);
    } else {
      // const chgColor = showColorList.slice();
      // chgColor.splice(existingListIndex, 1, color);
      // setShowColorList(chgColor);
    }
  };

  const removeShowList = (project) => {
    const existingListIndex = showProjectList.findIndex(
      (projectList) => projectList === project
    );
    if (existingListIndex !== -1) {
      const chgCategory = showProjectList.slice();
      // const chgColor = showColorList.slice();
      chgCategory.splice(existingListIndex, 1);
      // chgColor.splice(existingListIndex, 1);
      setShowProjectList(chgCategory);
      // setShowColorList(chgColor);
    }
  };

  // const loadProjects = async () => {
  //   try {
  //     const res = await axios.get(`/projects/user/${user._id}`);
  //     dispatch({ type: "PROJECT_CHANGE", payload: res.data });
  //   } catch (err) {
  //     dispatch({ type: "PROJECT_CHANGE_FAILURE", payload: err.response.data });
  //     console.log("err:", err);
  //   }
  // };

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
          color=''
          mode={true}
          addShowList={addShowList}
          removeShowList={removeShowList}
        />
        <form
          // onSubmit={editCategory}
          autoComplete='off'
          className='editProjectForm'
        >
          {showProjectList.map((project, idx) => (
            <EditProjectsList
              project={project}
              mode={false}
              addShowList={addShowList}
              removeShowList={removeShowList}
              key={idx}
            />
          ))}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddProject;
