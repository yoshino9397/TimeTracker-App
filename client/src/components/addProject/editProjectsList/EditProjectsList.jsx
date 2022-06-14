import { useState, useRef, useEffect } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { SketchPicker } from "react-color";

import "./editProjectsList.scss";

const EditProjectsList = ({
  project,
  // color,
  mode,
  addShowList,
  removeShowList,
}) => {
  const refAddCategory = useRef();
  const refAddColor = useRef();
  const [sketchPickerColor, setSketchPickerColor] = useState(
    project.colorCode ? project.colorCode : "#ef93b6"
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  let clickCount = 0;

  useEffect(() => {
    setSketchPickerColor(project.colorCode ? project.colorCode : "#ef93b6");
  }, [project.colorCode]);

  const displayChange = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleSingleOrDoubleClick = () => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          if (!mode) {
            removeShowList(project);
          }
        } else {
          if (mode) {
            const projectData = refAddCategory.current.value;
            const colorData = refAddColor.current.value;
            addShowList(projectData, colorData);
            refAddCategory.current.value = "";
            setSketchPickerColor("#ef93b6");
          }
        }
        clickCount = 0;
      }, 200);
    }
  };

  return (
    <div className='editProjectFormContainer'>
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
      <label
        htmlFor='project-List'
        // key={project}
        className='editProjectFormLabel'
      ></label>
      <input
        type='text'
        id='project-List'
        name='project-List'
        defaultValue={project.title}
        className='editProjectFormInput'
        required
        autoComplete='off'
        ref={refAddCategory}
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
  );
};

export default EditProjectsList;
