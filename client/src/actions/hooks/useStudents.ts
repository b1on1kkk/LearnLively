import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { Student } from "../interfaces/Students/Main";

const useStudents = () => {
  return useQuery<Array<Student>, AxiosError>({
    queryKey: ["api", "students"],
    queryFn: () =>
      axios
        .get<Array<Student>>(`${QUERY_ROOT}api/students`, {
          withCredentials: true
        })
        .then((res) => res.data)
  });
};

export default useStudents;
