import {
  About,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from '@/types';

const person: Person = {
  firstName: 'Teamgineer',
  lastName: 'Tech',
  name: `Teamgineer Tech`,
  role: 'Global Engineering Team',
  avatar: '/images/avatar.jpg',
  email: 'eng.moe.osman@gmail.com',
  location: 'Asia/Dubai',
  languages: ['English', 'Arabic', 'Polish'],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Our weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/company/teamgineer-tech/',
  },
  {
    name: 'Email',
    icon: 'email',
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: '/',
  image: '/images/og/home.jpg',
  label: 'Home',
  title: `Teamgineer Tech - From Idea to Product`,
  description: `Global team of expert developers helping SMEs turn bold ideas into shippable products`,
  headline: <>Teamgineer</>,
  featured: {
    display: false,
    title: <></>,
    href: '',
  },
  subline: <>From your bold idea to their favorite product.</>,
};

const about: About = {
  path: '/about',
  label: 'About',
  title: `About – ${person.name}`,
  description: `Global team of experts helping SMEs globally`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: '',
  },
  intro: {
    display: true,
    title: 'Who We Are',
    description: (
      <>
        SMEs face a universal challenge: translating bold ideas into shipped
        products, efficiently. We solve this. We are a global team of expert
        developers and problem-solvers built to be the extension of your
        leadership. We move at your pace, align with your vision, and are
        measured by the success of your outcomes. Our mission is simple:
        removing the technical friction from your path to growth, allowing you
        to lead your market.
      </>
    ),
  },
  work: {
    display: true,
    title: 'How We Help',
    experiences: [
      {
        company: 'Stand Out from the Crowd',
        timeframe: '',
        role: 'Unique Solutions Engineering',
        achievements: [
          <>
            We don't build generic solutions. We engineer the unique features
            and flawless experiences that become your brand's signature.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false,
    title: 'Studies',
    institutions: [],
  },
  technical: {
    display: true,
    title: 'Our Expertise',
    skills: [
      {
        title: 'Web Development',
        description: (
          <>
            Expert full-stack development powering your digital presence with
            cutting-edge technologies and best practices.
          </>
        ),
        tags: [
          {
            name: 'React',
            icon: 'reactjs',
          },
          {
            name: 'Next.js',
            icon: 'nextjs',
          },
          {
            name: 'Vue',
            icon: 'vuejs',
          },
          {
            name: 'Angular',
            icon: 'angularjs',
          },
          {
            name: 'Laravel',
            icon: 'laravel',
          },
          {
            name: 'Spring Boot',
            icon: 'spring',
          },
          {
            name: 'Golang',
            icon: 'golang',
          },
        ],
        images: [],
      },
      {
        title: 'Cloud & Infrastructure',
        description: (
          <>
            Scalable cloud solutions and infrastructure management to ensure
            your applications run smoothly and securely.
          </>
        ),
        tags: [
          {
            name: 'AWS',
            icon: 'aws',
          },
          {
            name: 'Azure',
            icon: 'azure',
          },
          {
            name: 'Kubernetes',
            icon: 'kubernetes',
          },
        ],
        images: [],
      },
      {
        title: 'Graphic Design',
        description: (
          <>
            Creating stunning visual identities that define your brand and
            captivate your audience across all platforms and mediums.
          </>
        ),
        tags: [
          {
            name: 'Figma',
            icon: 'figma',
          },
          {
            name: 'Photoshop',
            icon: 'photoshop',
          },
          {
            name: 'Adobe Creative Suite',
            icon: 'adobe',
          },
        ],
        images: [],
      },
      {
        title: 'Brand Guidelines',
        description: (
          <>
            Comprehensive brand systems that establish consistency, build trust,
            and ensure your brand identity remains cohesive across every
            customer touchpoint. We create detailed guidelines that empower your
            team to maintain brand integrity.
          </>
        ),
        tags: [
          {
            name: 'Logo Systems',
            icon: 'logo',
          },
          {
            name: 'Color Palettes',
            icon: 'palette',
          },
          {
            name: 'Typography',
            icon: 'text',
          },
          {
            name: 'Brand Voice',
            icon: 'mic',
          },
          {
            name: 'Visual Assets',
            icon: 'image',
          },
        ],
        images: [],
      },
      {
        title: 'Motion Design',
        description: (
          <>
            Dynamic visual storytelling that brings your brand to life through
            engaging animations, micro-interactions, and cinematic experiences.
            From UI animations to promotional videos, we create motion that
            captivates and communicates your brand's personality.
          </>
        ),
        tags: [
          {
            name: 'UI Animations',
            icon: 'layout',
          },
          {
            name: 'Explainer Videos',
            icon: 'video',
          },
          {
            name: '3D Motion',
            icon: 'cube',
          },
          {
            name: 'After Effects',
            icon: 'film',
          },
          {
            name: 'Lottie',
            icon: 'animation',
          },
        ],
        images: [],
      },
    ],
  },
};

const work: Work = {
  path: '/work',
  label: 'Work',
  title: 'Our Creative Web Work',
  description: `Showcasing our shared success stories, wearing your brand`,
};

const gallery: Gallery = {
  path: '/gallery',
  label: 'Gallery',
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: '/images/gallery/horizontal-1.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/vertical-4.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/horizontal-3.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/vertical-1.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/vertical-2.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/horizontal-2.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/horizontal-4.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/vertical-3.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
  ],
};

export { about, gallery, home, newsletter, person, social, work };
