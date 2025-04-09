import React from "react";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  // Base URL for API calls, dynamically set based on the environment
  const baseURL = import.meta.env.DEV
    ? "/api/jobs"
    : "https://67f64a8a42d6c71cca615e86.mockapi.io/api/jobs";

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error("Failed to add the job");
    }
    return await res.json(); // Return the added job data
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete the job");
    }
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`${baseURL}/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    if (!res.ok) {
      throw new Error("Failed to update the job");
    }
    return await res.json(); // Return the updated job data
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-jobs/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
