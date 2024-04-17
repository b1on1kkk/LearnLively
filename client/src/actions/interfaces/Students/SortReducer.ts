import { ReactElement } from "react";

export enum SortingActionKind {
  ID = "ID",
  NAME = "NAME"
}

export interface SortingAction {
  type: SortingActionKind;
  payload: {
    nameSorting: {
      value: "asc" | "desc";
      status: boolean;
    };
    idSorting: {
      value: "asc" | "desc";
      status: boolean;
    };
  };
}

export interface SortingState {
  nameSorting: {
    value: "asc" | "desc";
    status: boolean;
  };
  idSorting: {
    value: "asc" | "desc";
    status: boolean;
  };
}

type Filter = "name" | "id" | "none";

export interface THeader {
  id: number;
  className: string;
  filter: Filter;
  title: string;
  icon?: ReactElement;
  type?: SortingActionKind;
}

export interface TDropdownFilter {
  key: string;
  description: string;
  startContent: ReactElement;
  text: string;
}

export interface THeaderFilterButton {
  value: string;
  status: boolean;
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
