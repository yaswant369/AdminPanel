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
  return <div></div>;
}

export default Project;
