// The six Otter Alongside guides. Shared so the /family hub and the homepage
// block can't drift apart — `blurb` is the full description used on the hub,
// `short` is the compressed line used where space is tight (homepage).

export interface Stage {
  n: number;
  href: string;
  icon: string;
  title: string;
  blurb: string;
  short: string;
}

export const stages: Stage[] = [
  {
    n: 1, href: "/family/before-we-start", icon: "door", title: "Before we start",
    blurb: "Thinking about care for someone you love — raising it with them, what it costs, and an honest section on when you might not need us yet.",
    short: "Raising it, what it costs, and when you might not need us yet.",
  },
  {
    n: 2, href: "/family/your-first-month", icon: "calendar", title: "Your first month",
    blurb: "Getting the care app running if you want it, who you'll actually speak to, and the questions everyone asks at the start.",
    short: "Who you'll speak to, and the questions everyone asks.",
  },
  {
    n: 3, href: "/family/living-with-it", icon: "chat", title: "Living with it",
    blurb: "Care reviews, changing the plan when it stops fitting, and how to tell us something without feeling like a nuisance.",
    short: "Changing the plan, and telling us things without feeling a nuisance.",
  },
  {
    n: 4, href: "/family/when-things-change", icon: "signpost", title: "When things change",
    blurb: "Getting more help, hospital stays and coming home, dementia progressing — and the honest conversation about what's next.",
    short: "More help, hospital stays, and the honest conversation about next.",
  },
  {
    n: 5, href: "/family/looking-after-you", icon: "armchair", title: "Looking after you",
    blurb: "For the family member doing the caring: the help you're entitled to, a proper break, and people who understand it.",
    short: "For the one doing the caring: your break, and what you're owed.",
  },
  {
    n: 6, href: "/family/the-last-part", icon: "window", title: "The last part",
    blurb: "For families nearing the end. Here when you want it — there's no need to read it before you do.",
    short: "For families nearing the end. Here when you want it.",
  },
];
