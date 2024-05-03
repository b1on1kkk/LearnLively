import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store/store";
import { messagesActions } from "../../store/features/messages.slice";
import type { ActionPayload } from "../../store/interfaces/messagesActionPayload";
import { MessageActionKind } from "../../interfaces/Message/Chats";
import { TMessage } from "../../interfaces/api/newChat";

export class DispatchActionsHandler {
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;

  constructor(dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>) {
    this.reduxDispatch = dispatch;
  }

  public messageInitHandler(data: ActionPayload) {
    this.reduxDispatch(messagesActions.messageInit(data));
  }

  public messageActionsHandler(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    messages: Array<TMessage>,
    message: TMessage
  ) {
    const action = e.currentTarget.dataset.key as MessageActionKind;

    this.reduxDispatch(
      messagesActions.messageInit({
        messages: messages,
        chosenMessage: {
          type: action,
          message_data: message
        }
      })
    );
  }

  public messageDisableActionHandler(messages: Array<TMessage>) {
    this.reduxDispatch(
      messagesActions.messageInit({ messages: messages, chosenMessage: null })
    );
  }
}
