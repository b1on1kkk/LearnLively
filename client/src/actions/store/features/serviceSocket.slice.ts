import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ServiceSocket } from "../../api/service-socket/service-socket";

import type { TServiceSocketContent } from "../interfaces/serviceSocket.interface";

const initialState: TServiceSocketContent = {
  service_socket: null
};

export const serviceSocketSlice = createSlice({
  name: "serviceSocketSlice",
  initialState,
  reducers: {
    serviceSocketInit: (state, action: PayloadAction<ServiceSocket | null>) => {
      console.log("service init");

      return {
        ...state,
        service_socket: action.payload
      };
    }
  }
});

export default serviceSocketSlice.reducer;
export const socketAcitons = serviceSocketSlice.actions;
