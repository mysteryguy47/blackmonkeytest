# BlackMonkey STEM Education Website - Design Guidelines

## Design Approach

**Reference-Based with Custom Innovation**
Drawing inspiration from Linear's smooth, futuristic minimalism while injecting bold, experimental elements unique to STEM education. This will be a next-generation experience that balances sophisticated polish with playful, educational energy.

**Core Principles:**
- **Futuristic Minimalism:** Clean layouts with strategic neon accents and sci-fi aesthetics
- **Smooth Interactivity:** Every interaction feels buttery smooth and intentional
- **Educational Playfulness:** Gamified elements that make learning feel exciting
- **Bold Confidence:** Large typography, strong statements, unapologetic creativity

## Typography

**Font System:**
- **Primary:** Inter or DM Sans for clean, modern readability
- **Display:** Space Grotesk or Rajdhani for bold, futuristic headlines with tech edge
- **Accent:** JetBrains Mono for course codes and technical details

**Hierarchy:**
- Hero Headlines: 4xl-6xl (72-96px), extra bold weight, tight letter spacing
- Section Headers: 3xl-4xl (48-60px), bold weight
- Course Names: 2xl-3xl (36-48px), semibold with distinctive styling
- Body Text: base-lg (16-18px), normal weight, increased line height (1.7)
- Captions/Labels: sm-base (14-16px), medium weight
- Course Codes: xs-sm (12-14px), monospace, uppercase, tracked spacing

## Layout System

**Spacing Primitives:**
Use Tailwind units: 2, 4, 8, 12, 16, 24, 32 for consistent rhythm
- Micro spacing: 2, 4 (gaps, padding within components)
- Component spacing: 8, 12, 16 (cards, buttons, form elements)
- Section spacing: 24, 32 (vertical rhythm between major sections)

**Container Strategy:**
- Full-width sections with inner max-w-7xl containers
- Hero: Full viewport height with centered content max-w-5xl
- Content sections: max-w-6xl for multi-column layouts
- Text content: max-w-3xl for optimal reading

**Grid System:**
- Course cards: 3-column grid on desktop (lg:grid-cols-3), 2-col tablet (md:grid-cols-2), single column mobile
- Feature sections: 2-column splits for content/visual pairings
- Testimonials: 2-column grid with masonry-style varied heights

## Component Library

### Navigation
**Next-Level Floating Nav:**
- Fixed header with glassmorphism blur effect (backdrop-blur)
- Thin horizontal bar with padding 4 top/bottom, 8 left/right
- Logo left, menu items center-right, CTA button far right
- Subtle neon underline on active/hover states with smooth transition
- Becomes semi-transparent on scroll with smooth opacity change

### Hero Section
**Immersive Animated Hero:**
- Full viewport height (min-h-screen)
- Centered content with large headline (6xl), punchy tagline (xl), dual CTAs
- Animated particle/circuit board background layer with slow movement
- Faded large text watermark "STEM" or "LAB" behind content
- Scroll indicator at bottom (animated bounce)

### Course Cards
**Interactive 3D Course Modules:**
- Card with subtle border, rounded corners (rounded-2xl)
- Course icon/illustration at top (120x120px)
- Course code in monospace (e.g., "SHUNYA_01")
- Course name (2xl, bold)
- Creative one-liner tagline (lg, lighter weight)
- Hover state: lift effect (translate-y), neon glow border, slight rotation
- Click reveals full course detail modal or navigates to dedicated page

### BlackMonkey Origin Story
**Narrative Scroll Experience:**
- Horizontal scroll timeline or vertical story blocks
- Large faded "BLACKMONKEY" text in background moving on scroll (parallax)
- Story segments with illustration/image left, text right alternating pattern
- Progress indicator showing position in story
- Playful monkey illustrations or silhouettes as visual anchors

### Testimonials
**Dynamic Testimonial Showcase:**
- Card-based layout with student/parent photo (rounded-full, 64px)
- Quote in larger text (lg-xl) with quotation marks styled
- Name and relationship below (sm, medium weight)
- Star ratings or course badges
- Carousel with smooth slide transitions, 3 visible at once on desktop
- Subtle neon accent on active testimonial

### Why Choose Us
**Bold Claims Grid:**
- 2x2 or 3x2 grid of stat/benefit cards
- Large animated number counters (5xl) for statistics
- Icon above, stat below, description underneath
- Hover reveals additional detail or animation
- Background geometric patterns or circuit traces

### Gamified Lab Section
**Interactive Preview:**
- Split layout: left shows "lab interface" mockup, right lists features
- Interactive elements: clickable buttons showing micro-animations
- Achievement badges, progress bars, level indicators
- Playful illustrations of lab equipment, robots, circuits
- "Enter Lab" CTA prominently placed

### Footer
**Comprehensive Information Hub:**
- 4-column layout: About, Courses, Resources, Connect
- Newsletter signup with inline form
- Social media icons with neon hover glow
- Legal links and copyright
- Subtle animated background elements (floating particles)

## Animations & Effects

**Strategic Animation Approach:**
- **Scroll-triggered reveals:** Elements fade/slide in as they enter viewport (stagger children)
- **Parallax layers:** Background elements move at different speeds than foreground
- **Hover microinteractions:** Subtle lift, glow, or scale (1.02-1.05x) on cards/buttons
- **Cursor trail effect:** Custom circle cursor (32px) with center dot (4px), follows with 0.15s delay
- **Page transitions:** Smooth fade between route changes
- **Number counters:** Animate from 0 to target on scroll into view
- **Neon pulse:** Subtle breathing effect on accent borders (2-3s duration)

**Background Effects:**
- Faded large-scale typography watermarks ("STEM", "CODE", course names) at low opacity (0.03-0.05)
- Subtle gradient mesh or animated grid pattern
- Floating geometric shapes or circuit board patterns moving slowly
- All background elements stay non-intrusive, enhancing depth without distraction

## Special Interactive Features

**Custom Cursor:**
- Outer circle: 32px diameter, border only, follows cursor position
- Inner dot: 4px diameter, filled, slight lag (0.15s) creating trailing effect
- Expands on hover over clickable elements (48px circle)
- Changes shape on specific interactions (course cards become hexagon)

**Ambient Audio:**
- Subtle hover sound effects on course cards (optional toggle in corner)
- Background ambient STEM lab sounds (very quiet, optional)
- Click confirmations with satisfying feedback sounds

## Images

**Hero Image:**
No traditional hero image. Instead, use animated particle/circuit background with geometric shapes.

**Course Illustrations:**
Each course card features custom illustrations:
- **Shunya:** Paper circuit diagram with glowing LED paths
- **Chakra:** Robot arm or humanoid robot sketch
- **Yantra:** Connected IoT devices network diagram
- **Ananta:** Advanced sensor array or smart home setup
- **Garuda:** Drone with technical blueprint overlay

**Origin Story:**
3-4 illustrated scenes showing BlackMonkey's journey, playful character design with educational themes.

**Testimonial Photos:**
Student/parent headshots, circular crop, 64px diameter.

**Lab Preview:**
Screenshot or mockup of gamified learning interface showing progress, badges, interactive elements.

---

**Implementation Notes:**
- All animations use easing functions (ease-out, ease-in-out) for natural feel
- Maintain 60fps performance - optimize heavy animations
- Responsive breakpoints: mobile (default), tablet (md: 768px), desktop (lg: 1024px)
- Touch-friendly tap targets (min 44px) for mobile
- Accessibility: all animations respect prefers-reduced-motion
- Load animations progressively - hero first, then scroll-triggered content