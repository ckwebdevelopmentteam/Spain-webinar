export interface Topic {
  title: string;
  description?: string;
}

export interface CurriculumDay {
  day: number;
  title: string;
  subtitle: string;
  topics: string[];
}

export interface AudienceCard {
  title: string;
  description: string;
  icon: string;
}

export interface BonusCard {
  title: string;
  description: string;
  value: string;
  icon: string;
}

export interface Instructor {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WebinarConfig {
  title: string;
  subtitle: string;
  tagline: string;
  fee: number;
  originalFee: number;
  seatsTotal: number;
  durationDays: number;
  hoursPerDay: number;
  mode: string;
  dates: string;
  time: string;
  curriculum: CurriculumDay[];
  audience: AudienceCard[];
  bonuses: BonusCard[];
  achievements: string[];
  instructors: Instructor[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
}

export const webinarData: WebinarConfig = {
  title: "Master the Art of AI Image & Video Generation",
  subtitle: "Learn how to communicate with AI like a professional creator and transform ideas into stunning visuals and videos.",
  tagline: "Don't just use AI. Learn how to direct it like a creator.",
  fee: 499,
  originalFee: 2999,
  seatsTotal: 100,
  durationDays: 2,
  hoursPerDay: 2,
  mode: "Online via Zoom",
  dates: "Upcoming Weekend",
  time: "6:00 PM - 8:00 PM IST",
  curriculum: [
    {
      day: 1,
      title: "AI Image Generation MASTERCLASS",
      subtitle: "Learn the fundamentals of visual prompting and prompt engineering.",
      topics: [
        "Structure of powerful prompts",
        "Cinematic image creation",
        "Character design",
        "Product advertisements",
        "Camera angles & lens selection",
        "Composition & lighting control",
        "Color grading techniques",
        "Consistent characters across scenes",
        "Advanced prompt frameworks"
      ]
    },
    {
      day: 2,
      title: "AI Video Generation & Production",
      subtitle: "Animate your visuals and build production-ready workflows.",
      topics: [
        "Image to video translation",
        "AI storytelling & storyboarding",
        "Creating advertisement videos",
        "Camera movement & motion prompting",
        "Scene consistency & transitions",
        "Sound direction & AI voiceovers",
        "AI video editing pipelines",
        "Professional creator workflows"
      ]
    }
  ],
  audience: [
    {
      title: "Content Creators",
      description: "Scale your content production and create eye-catching visuals without hiring expensive designers.",
      icon: "Sparkles"
    },
    {
      title: "Designers",
      description: "Supercharge your brainstorming and prototype premium concepts for clients in minutes instead of days.",
      icon: "Palette"
    },
    {
      title: "Filmmakers",
      description: "Storyboard and produce stunning cinematic AI video sequences to bring your stories to life.",
      icon: "Film"
    },
    {
      title: "Marketing Professionals",
      description: "Create high-converting ad creatives and social media campaigns that stand out from the competition.",
      icon: "Megaphone"
    },
    {
      title: "Students",
      description: "Gain future-proof skills that will make you highly competitive in the modern creative job market.",
      icon: "GraduationCap"
    },
    {
      title: "Entrepreneurs",
      description: "Build high-quality brand assets, product mockups, and promo videos for your business at zero cost.",
      icon: "Briefcase"
    },
    {
      title: "Social Media Creators",
      description: "Keep your feeds fresh with infinite unique visuals, memes, and viral-worthy video content.",
      icon: "Share2"
    }
  ],
  bonuses: [
    {
      title: "Ready-to-use Prompt Templates",
      description: "A curated library of 500+ copy-paste prompts for cinematic, product, and architectural styles.",
      value: "₹999",
      icon: "Terminal"
    },
    {
      title: "AI Workflow System",
      description: "Step-by-step cheatsheet of our proprietary pipeline for seamless image-to-video conversion.",
      value: "₹1,499",
      icon: "GitBranch"
    },
    {
      title: "Creator Resources",
      description: "Access to private drive with cinematic overlays, sound effects, and color-grading LUTs.",
      value: "₹799",
      icon: "FolderOpen"
    },
    {
      title: "Live Q&A Session",
      description: "Get direct feedback on your creations from the instructors in a dedicated 30-min Q&A.",
      value: "Priceless",
      icon: "MessageSquareText"
    },
    {
      title: "Certificate of Completion",
      description: "Receive an official, shareable digital certificate from SapAin to showcase your new skills.",
      value: "₹499",
      icon: "Award"
    }
  ],
  achievements: [
    "Generate professional AI Images with perfect composition",
    "Create cinematic AI Videos with fluid camera movement",
    "Design highly specific prompts using professional frameworks",
    "Build studio-grade advertisement creatives on a budget",
    "Save hours of manual design and editing work daily",
    "Create high-performing marketing content that converts",
    "Maintain consistent characters across multiple scenes",
    "Produce commercial-ready visuals for high-paying clients"
  ],
  instructors: [
    {
      name: "Aarav Mehta",
      role: "Lead AI Visual Artist & Mentor",
      bio: "Former Creative Director at a top global advertising agency. Over 10 years of experience in visual storytelling, now specializing in Midjourney and generative workflows for enterprise brands.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Rohan Sharma",
      role: "Director & AI Storyteller",
      bio: "Independent filmmaker and tech enthusiast. Creator of multiple viral AI short films and ad campaigns. Expert in Runway, Luma, and integrating AI into traditional cinematic pipelines.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
      linkedin: "https://linkedin.com"
    }
  ],
  testimonials: [
    {
      name: "Neha Kapoor",
      role: "Freelance Brand Designer",
      review: "This workshop completely changed my design workflow. I can now present 5 distinct high-quality visual concepts to clients in under an hour. The character consistency section was worth 10x the price!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop"
    },
    {
      name: "Vikram Malhotra",
      role: "Founder, D2C Apparel Brand",
      review: "We shot our entire summer collection launch using Midjourney and Runway after attending this masterclass. The ad creatives look incredibly premium, and our conversion rate went up by 35%!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128&auto=format&fit=crop"
    },
    {
      name: "Ananya Sen",
      role: "Social Media Manager",
      review: "I was skeptical about AI video, but the step-by-step pipeline taught on Day 2 made it so easy. I've been creating cinematic reels that are getting double the reach of our usual content. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=128&auto=format&fit=crop"
    }
  ],
  faqs: [
    {
      question: "Is this workshop live or pre-recorded?",
      answer: "This is a 100% live, interactive workshop. You will be able to see live demonstrations, follow along, and ask questions in real time."
    },
    {
      question: "Will I get access to recordings if I miss a session?",
      answer: "Yes, absolutely! All registered participants will receive lifetime access to the high-definition recordings of both days within 24 hours of the live session."
    },
    {
      question: "Do I need any prior design or AI experience?",
      answer: "No prior experience is needed. We start from absolute scratch, teaching you prompt structures, and gradually move to advanced cinematic and video generation techniques."
    },
    {
      question: "Which AI tools will be covered in this masterclass?",
      answer: "We will primarily cover Midjourney (v6), Stable Diffusion, Runway Gen-2/Gen-3, Luma Dream Machine, and ChatGPT for prompt engineering. We will focus on tools that offer the highest quality commercial output."
    },
    {
      question: "How and when will I receive the Zoom link?",
      answer: "Immediately upon successful registration and payment, you will receive an automated email and WhatsApp confirmation. The Zoom link and calendar invite will be sent to your registered email and phone number."
    },
    {
      question: "Will I receive a certificate of completion?",
      answer: "Yes, you will receive a verified digital certificate of completion from SapAin, which you can showcase on LinkedIn and in your portfolio."
    }
  ]
};
