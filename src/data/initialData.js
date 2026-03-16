export const DEFAULT_DATA = {
  me: {
    name: "Phon Sobon",
    initials: "PS",
    role: "Researcher & Developer",
    avatar: null, // set to a URL string to show a photo
    bio: [
      `I am a researcher and developer passionate about machine learning, data science, and web technologies.
       My work focuses on building intelligent systems that bridge the gap between research and real-world applications.
       I am currently affiliated with <a href="#" class="text-accent hover:underline">MPTC</a>, where I work on exciting projects.`,
      `Previously, I have contributed to various open-source projects and collaborated with interdisciplinary teams
       to tackle challenging problems in computer vision, natural language processing, and data engineering.`,
      `Outside of research, I enjoy reading, hiking, and exploring new coffee shops. Feel free to reach out
       at <a href="mailto:phon@example.com" class="text-accent hover:underline">phon@example.com</a>.`,
    ],
  },

  publications: [
    {
      id: "pub-1",
      year: 2025,
      title: "Scalable Data Scraping Pipelines for Low-Resource Languages",
      authors: [
        { name: "Phon Sobon", self: true, star: false },
        { name: "Jane Doe", self: false, star: false },
        { name: "John Smith", self: false, star: false },
      ],
      venue: "ACL Findings 2025",
      badges: ["Oral"],
      type: "conference",
      links: [
        { label: "arXiv", url: "#" },
        { label: "Code", url: "#" },
        { label: "Demo", url: "#" },
      ],
      preview: null,
    },
    {
      id: "pub-2",
      year: 2024,
      title: "Multimodal Learning for Document Understanding in Southeast Asian Scripts",
      authors: [
        { name: "Jane Doe", self: false, star: true },
        { name: "Phon Sobon", self: true, star: true },
        { name: "Alice Zhang", self: false, star: false },
      ],
      venue: "NeurIPS 2024",
      badges: ["Highlight"],
      type: "conference",
      links: [
        { label: "arXiv", url: "#" },
        { label: "Code", url: "#" },
      ],
      preview: null,
    },
    {
      id: "pub-3",
      year: 2024,
      title: "Efficient Web Scraping with Large Language Model Guidance",
      authors: [
        { name: "Phon Sobon", self: true, star: false },
        { name: "Bob Lee", self: false, star: false },
      ],
      venue: "EMNLP 2024",
      badges: [],
      type: "conference",
      links: [{ label: "arXiv", url: "#" }],
      preview: null,
    },
    {
      id: "pub-4",
      year: 2023,
      title: "A Survey of Data Collection Methods for Under-Resourced NLP",
      authors: [
        { name: "Phon Sobon", self: true, star: false },
        { name: "Carol Wang", self: false, star: false },
        { name: "David Kim", self: false, star: false },
      ],
      venue: "Journal of Language Resources and Evaluation",
      badges: [],
      type: "journal",
      links: [{ label: "Paper", url: "#" }],
      preview: null,
    },
  ],

  blogPosts: [
    {
      id: "post-1",
      date: "2025-03-10",
      title: "Getting Started with FastAPI and React",
      excerpt:
        "A practical guide to building full-stack applications with FastAPI as the backend and React as the frontend. We cover project structure, CORS, and deployment.",
      tags: ["FastAPI", "React", "Tutorial"],
      url: "#",
    },
    {
      id: "post-2",
      date: "2025-01-22",
      title: "Why EB Garamond Belongs in Every Academic Portfolio",
      excerpt:
        "Typography choices say a lot about a researcher's aesthetic sensibility. Here's why classic serif fonts like EB Garamond remain timeless for academic sites.",
      tags: ["Design", "Typography"],
      url: "#",
    },
    {
      id: "post-3",
      date: "2024-11-05",
      title: "Web Scraping at Scale: Lessons Learned",
      excerpt:
        "After scraping millions of pages for NLP research, I share the patterns, pitfalls, and tools that made the difference between a brittle pipeline and a robust one.",
      tags: ["Scraping", "Python", "NLP"],
      url: "#",
    },
    {
      id: "post-4",
      date: "2024-08-14",
      title: "Reflecting on NeurIPS 2024",
      excerpt:
        "My takeaways from attending NeurIPS 2024 as a first-time presenter — what I learned, who I met, and what research directions seem most promising for 2025.",
      tags: ["Conference", "NeurIPS", "ML"],
      url: "#",
    },
  ],

  cv: {
    pdfUrl: null, // set to a URL/objectURL when PDF is uploaded
    pdfFileName: null,
    education: [
      {
        id: "edu-1",
        period: "2022 – present",
        title: "M.Sc. Computer Science",
        detail: "MPTC University · Advisor: Prof. Jane Doe",
      },
      {
        id: "edu-2",
        period: "2018 – 2022",
        title: "B.Sc. Information Technology",
        detail: "Royal University of Phnom Penh · Graduated with Distinction",
      },
    ],
    experience: [
      {
        id: "exp-1",
        period: "2023 – present",
        title: "Research Assistant",
        detail: "NLP Lab, MPTC · Working on low-resource language data pipelines",
      },
      {
        id: "exp-2",
        period: "Summer 2022",
        title: "Software Engineering Intern",
        detail: "TechCorp · Built internal data tooling with Python and FastAPI",
      },
    ],
    awards: [
      { id: "aw-1", period: "2024", title: "NeurIPS Highlight Award", detail: "Top 3% of submitted papers" },
      { id: "aw-2", period: "2023", title: "Best Paper — CAMLING Workshop", detail: "ACL 2023" },
      { id: "aw-3", period: "2022", title: "Dean's List Award", detail: "Royal University of Phnom Penh" },
    ],
    service: [
      { id: "sv-1", period: "2024", title: "Reviewer", detail: "ACL, EMNLP, NeurIPS" },
      { id: "sv-2", period: "2023", title: "Workshop Organizer", detail: "CAMLING @ ACL 2023" },
    ],
  },

  openSource: [
    {
      id: "os-1",
      title: "Data Pipeline CLI",
      description: "A command-line tool for building robust data scraping pipelines with error handling and logging.",
      stars: 245,
      language: "Python",
      link: "https://github.com/yourusername/data-pipeline-cli",
    },
    {
      id: "os-2",
      title: "NLP Toolkit",
      description: "Collection of utilities for preprocessing and analyzing low-resource language text.",
      stars: 189,
      language: "Python",
      link: "https://github.com/yourusername/nlp-toolkit",
    },
    {
      id: "os-3",
      title: "React Portfolio Template",
      description: "Modern, minimal portfolio website template built with React and Tailwind CSS.",
      stars: 142,
      language: "JavaScript",
      link: "https://github.com/yourusername/react-portfolio",
    },
  ],
};
