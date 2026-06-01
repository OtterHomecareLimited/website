// ============================================================
// Location data — single source of truth for the town pages.
// ONE template (src/pages/[town].astro) renders ALL of these.
// Village lists are the genuine localised content captured in the
// site audit (the real strength of the current Wix town pages).
// To add a town: add an entry here. No new page file needed.
// ============================================================

export interface Town {
  slug: string;
  name: string;
  /** SEO <title> — standardised pattern (audit flagged the old ones as inconsistent). */
  title: string;
  /** SEO meta description (audit flagged several as missing on Wix). */
  description: string;
  h1: string;
  /** Lede paragraph under the H1. */
  lede: string;
  /** Genuinely local intro — the bit that must be unique per town. */
  intro: string[];
  /** Surrounding villages served (real data from the live site). */
  villages: string[];
  /** Optional local landmark / hook for flavour. */
  landmark?: string;
  testimonial?: { quote: string; who: string };
}

export const towns: Town[] = [
  {
    slug: "trowbridge",
    name: "Trowbridge",
    title: "Trowbridge Home Care | Otter Homecare",
    description:
      "Personal, live-in and companionship home care in Trowbridge and the surrounding villages. Locally run, CQC-registered, and built around your family.",
    h1: "Trowbridge Home Care",
    lede:
      "We're a Trowbridge family business — our office is on Fore Street, and most of our team live a few minutes from the people they care for.",
    intro: [
      "Otter Homecare is based right here in Trowbridge, which means short journeys for our Care Professionals, a faster response when things change, and a team that genuinely knows the town you live in.",
      "From a single companionship visit a week to round-the-clock live-in support, we shape care around the person — covering personal care, dementia and stroke support, end-of-life care and everything in between.",
    ],
    villages: ["Hilperton", "Staverton", "North Bradley", "Southwick"],
    landmark: "We run our free monthly Otter Café just up the road at Staverton Village Hall.",
    testimonial: {
      quote:
        "The Otter team have been wonderful with Mum. They take time with her, they remember the little things, and I sleep better at night knowing they're there.",
      who: "Sarah W. — daughter, Trowbridge",
    },
  },
  {
    slug: "melksham",
    name: "Melksham",
    title: "Melksham Home Care | Otter Homecare",
    description:
      "Compassionate local home care in Melksham and nearby villages — visiting care, live-in care, dementia and companionship support from a Trowbridge-based team.",
    h1: "Melksham Home Care",
    lede: "Compassionate local support for Melksham families — just a short drive from our Trowbridge base.",
    intro: [
      "Our Care Professionals support people across Melksham and its surrounding villages, with care plans built around each person's routine, preferences and goals.",
      "Whether it's help getting up and dressed, a friendly companionship visit, or full live-in care, you'll see the same familiar faces — not a rota of strangers.",
    ],
    villages: ["Whitley", "Bowerhill", "Beanacre", "Seend"],
    landmark: "You'll often spot us around the Melksham Makers Market.",
    testimonial: {
      quote:
        "From the first phone call to the assessment to the care itself, it has all been brilliant. Honest, clear, and properly run.",
      who: "Margaret H. — Melksham",
    },
  },
  {
    slug: "frome",
    name: "Frome",
    title: "Frome Home Care | Otter Homecare",
    description:
      "Home care in Frome and the surrounding Somerset villages — visiting care from 30 minutes, 24-hour live-in care, dementia and companionship support. Locally run.",
    h1: "Frome Home Care",
    lede: "Person-centred home care for Frome and the surrounding Somerset villages.",
    intro: [
      "We support people right across Frome — from short visiting calls of half an hour to full 24-hour live-in care — always delivered by local Care Professionals who get to know you properly.",
      "Our care covers personal care, dementia support, companionship and specialist conditions, with families able to follow every visit in real time through our care app.",
    ],
    villages: ["Beckington", "Nunney", "Rode", "Mells"],
    landmark: "From Frome High Street out to the villages, we keep our patches tight and local.",
    testimonial: {
      quote:
        "I didn't want to leave my home and I haven't had to. The carers are kind, professional, and feel like friends after a while.",
      who: "David R. — Frome",
    },
  },
  {
    slug: "bradford-on-avon",
    name: "Bradford-on-Avon",
    title: "Bradford-on-Avon Home Care | Otter Homecare",
    description:
      "Compassionate home care in Bradford-on-Avon and surrounding villages — visiting care, live-in care, dementia and companionship support from a local Wiltshire team.",
    h1: "Bradford-on-Avon Home Care",
    lede: "Local, person-centred home care for Bradford-on-Avon and the villages around it.",
    intro: [
      "Our Care Professionals support people throughout Bradford-on-Avon and its hillside villages, with everything from 30-minute visiting calls to 24-hour live-in care.",
      "Care is always tailored — personal care, dementia and stroke support, companionship — and delivered by a deliberately small team so you always know who's coming.",
    ],
    villages: [
      "Winsley",
      "Turleigh",
      "Westwood",
      "Avoncliff",
      "Limpley Stoke",
      "Monkton Farleigh",
      "Iford",
    ],
    testimonial: {
      quote:
        "Kind, reliable and genuinely caring — exactly what we'd hoped for when we first called.",
      who: "Client family — Bradford-on-Avon",
    },
  },
  {
    slug: "westbury",
    name: "Westbury",
    title: "Westbury Home Care | Otter Homecare",
    description:
      "Compassionate local home care in Westbury and surrounding villages — visiting care, live-in care, dementia and companionship support. CQC-registered, locally run.",
    h1: "Westbury Home Care",
    lede: "Compassionate local support for Westbury families, with tailored care plans and a familiar team.",
    intro: [
      "We support people across Westbury and its surrounding villages with care built around the individual — from a weekly companionship visit to full live-in support.",
      "Our Care Professionals are local, properly trained and well supported, and every plan is tailored to the person rather than a fixed task list.",
    ],
    villages: ["Dilton Marsh", "Bratton", "Edington", "Heywood"],
    testimonial: {
      quote: "They've been a real comfort to the whole family — we couldn't ask for better.",
      who: "Lyn E. — Westbury",
    },
  },
];
