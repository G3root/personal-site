import { createResource } from "solid-js";
import { getProjects } from "../api/getProjects";
import { ProjectCard } from "./project-card";

export const ProjectList = () => {
  const [projects] = createResource(getProjects);
  return (
    <div>
      {projects()?.data.map((item) => (
        <div>
          <h2
            data-animate
            style={{ "--stagger": 2 }}
            class="mt-10 text-2xl  font-extrabold tracking-tight "
          >
            {item.title}
          </h2>

          <div
            data-animate
            style={{ "--stagger": 3 }}
            class="grid grid-cols-1 md:grid-cols-3 mt-2"
          >
            {item.Projects.map((project) => (
              <ProjectCard
                description={project.description}
                link={project.link}
                title={project.title}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
