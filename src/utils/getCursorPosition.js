import { DEFAULT_WORKSPACE, WORKSPACE_DOMAIN } from "./constants";

export const getCursorPosition = (workspace, start) => {

  let defaultPosition = DEFAULT_WORKSPACE.length - WORKSPACE_DOMAIN.length;
  let position = defaultPosition;

  if (workspace) {
    if (start <= defaultPosition) {
      position = start;
    } else {
      position = workspace.length - WORKSPACE_DOMAIN.length;
    }
  }

  return {
    start: position,
    end: position,
  };
};