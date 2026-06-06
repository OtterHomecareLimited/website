// Service data — REAL content captured from the live Wix site (2026-06-06).
// One template (ServiceArticle.astro) renders all of these.

export interface Service {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  heroImg: string;
  intro: string[];
  includedTitle?: string;
  included: string[];
  secondListTitle?: string;
  secondList?: string[];
  price?: string;
  note?: string;
  testimonial?: { quote: string; who: string };
}

export const services: Service[] = [
  {
    slug: "personal-care",
    name: "Personal Care",
    title: "Personal Care Services at Home | Otter Homecare",
    description:
      "Professional personal care at home, supporting dignity, independence and daily needs. Trusted Care Professionals across Wiltshire and Somerset.",
    h1: "Personal Care",
    subtitle: "Dignified personal care that respects your independence",
    heroImg: "ff72ba_8e19708f8dd7491cb1f934206e6b7fd2~mv2.jpg",
    intro: [
      "We understand that accepting help with personal tasks can feel like a sensitive step. That's why our Care Professionals provide support with warmth, respect and calm reassurance — always protecting your dignity, privacy and independence.",
      "We focus on building trust, taking time to understand your preferences and routines so that every visit feels comfortable and personal. Whether you need daily support or just occasional help, our care adapts around you.",
    ],
    includedTitle: "What personal care can include",
    included: [
      "Bathing, showering or bed baths",
      "Help with dressing and undressing",
      "Oral hygiene and grooming (shaving, hair care, skin care)",
      "Continence care and toileting support",
      "Morning and bedtime routines",
      "Medication prompting and reassurance",
    ],
    testimonial: {
      quote:
        "Everyone I have seen has gone the extra mile, and at this extremely difficult stage it has been a Godsend. I cannot recommend them highly enough.",
      who: "J W · Wife of Client",
    },
  },
  {
    slug: "visiting-care",
    name: "Visiting Care",
    title: "Visiting Care in Wiltshire & Somerset | Otter Homecare",
    description:
      "Flexible visiting care at home across Trowbridge, Bradford-on-Avon, Melksham, Westbury and Frome — from a quick daily call-in to several visits a day. Minimum one-hour visits.",
    h1: "Visiting Care",
    subtitle: "Flexible visits, on your terms",
    heroImg: "ff72ba_3a8fe18215c24b3e9cb6884f0bf44228~mv2.jpg",
    intro: [
      "From a friendly daily call-in upwards, our visiting care fits around your routine — never the other way round. Friendly Care Professionals help with everyday life and brighten the day, with the same familiar faces building real relationships.",
      "Every visit is a minimum of one hour, because good care shouldn't be rushed.",
    ],
    includedTitle: "What visiting care can include",
    included: [
      "Flexible visit lengths to suit you (minimum one hour)",
      "Help with washing, dressing, meals and medication",
      "Support getting out to appointments and activities",
      "Companionship and a friendly chat",
      "Help around the home and with errands",
      "The same familiar faces, every visit",
    ],
  },
  {
    slug: "companionship",
    name: "Companionship",
    title: "Companionship Care at Home | Otter Homecare",
    description:
      "Friendly companionship care at home in Wiltshire and Somerset — conversation, hobbies, outings and genuine connection that lifts the spirits and eases loneliness.",
    h1: "Companionship Care",
    subtitle: "Friendly faces, meaningful moments",
    heroImg: "ff72ba_f2124d3e3abf4903ad29e1bbc13fab8e~mv2.jpg",
    intro: [
      "Sometimes the most powerful kind of care is simply being there. Our companionship care is all about connection — friendly, familiar faces to brighten the day, share in conversation and enjoy small but meaningful moments together.",
      "Whether your loved one lives alone, feels isolated, or would just enjoy more company, our Care Professionals are here to lift spirits and create regular, genuine human contact.",
    ],
    includedTitle: "What companionship care can include",
    included: [
      "Friendly visits and conversation",
      "Help with hobbies or activities",
      "Walks in the garden or local area",
      "Games, reading and reminiscing",
      "Company for meals or outings",
      "Support with appointments or errands",
    ],
    secondListTitle: "Why it matters",
    secondList: [
      "Improves mood and wellbeing",
      "Reduces loneliness and isolation",
      "Encourages gentle activity",
      "Peace of mind for families",
    ],
    testimonial: {
      quote:
        "She is such a gentle and caring soul and has been a godsend for my parents. We all really appreciate having Pam in our lives.",
      who: "Lyn E · Daughter of Client",
    },
  },
  {
    slug: "live-in-care",
    name: "Live-in Care",
    title: "Live-in Care in Wiltshire & Somerset | Otter Homecare",
    description:
      "Round-the-clock live-in care at home — a reassuring alternative to a care home. A dedicated Care Professional living with you, from £1,550 per week. Wiltshire & Somerset.",
    h1: "Live-in Care",
    subtitle: "Round-the-clock support, comfort and peace of mind in the place you call home",
    heroImg: "ff72ba_356da85da3114f4ea8c98fa716675d83~mv2.jpg",
    intro: [
      "Live-in care provides continuous support day and night, allowing you or your loved one to remain in the comfort and familiarity of home — with the reassurance of professional help always at hand.",
      "Whether you're recovering from illness, managing a long-term condition, or simply want to feel safe and supported at home, we're here to help.",
    ],
    includedTitle: "What we help with",
    included: [
      "Personal care (washing, dressing, toileting)",
      "Medication support and health monitoring",
      "Nutritious meal preparation",
      "Household help (laundry, dishes, tidying)",
      "Companionship and emotional support",
      "Grocery shopping and appointments",
      "Overnight reassurance and peace of mind",
    ],
    secondListTitle: "Who is live-in care for?",
    secondList: [
      "Living alone and needing daily support",
      "Recovering from a hospital stay, stroke or fall",
      "Living with dementia or a long-term condition",
      "Recently bereaved or seeking companionship",
      "An alternative to residential care",
    ],
    price: "Live-in care starts from £1,550 per week, with a personalised quote after a free assessment. We can help you explore local authority funding or NHS continuing healthcare where applicable.",
    testimonial: {
      quote:
        "I didn't want to leave my home and I haven't had to. The carers are kind, professional, and feel like friends after a while.",
      who: "Client · Bradford-on-Avon",
    },
  },
  {
    slug: "fall-recovery",
    name: "Fall Recovery",
    title: "Fall Recovery Support at Home | Otter Homecare",
    description:
      "Swift, safe fall recovery support at home in Wiltshire and Somerset, using the Raizer lifting chair to help someone up safely and with dignity. Available to existing clients.",
    h1: "Fall Recovery Support",
    subtitle: "Swift, safe support if a fall happens",
    heroImg: "ff72ba_4b05b1a5425d4810a639471b6c1f0d82~mv2.jpg",
    intro: [
      "Falls can shake a person's confidence — and a family's peace of mind. We're here to respond quickly and help gently, using the right tools and the right touch.",
      "Our fall recovery support is delivered by trained professionals using the innovative Raizer Chair — a safe, dignified way to help someone up from the floor without risk of further injury.",
    ],
    includedTitle: "How our fall recovery support works",
    included: [
      "Raizer Chair lifting — a secure, seated lift from the floor",
      "Rapid response — our team is on standby for urgent support",
      "Dignified care — respectful assistance that protects privacy",
      "Reduces A&E visits — easing pressure on local services",
      "Peace of mind — knowing help is close when it's needed",
    ],
    note: "Fall recovery support is available to existing Otter Homecare clients.",
  },
];
