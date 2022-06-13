import "./addProject.scss";

const AddProject = ({ handleAddProjectWindow }) => {
  console.log("AddProject");

  return (
    <div className='addProjectContainerBack' onClick={handleAddProjectWindow}>
      AddProject
    </div>
  );
};

export default AddProject;
