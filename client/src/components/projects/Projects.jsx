import axios from "axios";
import "./project.scss";

const Projects = ({ handleModal }) => {
  const loadProjects = async () => {
    // const res = await axios.get(`/projects/user`);
    // if (res.status === 200) {
    //   // res.data.map((val) => { })
    // }
  };

  return (
    <>
      <div className='projectsContainerBack' onClick={handleModal}></div>
      <div className='projectsContainer'>Projects</div>
    </>
  );
};

export default Projects;
