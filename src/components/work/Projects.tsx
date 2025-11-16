import { ProjectCard } from '@/components';
import { getPosts } from '@/utils/utils';
import { Column } from '@once-ui-system/core';

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

// Define your custom project order here (by slug)
const PROJECT_ORDER = [
  'theBomb', // 1st - TheBomb project
  'molteni', // 2nd - Replace with your second project slug
  'fundingpips', // 3rd - Replace with your third project slug
  'vml', // 4th - Replace with your fourth project slug
  'trulia-eu', // 4th - Replace with your fourth project slug
  'vtex', // 4th - Replace with your fourth project slug
  // Add more project slugs in the order you want them displayed
];

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(['src', 'app', 'work', 'projects']);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter(post => !exclude.includes(post.slug));
  }

  // Sort projects by custom order
  const sortedProjects = allProjects.sort((a, b) => {
    const indexA = PROJECT_ORDER.indexOf(a.slug);
    const indexB = PROJECT_ORDER.indexOf(b.slug);

    // If both projects are in the custom order, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only A is in custom order, it comes first
    if (indexA !== -1) return -1;

    // If only B is in custom order, it comes first
    if (indexB !== -1) return 1;

    // If neither is in custom order, sort by date (newest first)
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap='xl' marginBottom='40' paddingX='l'>
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={
            post.metadata.team?.map(member => ({ src: member.avatar })) || []
          }
          link={post.metadata.link || ''}
        />
      ))}
    </Column>
  );
}
