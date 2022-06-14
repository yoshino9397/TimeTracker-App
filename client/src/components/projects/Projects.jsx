import { useContext } from "react";
import "./project.scss";

import { ProjectsContext } from "../../context/ProjectsContext";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";

const Projects = ({ handleModal, setProject, handleEditProjectWindow }) => {
  const { projects } = useContext(ProjectsContext);

  return (
    <>
      <div className='projectsContainerBack' onClick={() => handleModal}></div>
      <div className='projectsContainer'>
        <div className='projectList' onClick={() => setProject("")}>
          <GoPrimitiveDot style={{ fill: "#ccc" }} />
          No Project
        </div>
        <hr className='projectsHr' />
        {projects.map((project, idx) => (
          <div
            key={idx}
            className='projectList'
            onClick={() => setProject(project)}
          >
            <GoPrimitiveDot style={{ fill: `${project.colorCode}` }} />
            {project.title}
          </div>
        ))}
        <hr className='projectsHr' />
        <div className='projectAdd' onClick={handleEditProjectWindow}>
          <AiOutlinePlus />
          Create A New Project
        </div>
      </div>
    </>
  );
};

export default Projects;
