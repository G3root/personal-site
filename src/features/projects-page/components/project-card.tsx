import type { Component } from "solid-js";

interface ProjectCardProps {
  link: string;
  title: string;
  description: string | null;
}

export const ProjectCard: Component<ProjectCardProps> = (props) => {
  const { description, link, title } = props;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      class="py-4 px-3 hover:bg-slate-2"
      aria-label={title}
    >
      <div class="text-lg font-bold">{title}</div>
      <div class="mt-2 font-mono text-slate-11 text-sm">{description}</div>
    </a>
  );
};
