import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Dashboard } from "./views/Dashboard/Dashboard";
import { Courses } from "./views/Courses/Courses";
import { Routine } from "./views/Routine/Results";
import { Exam } from "./views/Exam/Exam";
import { Results } from "./views/Results/Results";
import { Students } from "./views/Students/Students";
import { Message } from "./views/Message/Message";
import { NoticeBoard } from "./views/NoticeBoard/NoticeBoard";
import { LiveClass } from "./views/LiveClass/LiveClass";
import { MainApp } from "./views/MainApp/MainApp";
import { Registration } from "./views/Registration/Registration";
import { Login } from "./views/Login/Login";
import { Signup } from "./views/Signup/Signup";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RegistrationGuard } from "./components/RegistrationGuard/RegistrationGuard";

import { MyGlobalContext } from "./context/GlobalContext/globalContext";

import type { User } from "./interfaces/Registration/Validation";

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
        )
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

function App() {
  const [user, userSetter] = useState<User | Record<string, never>>({});

  console.log(user);

  return (
    <MyGlobalContext.Provider value={{ user, userSetter }}>
      <RouterProvider router={router} />
    </MyGlobalContext.Provider>
  );
}

export default App;
