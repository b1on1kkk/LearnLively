import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { Student } from "../interfaces/Students/Main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { studentsActions } from "../store/features/students.slice";

const useStudents = (openModalStatus: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const { students } = useSelector((c: RootState) => c.students);

  return useQuery<Array<Student>, AxiosError>({
    queryKey: ["api", "students", openModalStatus],
    queryFn: async () => {
      if (openModalStatus) {
        return await axios
          .get<Array<Student> | null>(`${QUERY_ROOT}api/students`, {
            withCredentials: true
          })
          .then((res) => {
            dispatch(studentsActions.initStudents(res.data));
            return res.data;
          })
          .catch((err) => err);
      }

      return students;
    },
    staleTime: 0
  });
};

export default useStudents;
