import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  icon: text("icon").notNull(),
  neonColor: text("neon_color").notNull(),
  ageGroup: text("age_group").notNull(),
  duration: text("duration").notNull(),
  features: text("features").array().notNull(),
  learningOutcomes: text("learning_outcomes").array().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  course: text("course").notNull(),
});

export const statsTable = pgTable("stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  label: text("label").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix").notNull(),
  icon: text("icon").notNull(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  courseId: text("course_id").notNull(),
  studentName: text("student_name").notNull(),
  parentName: text("parent_name"),
  phone: text("phone").notNull(),
});

export const insertCourseSchema = createInsertSchema(courses);
export const insertTestimonialSchema = createInsertSchema(testimonials);
export const insertStatSchema = createInsertSchema(statsTable).omit({ id: true });

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Stat = typeof statsTable.$inferSelect;
export type InsertStat = z.infer<typeof insertStatSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

export const coursesData: Course[] = [
  {
    id: "shunya",
    code: "LEVEL_01",
    name: "SHUNYA",
    tagline: "Light up your mind with paper circuits",
    description: "Paper Circuits",
    fullDescription: "Discover the magic of electricity through hands-on paper circuit projects. Create glowing artwork, interactive cards, and learn fundamental electronics concepts using conductive tape, LEDs, and creativity.",
    icon: "Zap",
    neonColor: "rgb(168, 85, 247)",
    ageGroup: "4-7 Years",
    duration: "8 Weeks",
    features: [
      "LED basics and circuit fundamentals",
      "Conductive tape mastery",
      "Creative project designs",
      "Parallel and series circuits",
      "Interactive greeting cards",
      "Safety and best practices"
    ],
    learningOutcomes: [
      "Understand basic electrical concepts",
      "Build confidence with hands-on making",
      "Develop creative problem-solving",
      "Learn circuit design principles"
    ]
  },
  {
    id: "chakra",
    code: "LEVEL_02",
    name: "CHAKRA",
    tagline: "Command robots that build the future",
    description: "Robotics",
    fullDescription: "Enter the world of robotics by building and programming your own robots. Learn to make machines move, sense, and respond. From basic motors to complex behaviors, become a robot master.",
    icon: "Bot",
    neonColor: "rgb(34, 211, 238)",
    ageGroup: "8-11 years",
    duration: "8 weeks",
    features: [
      "Build custom robot chassis",
      "Motor control and movement",
      "Sensor integration (ultrasonic, IR)",
      "Block-based coding (Scratch/Blockly)",
      "Autonomous navigation challenges",
      "Robot competitions and showcase"
    ],
    learningOutcomes: [
      "Master mechanical construction",
      "Learn programming logic",
      "Understand sensors and actuators",
      "Develop computational thinking"
    ]
  },
  {
    id: "yantra",
    code: "LEVEL_03",
    name: "YANTRA",
    tagline: "Connect the world through smart devices",
    description: "Internet of Things",
    fullDescription: "Build smart connected devices that communicate with each other. Learn how everyday objects become intelligent through sensors, microcontrollers, and internet connectivity. Create your own IoT ecosystem.",
    icon: "Wifi",
    neonColor: "rgb(236, 72, 153)",
    ageGroup: "12-14 years",
    duration: "12 weeks",
    features: [
      "ESP32/NodeMCU programming",
      "Sensor networks (temperature, humidity, motion)",
      "Cloud connectivity (ThingSpeak, Blynk)",
      "Mobile app integration",
      "Smart home automation projects",
      "Data visualization and analysis"
    ],
    learningOutcomes: [
      "Understand IoT architecture",
      "Program microcontrollers",
      "Work with APIs and cloud services",
      "Build real-world connected solutions"
    ]
  },
  {
    id: "ananta",
    code: "LEVEL_04",
    name: "ANANTA",
    tagline: "Master advanced IoT and AI integration",
    description: "Advanced IoT",
    fullDescription: "Take IoT to the next level with machine learning, edge computing, and advanced sensor fusion. Build sophisticated systems that can learn, predict, and make intelligent decisions autonomously.",
    icon: "Network",
    neonColor: "rgb(245, 158, 11)",
    ageGroup: "14-16 years",
    duration: "12 weeks",
    features: [
      "Edge computing with Raspberry Pi",
      "Machine learning model deployment",
      "Computer vision applications",
      "Advanced sensor fusion",
      "MQTT and industrial protocols",
      "Security and encryption"
    ],
    learningOutcomes: [
      "Deploy ML models on edge devices",
      "Master advanced programming",
      "Understand data security",
      "Build production-ready systems"
    ]
  },
  {
    id: "garuda",
    code: "LEVEL_05",
    name: "GARUDA",
    tagline: "Soar to new heights with drone technology",
    description: "Drone Engineering",
    fullDescription: "Design, build, and fly autonomous drones. Learn aerodynamics, flight controllers, GPS navigation, and aerial photography. From manual control to fully autonomous missions.",
    icon: "Plane",
    neonColor: "rgb(34, 197, 94)",
    ageGroup: "14-18 years",
    duration: "8 weeks",
    features: [
      "Drone construction and assembly",
      "Flight controller programming",
      "GPS waypoint navigation",
      "FPV (First Person View) flying",
      "Aerial photography and videography",
      "Autonomous mission planning"
    ],
    learningOutcomes: [
      "Understand flight dynamics",
      "Master drone programming",
      "Navigate complex aerial missions",
      "Apply for commercial certifications"
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Parent of 10-year-old",
    content: "BlackMonkey transformed my daughter's curiosity into real skills. The Chakra robotics course was engaging, challenging, and perfectly paced. She now wants to be a robotics engineer!",
    rating: 5,
    course: "Chakra"
  },
  {
    id: "2",
    name: "Arjun Patel",
    role: "Student, Age 15",
    content: "The Ananta course blew my mind. I built an AI-powered security system for my home. The instructors were amazing, and the projects were real-world, not just toys.",
    rating: 5,
    course: "Ananta"
  },
  {
    id: "3",
    name: "Meera Krishnan",
    role: "Parent of 7-year-old",
    content: "Starting with Shunya was perfect for my young one. Paper circuits made electronics fun and accessible. The creativity combined with learning is exactly what kids need today.",
    rating: 5,
    course: "Shunya"
  },
  {
    id: "4",
    name: "Rahul Verma",
    role: "Student, Age 16",
    content: "Garuda gave me wings! I built and programmed my own autonomous drone. The instructors trusted us with real technology and challenging projects. Best learning experience ever.",
    rating: 5,
    course: "Garuda"
  },
  {
    id: "5",
    name: "Anjali Desai",
    role: "Parent of 13-year-old",
    content: "Yantra opened up a whole new world. My son built a smart irrigation system for our garden. He's now considering a career in IoT engineering. Thank you, BlackMonkey!",
    rating: 5,
    course: "Yantra"
  }
];

export const statsData: Stat[] = [
  { id: "students", label: "Students Transformed", value: 5, suffix: "+", icon: "Users" },
  { id: "projects", label: "Projects Built", value: 15, suffix: "+", icon: "Rocket" },
  { id: "success-rate", label: "Success Rate", value: 98, suffix: "%", icon: "TrendingUp" },
  { id: "satisfaction", label: "Parent Satisfaction", value: 99, suffix: "%", icon: "Heart" }
];
