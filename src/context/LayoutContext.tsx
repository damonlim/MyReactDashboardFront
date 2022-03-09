import React from "react";
import PropTypes from "prop-types";


interface State {
  isSidebarOpened: boolean;
}
type Action = {
  type: string;
}

const LayoutStateContext = React.createContext<undefined | State>(undefined);
const LayoutDispatchContext = React.createContext<undefined | React.Dispatch<Action>>(undefined);

function layoutReducer(state:State, action:Action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default:
      return state;
  }
}

function LayoutProvider({ children }: { children: React.ReactNode}) {
  var [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: true,
  });
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  var context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error(
      "Please contact the administrator. LayoutStateContext is not defined."
    );
  }
  return context;
}

function useLayoutDispatch() {
  var context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error(
      "Please contact the administrator. LayoutDispatchContext is not defined."
    );
  }
  return context;
}

const toggleSidebar = (dispatch:React.Dispatch<Action>) => {
  dispatch({
    type: "TOGGLE_SIDEBAR",
  });
};

LayoutProvider.propTypes = {
  children: PropTypes.any,
};

export {
  LayoutProvider,
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
  LayoutStateContext,
};
