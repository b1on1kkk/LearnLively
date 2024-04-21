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
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        )
      },
      {
        path: "routine",
        element: (
          <ProtectedRoute>
            <Routine />
          </ProtectedRoute>
        )
      },
      {
        path: "exam",
        element: (
          <ProtectedRoute>
            <Exam />
          </ProtectedRoute>
        )
      },
      {
        path: "results",
        element: (
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        )
      },
      {
        path: "students",
        element: (
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        )
      },
      {
        path: "message",
        element: (
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <NoticeBoard />
          </ProtectedRoute>
        )
      },
      {
        path: "live_class",
        element: (
          <ProtectedRoute>
            <LiveClass />
          </ProtectedRoute>
        )
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
