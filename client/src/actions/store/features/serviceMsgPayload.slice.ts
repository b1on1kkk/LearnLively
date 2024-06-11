import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { SystemMessage } from "../../interfaces/MainApp/SystemMessage";

import { INITIAL_SERVICE_MESSAGE } from "../../constants/MainApp/initialServiceMessage";

const initialState: SystemMessage = { ...INITIAL_SERVICE_MESSAGE };

export const serviceMsgPayload = createSlice({
  name: "serviceMsgPayload",
  initialState,
  reducers: {
    serviceMsgInit: (state, action: PayloadAction<SystemMessage>) => {
      return action.payload;
    }
  }
});

export default serviceMsgPayload.reducer;
export const serviceMsgAcitons = serviceMsgPayload.actions;
