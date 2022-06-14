import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  projects: null,
  error: null,
};

export const ProjectsContext = createContext(INITIAL_STATE);

const ProjectsReducer = (state, action) => {
  switch (action.type) {
    case "PROJECT_CHANGE":
      return {
        projects: action.payload,
        error: null,
      };
    case "PROJECT_CHANGE_FAILURE":
      return {
        projects: state.projects,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectsReducer, INITIAL_STATE);

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
