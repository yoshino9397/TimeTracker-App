import { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./project.scss";

import { AuthContext } from "../../context/AuthContext";
import { GoPrimitiveDot } from "react-icons/go";

const Projects = ({ handleModal, setProject }) => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const res = await axios.get(`/projects/user/${user._id}`);
    if (res.status === 200) {
      setProjects(res.data);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

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
      </div>
    </>
  );
};

export default Projects;
