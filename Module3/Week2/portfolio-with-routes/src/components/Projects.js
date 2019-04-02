// components/Projects.js
import React from 'react';
import { Link } from 'react-router-dom';

export  const myProjects = [
    {
        id: "1a",
        name: "2D Shoot 'em UP",
        year: 2018,
        technologies: "JavaScript, Canvas",
        description: "The first project game clone."
    },
    {
        id: "2b",
        name: "21FitTrack",
        year: 2019,
        technologies: "Mongo DB, ExpressJS, NodeJS, JavaScript, HTML, CSS",
        description: "Web App that allows logged in users to track their progress."
    },
    {
        id: "3c",
        name: "Travel Planner",
        year: 2019,
        technologies: "Mongo DB, ExpressJS, React, NodeJS, JavaScript, HTML, CSS",
        description: "Web App that allows logged in users to share their experiences about travel destinations."
    }
  ]
export const Projects = () => {
 
  return (
    <div>
      <h2>Projects:</h2>
      {myProjects.map((eachProject, index) => {
        return (
          <div key={eachProject.id}>
            <h3>
              <Link to={`/projects/${eachProject.id}`}>{eachProject.name}</Link>
            </h3>
            <h4>{eachProject.technologies}</h4>
            <hr />
          </div>
        )
      })}
  </div>
  )
}




