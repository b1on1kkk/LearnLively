import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { Student } from "../interfaces/Students/Main";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { studentsActions } from "../store/features/students.slice";

const useStudents = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery<Array<Student>, AxiosError>({
    queryKey: ["api", "students"],
    queryFn: async () => {
      return await axios
        .get<Array<Student> | null>(`${QUERY_ROOT}api/students`, {
          withCredentials: true
        })
        .then((res) => {
          dispatch(studentsActions.initStudents(res.data));
          return res.data;
        })
        .catch((err) => err);
    },
    enabled: false
  });
};

export default useStudents;
