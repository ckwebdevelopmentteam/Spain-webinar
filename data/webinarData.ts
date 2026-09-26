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
  title: "Advanced AI Image & Cinematic Video Generation Masterclass",
  subtitle: "Learn to use advanced AI platforms such as Higgsfield and Magnific, along with tools like ChatGPT Astra, ChatGPT Image 2.5, Seedance, and more to create cinematic-style videos and powerful visuals. Explore AI-powered visual storytelling, image and video generation, cinematic content creation, and smarter creative workflows to turn your ideas into professional-quality content.",
  tagline: "3-hour practical AI workshop • Beginner-friendly",
  fee: 299,
  originalFee: 999,
  durationHours: 3,
  trainingHours: "2.5 hours live, hands-on training + Live Q&A",
  seatsTotal: 100,
  mode: "Live Online Workshop on Zoom",
  platform: "Zoom (Join from anywhere)",
  dates: "Starting from 15 October 2026",
  time: "6:00 PM - 9:00 PM IST",
  learnersCount: "1,000+ learners are already part of the journey.",
  aboutCourse: {
    lead: "In the age of AI, skills are becoming more valuable than certificates. As AI continues to transform the creative industry, staying ahead requires more than knowing the basics - it requires mastering the latest tools and techniques and using them effectively.",
    description: "This 3-hour live online workshop is designed to help you explore advanced AI tools and creative techniques for professional content creation.",
    audienceSummary: "The workshop is open to beginners, AI enthusiasts, content creators, creative professionals, and anyone with an interest in AI.",
    toolHighlight: "This is not a basic introduction to AI. You'll explore advanced tools such as ChatGPT Astra, ChatGPT Image 2.5, and Seedance, along with platforms like Magnific and Higgsfield plus practical methods for creating advanced visuals and cinematic-style videos.",
    outcomeSummary: "By the end of the workshop, you'll have the knowledge and practical skills to create professional-level AI visuals and cinematic videos in minutes, not days."
  },
  languages: [
    {
      id: "sapain",
      name: "Sapain Course",
      description: "Learn directly with Sapain — interactive live masterclass featuring practical, production-ready AI workflows.",
      fee: 299,
      duration: "3 hrs",
      platform: "Zoom",
      dates: "15 October",
      time: "6:00 PM - 9:00 PM IST",
      isPopular: true
    }
  ],
  pillars: [
    {
      title: "AI Image Generation",
      description: "Learn how to turn ideas into compelling, photorealistic and styled AI-generated visuals.",
      icon: "Sparkles",
      image: "/pillars/image-generation.png"
    },
    {
      title: "AI Video Generation",
      description: "Explore how to transform generated visuals into engaging, dynamic video content with camera motion.",
      icon: "Film",
      image: "/pillars/video-generation.png"
    },
    {
      title: "Cinematic Storytelling",
      description: "Learn how to develop an idea into a story and direct cinematic-style video sequences with scene consistency.",
      icon: "Palette",
      image: "/pillars/cinematic-storytelling.jpg"
    }
  ],
  tools: [
    { name: "ChatGPT Astra", badge: "Next-Gen" },
    { name: "ChatGPT Image 2.5", badge: "Visual Directing" },
    { name: "Higgsfield (Seedance 2.5)", badge: "Cinematic Motion" },
    { name: "Minimax H3", badge: "Video Engine" },
    { name: "Omni Flash", badge: "Realtime Generation" },
    { name: "Magnific AI", badge: "Ultra Upscaling" },
    { name: "+ More Creative Tools", badge: "Ecosystem" }
  ],
  whatsIncluded: [
    "2.5 hours of live, hands-on training",
    "Real-time demonstrations using industry-leading AI tools",
    "Practical techniques you can apply immediately",
    "Live Q&A with the instructor",
    "A Workshop Worth Every Minute"
  ],
  targetAudience: [
    {
      title: "Beginners",
      description: "No prior AI experience needed. Start with practical fundamentals and build confidence rapidly.",
      icon: "Sparkles",
      image: "/audience/beginners.png"
    },
    {
      title: "AI Enthusiasts",
      description: "Dive deep into the latest tool releases, breakthroughs, and bleeding-edge generation pipelines.",
      icon: "Terminal",
      image: "/audience/ai-enthusiasts.png"
    },
    {
      title: "Content Creators",
      description: "Create eye-catching visuals and viral video sequences without high production costs.",
      icon: "Share2",
      image: "/audience/content-creators.jpg"
    },
    {
      title: "Creative Professionals",
      description: "Integrate generative AI directly into agency, advertising, and client design deliverables.",
      icon: "Briefcase",
      image: "/audience/creative-professionals.jpg"
    },
    {
      title: "Anyone Seeking In-Demand Skills",
      description: "Position yourself at the forefront of the creative revolution with high-value AI directing abilities.",
      icon: "GraduationCap",
      image: "/audience/in-demand-skills.png"
    }
  ],
  postWorkshopSkills: [
    "Master advanced prompting techniques",
    "Create high-quality AI images",
    "Generate cinematic AI videos",
    "Create consistent characters & visuals",
    "Use AI tools at an advanced level",
    "Build a practical AI creative workflow"
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
      question: "Do I need any prior AI knowledge?",
      answer: "No — the workshop is beginner-friendly. We guide you step-by-step from core prompting through advanced cinematic video techniques."
    },
    {
      question: "Will there be hands-on experience?",
      answer: "Yes, including live demonstrations, real-time workflows, and direct practical exercises you can follow along with."
    },
    {
      question: "Who should attend?",
      answer: "Anyone interested in AI and creative applications, including beginners, visual artists, content creators, marketers, and design professionals."
    },
    {
      question: "Is it live or pre-recorded?",
      answer: "Live and interactive. You can ask questions in real-time and engage directly with the mentor."
    },
    {
      question: "Is there an age limit?",
      answer: "No, it's open to everyone with a passion for creativity and AI."
    },
    {
      question: "How do I stay updated on future workshops?",
      answer: "Follow Sapain's official social media channels and join our AI community for updates on upcoming sessions, masterclasses, and resources."
    }
  ]
};
