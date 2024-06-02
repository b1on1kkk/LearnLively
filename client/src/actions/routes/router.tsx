import { createBrowserRouter } from "react-router-dom";

import { Exam } from "../views/Exam/Exam";
import { Login } from "../views/Login/Login";
import { Signup } from "../views/Signup/Signup";
import { Courses } from "../views/Courses/Courses";
import { MainApp } from "../views/MainApp/MainApp";
import { Message } from "../views/Message/Message";
import { Results } from "../views/Results/Results";
import { Routine } from "../views/Routine/Results";
import { Students } from "../views/Students/Students";
import { Dashboard } from "../views/Dashboard/Dashboard";
import { LiveClass } from "../views/LiveClass/LiveClass";
import { NoticeBoard } from "../views/NoticeBoard/NoticeBoard";
import { Registration } from "../views/Registration/Registration";

import { Chat } from "../components/MessagesComp/Chat";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { MessageDefender } from "../components/MessageDefender/MessageDefender";
import { RegistrationGuard } from "../components/RegistrationGuard/RegistrationGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainApp />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "courses",
        element: <Courses />
      },
      {
        path: "routine",
        element: <Routine />
      },
      {
        path: "exam",
        element: <Exam />
      },
      {
        path: "results",
        element: <Results />
      },
      {
        path: "students",
        element: <Students />
      },
      {
        path: "message",
        element: <Message />,
        children: [
          {
            path: ":id",
            element: (
              <MessageDefender>
                <Chat />
              </MessageDefender>
            )
          }
        ]
      },
      {
        path: "notice_board",
        element: <NoticeBoard />
      },
      {
        path: "live_class",
        element: <LiveClass />
      }
    ]
  },
  {
    path: "/registration",
    element: (
      <RegistrationGuard>
        <Registration />
      </RegistrationGuard>
    ),
    children: [
      {
        path: "login",
        element: (
          <RegistrationGuard>
            <Login />
          </RegistrationGuard>
        )
      },
      {
        path: "signup",
        element: (
          <RegistrationGuard>
            <Signup />
          </RegistrationGuard>
        )
      }
    ]
  }
]);

export default router;
