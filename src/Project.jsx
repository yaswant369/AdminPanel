import React, { useState, useEffect } from "react";

function Project() {
  const [projects, setProjects] = useState([
    { id: 1, title: "AI Chatbot", mentor: "Dr. Reddy", students: 15 },
    { id: 2, title: "Resume Builder", mentor: "Ms. Sharma", students: 25 },
    { id: 3, title: "Data Analysis Tool", mentor: "Dr. Singh", students: 10 },
  ]);

  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectMentor, setNewProjectMentor] = useState("");
  const [newProjectStudents, setNewProjectStudents] = useState("");
  const addProject = () => {
    if (
      newProjectTitle.trim() &&
      newProjectMentor.trim() &&
      newProjectStudents.trim()
    ) {
      const newId =
        projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects([
        ...projects,
        {
          id: newId,
          title: newProjectTitle,
          mentor: newProjectMentor,
          students: parseInt(newProjectStudents, 10) || 0, // Parse as int, default to 0
        },
      ]);
      setNewProjectTitle("");
      setNewProjectMentor("");
      setNewProjectStudents("");
    }
  };
  const updateProjectStudents = (id, newStudentCount) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, students: parseInt(newStudentCount, 10) || 0 }
          : project
      )
    );
  };
  const removeProject = (id) => {
    const filtered = projects.filter((proj) => proj.id !== id);
    setProjects(filtered);
  };
  return (
    <div>
      <section
        id="projects"
        className="bg-white p-4 sm:p-6 mb-6 rounded-xl shadow-md"
      >
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
          Manage Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="Enter project title..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mentor Name
            </label>
            <input
              type="text"
              value={newProjectMentor}
              onChange={(e) => setNewProjectMentor(e.target.value)}
              placeholder="Enter mentor name..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Students
            </label>
            <input
              type="number"
              value={newProjectStudents}
              onChange={(e) => setNewProjectStudents(e.target.value)}
              placeholder="Enter number..."
              min="0"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={addProject}
          className="mb-6 bg-[#0781d9] hover:bg-[#025e9f] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Add Project
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-4 shadow-zinc-300 rounded-lg shadow-sm  hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Mentor: <span className="font-medium">{project.mentor}</span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Students:{" "}
                <span className="font-medium">{project.students}</span>
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => removeProject(project.id)}
                  className="flex-1 bg-[#fe4d35] hover:bg-[#f52f15] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Remove
                </button>

                <button className="flex-1  bg-[#01c1b6] hover:bg-[#09706b] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                  Upskill
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Project;
