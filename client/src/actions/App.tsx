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

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>here I'll check if user is logged in</div>,
    children: []
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
    path: "/login",
    element: <div>login page</div>
  },
  {
    path: "/registration",
    element: <div>signup</div>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
