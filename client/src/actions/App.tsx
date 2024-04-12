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

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>here I'll check if user is logged in or not</div>
  },
  {
    path: "/app",
    element: <MainApp />,
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
        element: <Message />
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
    element: <Registration />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
