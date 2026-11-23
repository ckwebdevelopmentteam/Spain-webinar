export interface LanguageOption {
  id: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
  platform: string;
  dates: string;
  time: string;
  isPopular?: boolean;
}

export interface WorkshopPillar {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ToolItem {
  name: string;
  badge?: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface Mentor {
  name: string;
  role: string;
  bio: string;
  image: string;
  experienceYears: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkflowGuide {
  number: number;
  title: string;
}

export interface WebinarConfig {
  title: string;
  subtitle: string;
  tagline: string;
  fee: number;
  originalFee: number;
  durationHours: number;
  trainingHours: string;
  seatsTotal: number;
  mode: string;
  platform: string;
  dates: string;
  time: string;
  learnersCount: string;
  aboutCourse: {
    lead: string;
    description: string;
    audienceSummary: string;
    toolHighlight: string;
    outcomeSummary: string;
  };
  languages: LanguageOption[];
  pillars: WorkshopPillar[];
  tools: ToolItem[];
  whatsIncluded: string[];
  targetAudience: {
    title: string;
    description: string;
    icon: string;
    image?: string;
  }[];
  postWorkshopSkills: string[];
  founders: Founder[];
  mentor: Mentor;
  trustedBrands: string[];
  workflowGuides: WorkflowGuide[];
  faqs: FAQItem[];
}

export const webinarData: WebinarConfig = {
  title: "Make Explainer Videos with Claude",
  subtitle: "Turn any topic into a short animated video, just by talking to Claude in plain English.",
  tagline: "2-hour practical workshop • Beginner-friendly",
  fee: 120,
  originalFee: 399,
  durationHours: 2,
  trainingHours: "2 hours live, hands-on workshop + Live Q&A",
  seatsTotal: 100,
  mode: "Live Online Workshop on Zoom",
  platform: "Zoom Online",
  dates: "Tuesday, 1 December 2026",
  time: "7:00 PM IST",
  learnersCount: "1,000+ learners are already part of the journey.",
  aboutCourse: {
    lead: "Turn any topic into a short animated video, just by talking to Claude in plain English.",
    description: "Learn how to use Claude and Claude Code to build animated explainer videos from scratch without any coding, design, or video editing experience.",
    audienceSummary: "Open to students, teachers, small businesses, content creators, and curious beginners.",
    toolHighlight: "Master Claude and Claude Code to handle idea generation, scriptwriting, and automated video animation in minutes.",
    outcomeSummary: "Walk away with your first explainer video, a repeatable 3-step framework (Idea → Story → Video), and reusable prompts."
  },
  languages: [
    {
      id: "claude-explainer",
      name: "Sapain Course",
      description: "Turn any topic into a short animated video, just by talking to Claude in plain English.",
      fee: 120,
      duration: "2 hrs",
      platform: "Zoom Online",
      dates: "Tuesday, 1 December 2026",
      time: "7:00 PM IST",
      isPopular: true
    }
  ],
  pillars: [
    {
      title: "Get the idea",
      description: "Ask Claude for video ideas on any topic and brainstorm clear, high-impact concepts in seconds.",
      icon: "Sparkles",
      image: "/pillars/image-generation.png"
    },
    {
      title: "Write the story",
      description: "Turn the idea into a compelling short script tailored for animated visual explanation.",
      icon: "Film",
      image: "/pillars/video-generation.png"
    },
    {
      title: "Make the video",
      description: "Claude Code builds the animated video for you directly from your prompts.",
      icon: "Palette",
      image: "/pillars/cinematic-storytelling.jpg"
    }
  ],
  tools: [
    { name: "Claude 3.7 Sonnet", badge: "Core Intelligence" },
    { name: "Claude Code", badge: "Video Animation" },
    { name: "Claude Desktop", badge: "Workflow Setup" },
    { name: "Remotion Engine", badge: "Code Video" },
    { name: "SVG Motion Design", badge: "Visual Elements" },
    { name: "Script & Narration", badge: "Audio & Voice" },
    { name: "+ Reusable Prompts", badge: "Included" }
  ],
  whatsIncluded: [
    "Your first explainer video created step-by-step",
    "A simple 3-step method: Idea → Story → Video",
    "Prompts you can reuse for every video",
    "Workshop brief PDF sent upon registration",
    "Zoom link and dedicated WhatsApp community access"
  ],
  targetAudience: [
    {
      title: "Students",
      description: "Explain projects, academic topics, and presentations visually without any animation background.",
      icon: "GraduationCap",
      image: "/audience/students.jpg"
    },
    {
      title: "Teachers",
      description: "Create engaging, bite-sized animated lessons that keep students captivated.",
      icon: "Sparkles",
      image: "/audience/teachers.jpg"
    },
    {
      title: "Small Businesses",
      description: "Pitch services, explain product benefits, and boost conversions with custom animated explainers.",
      icon: "Briefcase",
      image: "/audience/small-businesses.jpg"
    },
    {
      title: "Content Creators",
      description: "Produce viral animated explainer shorts, reels, and YouTube videos effortlessly.",
      icon: "Share2",
      image: "/audience/content-creators.jpg"
    },
    {
      title: "Beginners (No Skills Needed)",
      description: "No coding, design, or video editing skills needed. Talk to Claude in plain English.",
      icon: "Terminal",
      image: "/audience/beginners.jpg"
    }
  ],
  postWorkshopSkills: [
    "Build your first complete animated explainer video",
    "Master the 3-step method: Idea → Story → Video",
    "Use reusable prompts for any topic or niche",
    "Automate animation generation with Claude Code",
    "Script compelling visual stories in plain English",
    "Export, polish, and publish your animated videos"
  ],
  founders: [
    {
      name: "Brijin Raj",
      role: "Managing Director, Sapain",
      bio: "Brijin Raj is a creative entrepreneur and business leader with a strong focus on building and scaling creative ventures. As Managing Director of Sapain, he brings together business strategy, creativity, technology, and innovation to build forward-thinking organizations. His leadership centers on building strong teams, developing new opportunities, and shaping the future of creative businesses.",
      image: "/founders/brijin_raj.jpg",
      linkedin: "https://www.linkedin.com/in/brijin-raj-02925b239/"
    },
    {
      name: "Akshay",
      role: "CEO, Sapain",
      bio: "Akshay is the CEO of Sapain and an AI enthusiast with a deep interest in the intersection of technology and creativity. He actively explores emerging AI technologies and their practical applications across different fields, with a focus on discovering how AI can enhance creative processes, productivity, and innovation. His vision centers on making emerging technology accessible and useful across creative and professional workflows.",
      image: "/founders/akshay.jpg",
      linkedin: "https://www.linkedin.com/in/akshay-krishnan-kp-389247286/"
    },
    {
      name: "Nandu",
      role: "COO, Sapain",
      bio: "Nandu is the Chief Operating Officer at Sapain and a creative-focused team leader with around eight years of experience in the creative industry. He focuses on building efficient systems, improving team collaboration, and creating smooth workflows that support creative production. Alongside operations, he continues to explore emerging creative mediums and technologies to help teams work more efficiently and effectively.",
      image: "/founders/nandu.jpg",
      linkedin: "https://www.linkedin.com/in/nandu-p-36b23a19b/"
    },
    {
      name: "Mithun",
      role: "CEDO, Sapain",
      bio: "Mithun serves as the Chief Education & Development Officer at Sapain, focusing on integrating AI into creative education and workflows. With around eight years of experience in the creative field, he develops structured syllabuses, learning systems, and educational workflows that connect creativity with emerging technology. His areas of exploration span 2D, 3D, animation, and AI-powered creative processes.",
      image: "/founders/mithun.jpg",
      linkedin: "https://www.linkedin.com/in/midhunsanimator/"
    },
    {
      name: "Kiran",
      role: "CMO, Sapain",
      bio: "Kiran is the Chief Marketing Officer at Sapain, specializing in creative marketing and team leadership. With extensive experience leading creative teams, he brings a strong understanding of visual communication, branding, and digital media. He continuously explores emerging creative technologies and mediums, including AI and 3D, to develop new approaches to marketing and creative storytelling.",
      image: "/founders/kiran.jpg",
      linkedin: "https://www.linkedin.com/in/kiranraj-rv-7a6905218/"
    }
  ],
  mentor: {
    name: "Vinayak",
    role: "Lead Mentor & AI Video Specialist, Sapain",
    bio: "Hi, I'm Vinayak from Sapain, and I'm excited to be your mentor for this workshop. Sapain is India's leading AI video creator brand, with years of experience researching, experimenting, and developing in the field of AI. Over 7 years, we've worked with emerging AI technologies, explored new creative possibilities, and turned them into real-world solutions for brands and businesses. I currently lead and mentor Sapain's students, teaching them how to apply these tools and workflows in real, practical projects. That experience is what we're bringing into this workshop - giving you access to the tools, techniques, and creative workflows we've learned through years of working with AI.",
    image: "/mentor-vinayak-new.jpg",
    experienceYears: 7
  },
  trustedBrands: [
    "Lulu",
    "Walkaro",
    "Nesto",
    "Canara",
    "Vkc",
    "Kalyan silks",
    "Decathlon",
    "Toyota",
    "Joy icecreams",
    "Double Horse",
    "Popees",
    "Hykon",
    "Craze biscuits",
    "Odyssia",
    "Swayamvara silks"
  ],
  workflowGuides: [
    { number: 1, title: "Your creative AI field guide" },
    { number: 2, title: "Plan a clear story" },
    { number: 3, title: "Plan your own creative brief" },
    { number: 4, title: "Make the first page" },
    { number: 5, title: "Before you click generate" },
    { number: 6, title: "Your next seven days" },
    { number: 7, title: "Prompting with creative intent" },
    { number: 8, title: "Tell a story in 30 sec" },
    { number: 9, title: "Use light to tell the story" },
    { number: 10, title: "Compose for a clear first look" }
  ],
  faqs: [
    {
      question: "Do I need coding, design, or video editing skills?",
      answer: "No coding, design, or editing skills needed! You turn any topic into a short animated video just by talking to Claude in plain English."
    },
    {
      question: "What are the workshop prerequisites?",
      answer: "You only need: 1) A laptop (Windows or Mac), 2) A good internet connection, and 3) A Claude account (Claude Code needs a paid plan)."
    },
    {
      question: "What will I take home from the session?",
      answer: "You'll build your first explainer video, learn our repeatable 3-step method (Idea → Story → Video), and receive reusable prompt templates for future videos."
    },
    {
      question: "What happens after I register?",
      answer: "You'll immediately receive the workshop brief PDF and Zoom join link by email and via our private WhatsApp group."
    },
    {
      question: "When is the live workshop scheduled?",
      answer: "The session takes place on Tuesday, 1 December 2026 at 7:00 PM IST (2 hours live on Zoom Online) for ₹120."
    },
    {
      question: "Have questions or need support?",
      answer: "Feel free to reach out to us at thesapain@gmail.com or via WhatsApp anytime."
    }
  ]
};
