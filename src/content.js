export const asset = (file) => import.meta.env.BASE_URL + file;

export const portfolio = {
  profile: {
    name: 'Cedrick D. Umali',
    title: 'Graphic Design & UI/UX',
    tagline: 'I design brand identities, digital content, and clear, responsive web interfaces.',
    headline: "I'm Cedrick!",
    bio: [
      'I’m pursuing a BS in Information Technology, majoring in Web Systems Technology at Nueva Ecija University of Science and Technology. My interests include graphic design, visual communication, and digital content creation.',
      'Through academic and personal projects, I’ve created branding materials, social media graphics, presentations, and promotional designs. I work with Canva, Adobe Photoshop, and Figma, with particular attention to layout, typography, and visual consistency.',
    ],
    heroPortrait: 'assets/cedrick-hero.jpg',
    heroPortraitAlt: 'Cedrick Umali against an orange backdrop',
    portrait: 'assets/cedrick-about.png',
    portraitAlt: 'Cedrick Umali in a deep forest green suit and glasses',
    portraitLabels: ['Graphic Design & UI/UX', 'Nueva Ecija, Philippines'],
    cv: '',
  },
  projects: [
    {
      id: 'linaraya', title: 'LINARAYA', category: 'Capstone · Web application', context: 'BSIT capstone · 2026',
      description: 'A cross-platform web application for waste reporting with geospatial mapping and analysis in Barangay Dulong Bayan, Quezon, Nueva Ecija.',
      problem: 'Barangay personnel needed a consistent way to document waste incident locations, track report status, and identify areas with recurring reports.',
      role: 'Capstone project leader and user interface designer.',
      process: 'Our team used Agile Scrum to build a responsive reporting flow for residents and a GIS dashboard for barangay personnel. I designed interfaces for submitting and tracking reports and reviewing incidents on the map.',
      result: 'Residents can file reports with photos and pinned locations. Barangay personnel can verify and manage reports and use interactive maps and heatmaps to see where reports cluster.',
      tools: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'PHP', 'MySQL', 'Leaflet', 'Leaflet.heat', 'OpenStreetMap', 'ArcGIS'],
      cover: 'assets/linaraya-cover.png',
      logo: 'assets/linaraya-logo.png',
      demoVideo: 'assets/linaraya-system-walkthrough.mp4',
      demoCaption: 'System walkthrough',
      demoPoster: 'assets/linaraya-walkthrough-poster.jpg',
      gallery: [
        {
          image: 'assets/linaraya-landing.png', label: 'Public landing page', wide: true,
          alt: 'LINARAYA landing page with resident and guest reporting options and a barangay cleanup photograph',
        },
        {
          image: 'assets/linaraya-registration.png', label: 'Resident registration', wide: true,
          alt: 'LINARAYA account registration with email or SMS verification, purok selection, and password fields',
        },
        {
          image: 'assets/linaraya-dashboard.png', label: 'Administrator dashboard', wide: true,
          alt: 'LINARAYA administrator dashboard showing report statuses, submission trends, and report counts by purok',
        },
      ],
    },
    {
      id: 'beezee', title: 'Beezee', category: 'Social media app design', context: 'Second-year college project',
      deviceCover: 'assets/beezee-splash.png',
      description: 'A social media app concept I designed in my second year of college. Beezee brings posts, profiles, and conversations into one mobile experience.',
      role: 'UI/UX designer.',
      process: 'Designed the mobile layouts for the home feed, user profile, and Honeychat messaging.',
      result: 'A Figma design showing how people can browse posts, update a profile, and find conversations.',
      tools: ['Figma'],
      screens: [
        { image: 'assets/beezee-home.png', label: 'Home feed' },
        { image: 'assets/beezee-profile.png', label: 'Profile' },
        { image: 'assets/beezee-chats.png', label: 'Honeychat' },
      ],
      designUrl: 'https://www.figma.com/design/7vVArFEe2sMbad5CA94bi4/BEEZEE-SOCMED-APP?node-id=0-1',
    },
    {
      id: 'resq', title: 'ResQ', category: 'Educational game design', context: 'App concept',
      deviceCover: 'assets/resq-cover.png',
      description: 'A disaster readiness game concept that helps kids learn through play. Guided by Ricky ResQ, players explore an earthquake scenario and answer a quiz about what to do.',
      role: 'UI/UX designer.',
      process: 'Designed the flow from choosing a hero to reading the quest briefing, playing through the earthquake scenario, and answering a follow-up question.',
      result: 'A Figma concept showing how kids can practice making decisions in an emergency scenario.',
      tools: ['Figma'],
      screens: [
        { image: 'assets/resq-heroes.png', label: 'Hero selection' },
        { image: 'assets/resq-quest.png', label: 'Earthquake quest' },
        { image: 'assets/resq-game.png', label: 'Earthquake scenario' },
        { image: 'assets/resq-quiz.png', label: 'Quiz' },
      ],
      designUrl: 'https://www.figma.com/design/5qsP8hSNNTRRQBLwcwyiTe/Untitled?node-id=0-1',
    },
    {
      id: 'sonata', title: 'Sonata Music Academy', category: 'Brand identity', context: 'Academic project · 2026',
      description: 'An academic branding project for Sonata Music Academy, a music and performing arts school concept. The identity pairs navy and gold with theatrical imagery across a logo system and promotional posters.',
      problem: 'Create a visual identity that brings voice, instrument, and theater training together under one music academy brand.',
      role: 'Brand identity designer for an academic design project.',
      process: 'Combined a treble clef, piano keys, and a profile silhouette in the brand mark. Applied navy and gold, expressive typography, stage lighting, and theatrical imagery to the Learn, Express, Inspire promotion and The House of Echoes musical poster.',
      result: 'A coordinated identity with a full logo, standalone brand mark, academy promotion, musical production poster, and complementary color palette study.',
      coverPosters: ['assets/sonata-promotion.jpg', 'assets/sonata-echoes.png'],
      logo: 'assets/sonata-symbol.png',
      gallery: [
        {
          image: 'assets/sonata-logo.png', label: 'Sonata Music Academy identity', identity: true,
          alt: 'Sonata Music Academy logo with a gold piano key circle and a navy treble clef and profile silhouette',
        },
        {
          image: 'assets/sonata-symbol.png', label: 'Standalone brand mark', identity: true,
          alt: 'Standalone Sonata mark combining piano keys, a treble clef, and a profile silhouette in navy and gold',
        },
        {
          image: 'assets/sonata-promotion.jpg', label: 'Learn, Express, Inspire',
          alt: 'Navy and gold Sonata promotion with Learn, Express, Inspire lettering over a theater stage',
        },
        {
          image: 'assets/sonata-echoes.png', label: 'The House of Echoes',
          alt: 'The House of Echoes musical poster with gold lettering, blue stage curtains, performers, and a spotlight',
        },
        {
          image: 'assets/sonata-palette.png', label: 'Complementary color palette', wide: true,
          alt: 'The House of Echoes color study pairing navy #1B2250 with gold #CBB034',
        },
      ],
    },
  ],
  skills: {
    design: ['Layout', 'Typography', 'Visual hierarchy', 'Responsive design'],
    technical: ['Brand identity', 'UI/UX design', 'Social media graphics', 'Presentation design'],
    web: ['HTML', 'CSS', 'JavaScript', 'React', 'Ionic', 'PHP', 'MySQL'],
    soft: ['Project management', 'Problem solving', 'Creativity', 'Leadership'],
    software: [
      { label: 'Ca', name: 'Canva' },
      { label: 'Ps', name: 'Adobe Photoshop' },
      { label: 'Fg', name: 'Figma' },
    ],
  },
  experience: [
    { date: '2026', title: 'Capstone leader', detail: 'LINARAYA waste reporting web application' },
    { date: '2024', title: 'Special Program for Employment of Students (SPES)', detail: 'Engineering Office, Municipality of Quezon, Nueva Ecija' },
    { date: '2023', title: 'Special Program for Employment of Students (SPES)', detail: 'PESO, Quezon, Nueva Ecija' },
  ],
  education: [
    {
      date: '2023–Present', title: 'Nueva Ecija University of Science and Technology',
      detail: 'Bachelor of Science in Information Technology, major in Web Systems Technology',
    },
    {
      date: '2020–2022', title: 'Eduardo L. Joson Memorial High School',
      detail: 'Senior High School, Science, Technology, Engineering and Mathematics (STEM)',
    },
    {
      date: '2019–2020', title: 'Eduardo L. Joson Memorial High School',
      detail: 'Junior High School',
    },
    {
      date: '2015–2016', title: 'Ricardo L. Joson Elementary School',
      detail: 'Elementary School',
    },
  ],
  certificates: [
    {
      title: 'LINARAYA research presentation recognition',
      type: 'Research recognition',
      issuer: 'NEUST Research Services Department',
      date: 'November 13, 2026',
      file: 'certificates/linaraya-research-recognition.png',
      thumbnail: 'certificates/linaraya-research-recognition.png',
    },
    {
      title: 'Employability skills: JobReady (with AI) v1',
      type: 'Course completion',
      issuer: 'Wadhwani Foundation',
      date: 'November 6, 2026',
      file: 'certificates/jobready.pdf',
      thumbnail: 'certificates/jobready.png',
    },
    {
      title: 'Information technology specialist: HTML and CSS',
      type: 'Certification',
      issuer: 'Certiport',
      date: 'October 29, 2026',
      file: 'certificates/html-and-css.pdf',
      thumbnail: 'certificates/html-and-css.png',
    },
    {
      title: 'Data-driven crisis management: utilizing AI and predictive analytics for emergency preparedness',
      type: 'Seminar participation',
      issuer: 'Armstrong Training and Development Services',
      date: 'August 30, 2026',
      file: 'certificates/data-driven-crisis-management.png',
      thumbnail: 'certificates/data-driven-crisis-management.png',
    },
    {
      title: 'Learning advocate 2026 series: emerging IT innovations',
      type: 'Webinar participation',
      issuer: 'UpskillTechPH Training Services',
      date: 'August 22, 2026',
      file: 'certificates/emerging-it-innovations.png',
      thumbnail: 'certificates/emerging-it-innovations.png',
    },
    {
      title: 'Database 101: data storage, SQL and query optimization',
      type: 'Webinar participation',
      issuer: 'UpskillTechPH Training Services',
      date: 'August 21, 2026',
      file: 'certificates/database-101.png',
      thumbnail: 'certificates/database-101.png',
    },
  ],
  charcoal: {
    title: 'Charcoal portrait commissions',
    description: 'I draw custom charcoal portraits from reference photos. Get in touch to discuss what you have in mind and request a quote.',
    inquiryDetails: [
      'A clear reference photo and the number of people to draw',
      'Your preferred portrait size',
      'Your target date, if you have one',
    ],
    gallery: [],
  },
  recognition: [
    {
      title: 'Academic honors', enabled: true, items: [
        { title: 'Dean’s Lister', detail: '2023–2024' },
        { title: 'Senior high school graduate with high honors' },
      ],
    },
  ],
  services: {
    enabled: false,
    availability: '',
    items: [
      { title: 'Visual identity', detail: 'Logo development, color and type systems, and practical brand guidelines.' },
      { title: 'Digital design', detail: 'Wireframes, responsive page designs, and interactive prototypes.' },
      { title: 'Print & editorial', detail: 'Posters, publications, and layouts for print or digital use.' },
    ],
  },
  contact: {
    email: 'umalicedrick29@gmail.com',
    location: 'Quezon, Nueva Ecija, Philippines',
    endpoint: '',
    socials: [
      { title: 'LinkedIn', short: 'LI', handle: 'cedrick-umali', url: 'https://www.linkedin.com/in/cedrick-umali-ba796042b' },
    ],
  },
};
