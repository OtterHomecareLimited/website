// The people on /our-team.
//
// Two groups, deliberately kept separate. `office` is the management and
// coordination team. `careProfessionals` is the people who actually turn up at
// the door — the group the site promises ("the same few faces") but has never
// shown. Filling that array in is the last open item on the brand scorecard,
// and it doubles as the strongest recruitment page we have.
//
// ─── ADDING A CARE PROFESSIONAL ──────────────────────────────────────────────
// Add one object to `careProfessionals` below. Only `name` and `words` are
// required — everything else is optional and the card copes without it, so
// someone can go up before their photo has been taken.
//
//   name    First name only. No surnames anywhere on the site, for staff privacy.
//   role    Defaults to "Care Professional". Only set it for a different title.
//   area    The town they mostly work in. Also a genuine local-search signal.
//   since   The year they joined, as a number. Renders as "With Otter since 2024".
//   words   ONE OR TWO SENTENCES IN THEIR OWN VOICE. This is the whole point of
//           the section — a written-by-the-office paragraph reads like every
//           other care site. Ask people what they'd say themselves. Good prompts:
//             "What made you go into care?"
//             "What's the best part of a shift?"
//             "What would you want someone to know before you first visit them?"
//   photo   Path under /img. Convention: /img/team-<name>.jpg, portrait, at
//           least 600px wide — the card crops to 4:5. Leave it out and the card
//           shows a teal circle with their initial instead, which looks
//           deliberate rather than broken.
//
// The section does not render at all while the array is empty, so the live page
// is unchanged until there is something real to show.
// ─────────────────────────────────────────────────────────────────────────────

export interface Person {
  name: string;
  role?: string;
  area?: string;
  since?: number;
  words: string;
  photo?: string;
  /** Overrides the generated alt text; usually unnecessary. */
  alt?: string;
}

export const office: Person[] = [
  {
    name: "Jamie",
    role: "Founder / Managing Director",
    photo: "/img/team-jamie.jpg",
    words:
      "Jamie founded Otter Homecare after becoming the main carer for his father following a stroke. Twenty years living in Thailand — where caring for older loved ones at home is simply the way of life — shaped his belief in kinder, more personal care. He's currently completing a Level 5 Diploma in Health & Social Care and lives locally in Bradford-on-Avon.",
  },
  {
    name: "Cherie",
    role: "Registered Manager",
    photo: "/img/team-cherie.jpg",
    words:
      "Cherie has over a decade in the care sector, from Care Support Worker to Registered Manager. She's passionate about person-centred care and expert in compliance, quality assurance and developing her teams — fostering a culture of compassion and continuous improvement.",
  },
  {
    name: "Maria",
    role: "Care Coordinator",
    photo: "/img/team-maria.jpg",
    words:
      "Maria brings 13+ years across hospices, hospitals and home care. Her calm, organised approach keeps care plans, referrals and family communications running with professionalism and compassion. She's passionate about helping people feel heard, supported and safe.",
  },
  {
    name: "Brad",
    role: "Care Supervisor",
    photo: "/img/team-brad.jpg",
    words:
      "Brad joined us as a Care Supervisor, in a role that spans office and field — carrying out spot checks, client reviews and joining Care Professionals on visits. He brings many years of care experience and a passion for keeping our standards high for clients and staff alike. Before care, Brad was a chef — and he's already delighting the office with his culinary skills.",
  },
  {
    name: "Abbey",
    role: "Training and HR Coordinator",
    photo: "/img/team-abbey.jpg",
    words:
      "Abbey is an experienced care professional with 5+ years in domiciliary care and adult social care training. As our Home Care Trainer she ensures every new Care Professional is confident and well-prepared, with expertise in safeguarding, medication, manual handling and care planning.",
  },
];

// Nothing here yet — see the note above. Six to eight is the right number: enough
// that "a small, consistent team" is visibly true, few enough to keep current.
//
// Example of the shape (delete this comment once there are real entries):
//
//   {
//     name: "Pam",
//     area: "Trowbridge",
//     since: 2024,
//     photo: "/img/team-pam.jpg",
//     words:
//       "I fell into care looking after my nan and never left. The bit I like best is the ten minutes at the end when the jobs are done and you just sit and talk.",
//   },
//
export const careProfessionals: Person[] = [
  {
    name: "Bev",
    area: "Bradford-on-Avon & Trowbridge",
    since: 2025,
    photo: "/img/team-bev.jpg",
    // Why, then proof. The first sentence is the answer to "what made you go into
    // care" — Bev came to it as her daughter's carer. Note it is a paraphrase:
    // that answer was lost to a clipped transcription and reached us second-hand,
    // so it is worth reading back to her, unlike the second sentence which is
    // verbatim. The client she named when telling the shower story is deliberately
    // not identified — client names never appear in marketing material.
    words:
      "I came into care because I was my daughter's carer first. One lady wouldn't let anyone shower her when I started; now it's two or three times a week, and that trust is what makes the job worthwhile.",
  },
  {
    name: "Dee",
    area: "Trowbridge, Bradford-on-Avon & Melksham",
    since: 2025,
    photo: "/img/team-dee.jpg",
    // Her interview, edited to the same two-sentence arc as Bev's (a first
    // version kept the interview's meander verbatim and read as fragments next
    // to Bev's card). Facts and phrases are hers: the 29 years, being the only
    // person a client sees, the smile, the tease. The reference to her son was
    // removed at Jamie's request (18 Aug 2026) — don't reintroduce it.
    // The teasing client stays ANONYMOUS — Jamie's explicit decision
    // (18 Aug 2026). Do not name him in this or any future copy.
    words:
      "I've been in care for 29 years. Sometimes I'm the only person a client sees all day, so I always turn up with a smile; one client even teases me: 'Do you have to be so cheerful?'",
  },
];
