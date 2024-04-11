import {
  SortingAction,
  SortingActionKind,
  SortingState
} from "../../interfaces/Students/SortReducer";

export function sortingReducer(state: SortingState, action: SortingAction) {
  const { type, payload } = action;

  switch (type) {
    case SortingActionKind.ID:
      return {
        ...state,
        idSorting: payload.idSorting
      };
    case SortingActionKind.NAME:
      return {
        ...state,
        nameSorting: payload.nameSorting
      };

    default:
      return state;
  }
}
