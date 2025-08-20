import React from "react";

function Project() {
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
