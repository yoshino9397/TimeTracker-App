import { useState, useRef, useEffect, useContext } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { SketchPicker } from "react-color";

import { AuthContext } from "../../../context/AuthContext";
import "./editProjectsList.scss";

const DEFAULT_COLOR = "#ef93b6";
const EditProjectsList = ({
  project,
  mode,
  addShowList,
  removeShowList,
  setErrMsg,
}) => {
  const { user } = useContext(AuthContext);
  const refAddProject = useRef();
  const refAddColor = useRef();
  const [inputErr, setInputErr] = useState("");
  const [sketchPickerColor, setSketchPickerColor] = useState(
    project.colorCode ? project.colorCode : DEFAULT_COLOR
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    setSketchPickerColor(project.colorCode ? project.colorCode : DEFAULT_COLOR);
  }, [project.colorCode]);

  const displayChange = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setInputErr("Please enter project name");
      if (!mode) setErrMsg("Please enter project name");
    } else {
      setInputErr("");
      if (!mode) setErrMsg("");
    }
  };

  const handleSingleOrDoubleClick = () => {
    if (inputErr === "") {
      if (!mode) {
        removeShowList(project);
      } else {
        const projectData = refAddProject.current.value;
        const colorData = refAddColor.current.value;
        addShowList({
          colorCode: colorData,
          title: projectData,
          userId: user._id,
        });
        refAddProject.current.value = "";
        setSketchPickerColor(DEFAULT_COLOR);
      }
    }
  };

  return (
    <div className='editProjectFormContainer'>
      <div className='formInputSetContainer'>
        <input type='hidden' name='project-id' value={project._id} />
        <span
          className='editProjectFormColorIcon'
          style={{ backgroundColor: sketchPickerColor }}
          onClick={displayChange}
        ></span>
        {displayColorPicker && (
          <>
            <div
              className='editProjectFormColorPaletteClose'
              onClick={displayChange}
            ></div>
            <SketchPicker
              onChange={(color) => {
                setSketchPickerColor(color.hex);
              }}
              color={sketchPickerColor}
              className='editProjectFormColorPalette'
            />
          </>
        )}
        <input
          type='hidden'
          name='project-color'
          value={sketchPickerColor}
          className='editProjectFormInput'
          ref={refAddColor}
        />
        <label htmlFor='project-List' className='editProjectFormLabel'></label>
        <input
          type='text'
          id='project-List'
          name='project-List'
          placeholder='Enter Project Name'
          defaultValue={project.title}
          className={`editProjectFormInput ${
            inputErr ? "editProjectFormInputErr" : ""
          }`}
          ref={refAddProject}
          onBlur={handleBlur}
        />
        {mode ? (
          <BiEdit
            className='editProjectFormIconEdit'
            onClick={() => handleSingleOrDoubleClick()}
          />
        ) : (
          <BiTrash
            className='editProjectFormIconDelete'
            onClick={() => handleSingleOrDoubleClick()}
          />
        )}
      </div>
      {inputErr && <div className='formInputErr'>{inputErr}</div>}
    </div>
  );
};

export default EditProjectsList;
