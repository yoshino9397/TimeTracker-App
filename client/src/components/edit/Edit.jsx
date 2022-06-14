import "./edit.scss";

const Edit = ({ handleModal, checkBoxData }) => {
  console.log("edit data", checkBoxData);

  return (
    <>
      <div className='editContainerBack' onClick={handleModal}></div>
      <div className='editContainer'>
        <form
          noValidate
          autoComplete='off'
          className='rForm'
          id='rForm'
          // onSubmit={handleSubmit}
        >
          <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label
                htmlFor='taskName'
                // className={`rInputLabel ${emailLabelCss} ${
                //   emailErr ? 'labelErr' : ''
                // }`}
              >
                Task Name
              </label>
              <input
                type='text'
                id='taskName'
                // ref={email}
                // className={`rInput ${emailErr ? 'inputErr' : ''}`}
                // onBlur={handleBlur}
              />
            </div>
            {/* {emailErr && <div className='rInputErr'>{emailErr}</div>} */}
          </div>
          <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label
                htmlFor='project'
                // className={`rInputLabel ${passLabelCss} ${
                //   passErr ? 'labelErr' : ''
                // }`}
              >
                Project
              </label>
              {/* <select id='project' name='project' defaultValue='project test'>
                {projects.map((project, idx) => (
                  <option value={project.title} key={idx}>
                    {project.title}
                  </option>
                ))}
              </select> */}
            </div>
            {/* {passErr && <div className='rInputErr'>{passErr}</div>} */}
          </div>
          <button id='Save' className='save' type='submit'>
            Save
          </button>
          {/* {axiosErr && <span className='rSubmitErr'>{axiosErr}</span>} */}
        </form>
      </div>
    </>
  );
};

export default Edit;
