// ============================================================
// Service data — single source of truth for the service pages.
// ONE template (via src/pages/[slug].astro + ServiceArticle.astro)
// renders ALL of these. Content reflects the live Wix pages
// captured in the site audit, in Otter's plain-English voice.
// "Care Professional" is the correct term (never "carer") in copy.
// ============================================================

export interface Service {
  slug: string;
  /** Short label for cards/nav. */
  name: string;
  /** SEO <title> — standardised pattern. */
  title: string;
  /** SEO meta description (carried/expanded from the live site). */
  description: string;
  h1: string;
  /** Sub-heading under the H1. */
  subtitle: string;
  /** Lede paragraph(s). */
  intro: string[];
  /** "What's included" checklist. */
  included: string[];
  /** Optional price callout (only live-in care quotes a price today). */
  price?: string;
  /** Optional eligibility note (e.g. fall recovery is existing-clients only). */
  note?: string;
  testimonial?: { quote: string; who: string };
}

export const services: Service[] = [
  {
    slug: "personal-care",
    name: "Personal Care",
    title: "Personal Care at Home | Otter Homecare",
    description:
      "Professional personal care at home, supporting dignity, independence and daily needs. Trusted Care Professionals across Wiltshire and Somerset.",
    h1: "Dignified personal care that respects your independence",
    subtitle: "Help with the everyday, delivered with warmth and respect",
    intro: [
      "Personal care covers the daily tasks that can become harder over time — and we deliver every one of them with patience, privacy and dignity. Our Care Professionals take the time to do things properly, the way you like them done.",
      "Whether you need a hand first thing in the morning, support at bedtime, or help throughout the day, we build the routine around you — not the other way round.",
    ],
    included: [
      "Washing, bathing and showering",
      "Dressing, grooming and personal hygiene",
      "Help to the toilet and discreet continence care",
      "Medication reminders and support",
      "Meal preparation and help to eat and drink well",
      "Mobility support and help to move safely",
    ],
    testimonial: {
      quote:
        "They take time with Mum, they remember the little things, and I sleep better knowing they're there.",
      who: "Sarah W. — Trowbridge",
    },
  },
  {
    slug: "live-in-care",
    name: "Live-in Care",
    title: "Live-in Care in Wiltshire & Somerset | Otter Homecare",
    description:
      "24/7 live-in care for safety, comfort and peace of mind at home. Compassionate Care Professionals supporting independence and wellbeing.",
    h1: "Live-in care",
    subtitle: "A real alternative to a care home — in the home you love",
    intro: [
      "With live-in care, a dedicated Care Professional lives in the home and is on hand around the clock. It's a genuine alternative to moving into residential care — keeping you in familiar surroundings, with your own routines, pets and memories all around you.",
      "We match you carefully with someone you'll get on with, and plan everything from daily support to overnight reassurance.",
    ],
    included: [
      "Help with washing, dressing and personal care",
      "Medication support",
      "Cooking, meals and shopping",
      "Companionship and day-to-day company",
      "Help around the house and with pets",
      "Overnight reassurance and peace of mind",
    ],
    price: "From £1,395 per week",
    testimonial: {
      quote:
        "I didn't want to leave my home and I haven't had to. The carers are kind, professional, and feel like friends after a while.",
      who: "David R. — Bradford-on-Avon",
    },
  },
  {
    slug: "companionship",
    name: "Companionship",
    title: "Companionship Care at Home | Otter Homecare",
    description:
      "Friendly companionship visits to reduce loneliness and bring joy. Meaningful support for daily living in Trowbridge, Frome and nearby towns.",
    h1: "Companionship care",
    subtitle: "Friendly faces, meaningful moments",
    intro: [
      "Sometimes the most important thing isn't a task — it's company. A familiar face, a proper chat over a cup of tea, a trip out to somewhere that matters. Companionship care is about lifting the week and keeping loneliness at bay.",
      "It's often where families start, and it makes a bigger difference than people expect.",
    ],
    included: [
      "Conversation and good company",
      "Trips out, appointments and errands",
      "Hobbies, activities and getting out and about",
      "Help with letters, phone calls and admin",
      "Light household tasks and a tidy-up",
      "A reassuring check-in for peace of mind",
    ],
    testimonial: {
      quote:
        "The carers are kind, professional, and feel like friends after a while.",
      who: "Client, Frome",
    },
  },
  {
    slug: "fall-recovery",
    name: "Fall Recovery",
    title: "Fall Recovery Support at Home | Otter Homecare",
    description:
      "Specialised fall recovery support in Wiltshire and Somerset, helping clients get up safely and regain confidence after a fall.",
    h1: "Fall recovery support",
    subtitle: "Getting back on your feet, safely and with confidence",
    intro: [
      "A fall can knock your confidence as much as anything else. Our Care Professionals are trained in safe moving and handling, and we use a Raizer lifting chair to help someone up from the floor safely, without strain or injury.",
      "Beyond the moment itself, we carry out home risk assessments and work patiently to rebuild confidence so day-to-day life feels steady again.",
    ],
    included: [
      "Safe, trained help to get up after a fall",
      "Raizer lifting chair (no manual strain)",
      "Home risk assessments to prevent future falls",
      "Confidence-building support day to day",
    ],
    note: "Fall recovery support is available to existing Otter Homecare clients.",
  },
  {
    slug: "conditions",
    name: "Specialist Support",
    title: "Conditions We Support | Otter Homecare",
    description:
      "Tailored care for dementia, stroke, palliative needs and more. Personalised support to help people live safely and well at home.",
    h1: "Conditions we support",
    subtitle: "Experienced support for the conditions that need a steady hand",
    intro: [
      "Some situations need more than a kind heart — they need experience. Our Care Professionals are trained and supported to care for a range of conditions, always with a plan built around the individual rather than a label.",
      "If you're not sure whether we can help with a particular condition, just ask — we'll be honest with you.",
    ],
    included: [
      "Dementia and memory loss",
      "Stroke recovery and rehabilitation",
      "Physical disabilities and reduced mobility",
      "End-of-life and palliative care",
      "Frailty and complex daily needs",
    ],
  },
];
