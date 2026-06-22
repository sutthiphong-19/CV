const en = {
  app: {
    brand: "My Portfolio",
    role: "",
  },
  language: {
    label: "Language",
    th: "TH",
    en: "EN",
  },
  theme: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
    toggle: "Toggle theme",
  },
  nav: {
    menu: "Main Menu",
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    game: "Mini Game",
    menu: "Menu",
  },
  game: {
  badge: "React + Python FastAPI",
  subtitle: "Games connected to a Python FastAPI backend",
  snake: "Snake Game",
  quiz: "Quiz Game",
  typing: "Typing Speed",
},
  common: {
    back: "Back",
    portfolio: "Portfolio",
    item: "Item",
    view: "View",
    close: "Close",
  },
  profile: {
    name: "Sutthiphong Phongsraphang",
  },
  home: {
    eyebrow: "Portfolio / Developer",
    titlePrefix: "Hello, I'm",
    heroDescription:
      "I am a recent graduate focused on website and software development, with solid frontend experience in React and growing backend skills in Node.js, Golang, and AI. I enjoy learning new technologies and I am ready to contribute immediately.",
    ctas: {
      projects: "View Projects",
      contact: "Contact Me",
    },
    quickFacts: {
      role: {
        label: "Role",
        value: "Developer",
      },
      interests: {
        label: "Interests",
        value: "React, Node.js, Python, AI",
      },
      focus: {
        label: "Focus",
        value: "Collaborating with product teams and building software that ships to real users",
      },
    },
    highlights: {
      kicker: "Highlights",
      title: "Experience and projects worth exploring",
      items: {
        prayuen: {
          alt: "Phra Yuen Municipality",
          title: "Phra Yuen Municipality",
          description:
            "Handled official documentation workflows, from requests and approvals to reports and supporting records.",
        },
        khonkaen: {
          alt: "Khon Kaen Provincial Administrative Organization",
          title: "Khon Kaen Provincial Administrative Organization",
          description:
            "Supported office operations through computer maintenance and digital document management.",
        },
        csProject: {
          alt: "Computer Science project",
          title: "Computer Science Project",
          description:
            "Built an object detection system with YOLO and extended it into a web application using FastAPI and Flutter.",
        },
      },
    },
    skills: {
      kicker: "Skills",
      title: "Core Skill Set",
      groups: {
        frontend: {
          title: "Frontend",
          items: ["React", "JavaScript", "HTML", "CSS", "Vite", "Vue.js"],
        },
        backend: {
          title: "Backend",
          items: ["Python", "Node.js", "FastAPI", "Golang"],
        },
        database: {
          title: "Database",
          items: ["MySQL", "Docker"],
        },
      },
    },
  },
  about: {
    badge: "About Me",
    heroTitle: "My background and learning journey",
    intro1:
      "My name is Sutthiphong Phongsraphang. I am from Khon Kaen and I enjoy building software tied to real-world use cases. I am especially motivated by work that solves practical problems and creates visible outcomes.",
    intro2:
      "My strongest path is web application development with React, backend APIs with Python and FastAPI, and growing work in AI, especially object detection.",
    actions: {
      more: "Learn More",
      contact: "Contact Me",
    },
    stats: {
      focus: {
        label: "Focus",
        title: "Web / Backend / AI",
        description: "Build software that can scale in real use and evolve with the product.",
      },
      style: {
        label: "Working Style",
        title: "Fast learner, structured execution",
        description: "I value clear process, strong communication, and adapting smoothly to the team.",
      },
      goal: {
        label: "Goal",
        title: "Ready to contribute now",
        description: "I keep improving my craft and take shared responsibility seriously in a team environment.",
      },
    },
    story: {
      kicker: "Story",
      title: "What I care about and want to keep building",
      paragraph1:
        "I became interested in programming at eighteen and kept learning through hands-on projects. What keeps me motivated is seeing an idea become a working system, whether that is a website, an internal tool, or an AI-powered workflow.",
      paragraph2:
        "One of my strengths is combining frontend, backend, and systems thinking so the final product is not only usable, but also maintainable and ready to grow.",
    },
    focus: {
      kicker: "Focus",
      title: "Areas I am actively developing",
      interests: [
        "Web Application",
        "Backend API",
        "AI / Object Detection",
        "Easy-to-use UI",
      ],
    },
    timeline: {
      kicker: "Timeline",
      title: "The path that brought me here",
      items: {
        start: {
          year: "Curiosity",
          title: "Started learning to code",
          description:
            "Began from personal curiosity, then kept growing through real project work and consistent self-driven practice.",
        },
        webapp: {
          year: "React + Python",
          title: "Focused on web applications",
          description:
            "I enjoy connecting frontend and backend smoothly so users can feel the result immediately.",
        },
        ai: {
          year: "AI / YOLO",
          title: "Expanded into AI work",
          description:
            "I am interested in using object detection and AI to solve practical problems in real environments.",
        },
      },
    },
    portfolio: {
      kicker: "Portfolio",
      title: "Explore my work by category",
      prayuen: "Phra Yuen Municipality",
      khonkaen: "Khon Kaen PAO",
      project: "Projects",
      history: "Work History",
    },
  },
  contact: {
    badge: "Contact",
    title: "Get in touch",
    note: "I am open to opportunities, new projects, and thoughtful conversations through any of these channels.",
    items: {
      email: "Email",
      phone: "Phone",
      facebook: "Facebook",
      github: "GitHub",
      tiktok: "tiktok",
      line: "line",
    },
  },
  projects: {
    kicker: "YOLO Object Detection",
    title: "Object detection with interactive Before / After comparison",
    note:
      "Upload an image and run detection to compare the result before and after YOLOv11 processing. This page is tuned for both mobile and large screens, with clear visual output and detection summaries.",
    badges: ["YOLOv11", "FastAPI", "Flutter Web App"],
    actions: {
      chooseImage: "Choose Image",
      detect: "Detect Objects",
      detecting: "Detecting...",
    },
    steps: {
      one: {
        label: "Step 1",
        title: "Upload an image",
        description: "Pick the original image from your device to start detection.",
      },
      two: {
        label: "Step 2",
        title: "Send it to the backend",
        description: "Submit the file through the API connected to the YOLO model.",
      },
      three: {
        label: "Step 3",
        title: "Review the output",
        description: "Compare Before / After views and inspect the detected objects.",
      },
    },
    exampleFlow: {
      kicker: "Example Flow",
      title: "A simple walkthrough of the experience",
      items: [
        "Upload the original image",
        "Run detection through the backend",
        "Drag the slider to compare Before / After",
      ],
    },
    showcase: {
      kicker: "Before / After",
      title: "Compare the image before and after detection",
      note:
        "The left side shows the original image and the right side shows the processed result. You can drag the slider to inspect the difference more closely.",
      before: "Before",
      after: "After",
      slider: "Slide to compare",
      beforeAlt: "Image before detection",
      afterAlt: "Image after detection",
    },
    result: {
      kicker: "Result",
      title: "Detection result",
      original: "Original image",
      detected: "YOLO output",
      originalAlt: "Original image",
      detectedAlt: "Detected image",
      loadingPlaceholder: "Processing...",
      emptyPlaceholder: "Run detection to see the result",
      detections: "{{count}} objects detected",
    },
    errors: {
      backendResponse: "The backend returned an unexpected response.",
      backendConnection: "Unable to connect to the backend. Please make sure the server is running.",
    },
  },
  portfolio: {
    notFoundTitle: "Portfolio section not found",
    notFoundDescription:
      "This link may be incorrect, or the requested portfolio section is not available yet.",
    previewUnavailable: "Preview is not available for this item yet.",
    roleSeparator: "Role",
    sections: {
      prayuen: {
        title: "Phra Yuen Municipality",
        period: "November 2025 - May 2026",
        role: "Fire Department Staff",
        overview:
          "Completed an internship focused on internal information systems, computer support, and day-to-day IT operations.",
        items: {
          1: {
            title: "Handled documents and support activities",
            desc: "Supported official documentation and routine public-service operations within the department.",
          },
          2: {
            title: "Prepared digital documents and communication assets",
            desc: "Created internal materials and digital assets used in communication and operations.",
          },
        },
      },
      khonkaen: {
        title: "Khon Kaen Provincial Administrative Organization",
        period: "April 2025 - May 2025",
        role: "Strategy Office Intern",
        overview:
          "Contributed to project tracking systems and helped analyze user needs in a public-sector environment.",
        items: {
          1: {
            title: "Supported IT systems and office hardware",
            desc: "Maintained hardware and day-to-day digital tools used by the organization.",
          },
        },
      },
      project: {
        title: "Projects",
        period: "2023 - 2025",
        role: "Lead Developer",
        overview:
          "Academic and personal projects spanning AI, web platforms, and mobile-connected workflows.",
        items: {
          1: {
            title: "Object Detection with YOLO",
            desc: "Built a real-time object detection system using YOLOv11 and Python.",
          },
          2: {
            title: "Web Application with React + FastAPI",
            desc: "Created a full-stack web app with React on the frontend and FastAPI on the backend.",
          },
        },
      },
      history: {
        title: "Work History",
        period: "2022 - Present",
        role: "Freelance Developer",
        overview:
          "Delivered freelance software work across web applications and AI-related systems.",
        items: {
          1: {
            title: "Freelance Web Developer",
            desc: "Built websites and web applications for clients using React, Node.js, and Python.",
          },
        },
      },
    },
  },
};

export default en;
