import { serviceMsgAcitons } from "../../store/features/serviceMsgPayload.slice";
import { AppDispatch } from "../../store/store";

import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export class ServiceNotificationHandler {
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;

  constructor(dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>) {
    this.reduxDispatch = dispatch;
  }

  public friendRequest(username: string) {
    this.reduxDispatch(
      serviceMsgAcitons.serviceMsgInit({
        message_color: "border-primary-500 text-primary-500",
        text: `
        <span>
            Friend request to <span className="underline underline-offset-1">${username}</span> was sent!
        </span>
        `,
        status: true,
        image: "Send"
      })
    );
  }

  public confirmFriendRequest(username: string) {
    this.reduxDispatch(
      serviceMsgAcitons.serviceMsgInit({
        message_color: "border-primary-500 text-primary-500",
        text: `
        <span>
            <span className="underline underline-offset-1">${username}</span>
            is your friend now!
        </span>
        `,
        status: true,
        image: "Handshake"
      })
    );
  }

  public createGroupRequest() {
    this.reduxDispatch(
      serviceMsgAcitons.serviceMsgInit({
        message_color: "border-primary-500 text-primary-500",
        text: `
        <span>
            Group was created!
        </span>
        `,
        status: true,
        image: "UsersRound"
      })
    );
  }

  public deleteMessage() {
    this.reduxDispatch(
      serviceMsgAcitons.serviceMsgInit({
        message_color: "border-primary-500 text-primary-500",
        text: `
        <span>
            Messages were deleted successfully!
        </span>
        `,
        status: true,
        image: "CircleCheckBig"
      })
    );
  }

  public changeMessage() {
    this.reduxDispatch(
      serviceMsgAcitons.serviceMsgInit({
        message_color: "border-primary-500 text-primary-500",
        text: `
        <span>
            Message was changed successfully!
        </span>
        `,
        status: true,
        image: "PenLine"
      })
    );
  }

  public errorHandler() {
    this.reduxDispatch(
      serviceMsgAcitons.serviceMsgInit({
        message_color: "border-red-500 text-red-500",
        text: `
        <span>
            Server error occured!
        </span>
        `,
        status: true,
        image: "Frown"
      })
    );
  }
}
