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
  // Optional rich SEO content (currently only live-in-care). When absent the page
  // renders exactly as before, so the other service pages are unaffected.
  serviceType?: string;                              // schema.org Service.serviceType
  areaServed?: string[];                             // schema.org Service.areaServed
  priceFrom?: { amount: number; unit: string };      // schema.org Offer (e.g. £1,550 / WEEK)
  // Deep-content sections. `body` paragraphs may contain inline HTML links (rendered
  // with set:html). `list` is an optional bullet list under the prose.
  sections?: { eyebrow?: string; h2: string; body?: string[]; list?: string[] }[];
  faqs?: { q: string; a: string[] }[];               // rendered as accordion + FAQPage schema
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
      "Flexible visiting care at home across Trowbridge, Bradford-on-Avon, Melksham, Westbury and Frome — from a quick daily call-in to several visits a day. Visit lengths to suit you.",
    h1: "Visiting Care",
    subtitle: "Flexible visits, on your terms",
    heroImg: "ff72ba_3a8fe18215c24b3e9cb6884f0bf44228~mv2.jpg",
    intro: [
      "From a friendly daily call-in upwards, our visiting care fits around your routine — never the other way round. Friendly Care Professionals help with everyday life and brighten the day, with the same familiar faces building real relationships.",
      "Visit lengths flex to suit you, from a short call-in upwards, because good care shouldn't be rushed.",
    ],
    includedTitle: "What visiting care can include",
    included: [
      "Flexible visit lengths to suit you",
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
      "Live-in care at home across Trowbridge, Bradford-on-Avon, Melksham, Westbury & Frome — round-the-clock one-to-one support from a dedicated Care Professional, from £1,550 a week.",
    h1: "Live-in Care",
    subtitle: "Round-the-clock support, comfort and peace of mind in the place you call home",
    heroImg: "live-in-who.jpg",
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
    serviceType: "Live-in care",
    areaServed: [
      "Trowbridge", "Bradford-on-Avon", "Melksham", "Westbury", "Frome",
      "West Wiltshire", "Somerset",
    ],
    priceFrom: { amount: 1550, unit: "WEEK" },
    sections: [
      {
        eyebrow: "Around-the-clock care",
        h2: "How live-in care works",
        body: [
          "With live-in care, a dedicated Care Professional moves into the home and is there day and night — so there's always a familiar, capable person on hand. You provide a spare room and meals, and we take care of everything else.",
          "Most people have one or two regular Care Professionals who learn their routines, their likes and dislikes, and the way they want things done. We arrange cover for breaks and time off, so the support never stops and the faces stay familiar.",
        ],
      },
      {
        eyebrow: "A reassuring alternative",
        h2: "Live-in care or a care home?",
        body: [
          "For many families, live-in care is the alternative to moving into a residential or nursing home. Instead of fitting around a care home's routines and shared staff, your loved one stays in their own home with one-to-one support shaped entirely around them.",
          "It means keeping the garden, the pets, the neighbours and the familiar bedroom — and, for couples, staying together under the same roof rather than being separated. The comfort of home often does as much good as the care itself.",
        ],
        list: [
          "Stay in the home and community they know",
          "One-to-one care, not shared between many residents",
          "Keep pets, hobbies and daily routines",
          "Couples can stay together, supported by one Care Professional",
          "A familiar face who really gets to know them",
        ],
      },
      {
        eyebrow: "Cost & funding",
        h2: "What live-in care costs",
        body: [
          "Live-in care with Otter Homecare starts from £1,550 a week, with a personalised quote after a free home assessment. For couples, one live-in Care Professional can often support both of you, which can make it better value than two places in a care home.",
          "We'll talk you through any funding you may be entitled to — from local authority support and NHS Continuing Healthcare to Attendance Allowance — so you have the full picture before you decide. There's more on our <a href='/cost-of-home-care'>cost of home care</a> page.",
        ],
      },
      {
        eyebrow: "Local, familiar faces",
        h2: "Live-in care across Wiltshire & Somerset",
        body: [
          "We provide live-in care at home across West Wiltshire and into Somerset, with a local team who live a few minutes from the people they care for. If you're looking for live-in care in <a href='/trowbridge'>Trowbridge</a>, <a href='/bradford-on-avon'>Bradford-on-Avon</a>, <a href='/melksham'>Melksham</a>, <a href='/westbury'>Westbury</a> or <a href='/frome'>Frome</a> — and the villages around them — we'd love to help.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is live-in care?",
        a: ["Live-in care means a Care Professional lives in the home and provides support day and night. It's a one-to-one alternative to a care home that lets someone stay in familiar surroundings with help always close by."],
      },
      {
        q: "How is live-in care different from visiting care?",
        a: ["Visiting care is scheduled calls through the day. Live-in care is continuous, with a Care Professional staying in the home around the clock. Live-in care suits people who need support at unpredictable times, or reassurance through the night."],
      },
      {
        q: "Do I need to provide a room?",
        a: ["Yes. The Care Professional needs their own bedroom and somewhere to take breaks, plus access to meals. Beyond that, we fit around your home and routines."],
      },
      {
        q: "What happens when the Care Professional sleeps or takes a break?",
        a: ["Live-in Care Professionals need rest and regular breaks, so we plan cover and a sleep routine as part of the care plan. If someone needs hands-on help through the night, we'll talk about waking-night support or a second Care Professional."],
      },
      {
        q: "How much does live-in care cost?",
        a: ["Live-in care starts from £1,550 a week, with a personalised quote after a free home assessment. The exact cost depends on the level of support needed."],
      },
      {
        q: "Is live-in care cheaper than a care home?",
        a: ["It can be — especially for couples, where one live-in Care Professional can support both people for a single fee. We'll help you compare the real costs against residential care."],
      },
      {
        q: "Can live-in care support someone with dementia?",
        a: ["Yes. Continuity and familiar surroundings are especially valuable in dementia care, and our Care Professionals have advanced dementia training so day-to-day life stays as calm and settled as possible."],
      },
      {
        q: "Which areas do you cover for live-in care?",
        a: ["We provide live-in care across West Wiltshire and Somerset, including Trowbridge, Bradford-on-Avon, Melksham, Westbury and Frome, and the surrounding villages."],
      },
    ],
  },
  {
    slug: "fall-recovery",
    name: "Fall Recovery",
    title: "Fall Recovery Support at Home | Otter Homecare",
    description:
      "Swift, safe fall recovery support at home in Wiltshire and Somerset, using the Raizer lifting chair to help someone up safely and with dignity. Available to existing clients.",
    h1: "Fall Recovery Support",
    subtitle: "Swift, safe support if a fall happens",
    heroImg: "fall-recovery-photo.jpg",
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
  {
    slug: "respite-care",
    name: "Respite Care",
    title: "Respite Care in Wiltshire & Somerset | Otter Homecare",
    description:
      "Planned short-term respite care at home in Wiltshire and Somerset — so family carers can rest, travel or recover, knowing their loved one is in kind, capable hands.",
    h1: "Respite Care",
    subtitle: "A proper break for family carers — with your loved one safe at home",
    heroImg: "out-and-about.jpg",
    intro: [
      "Caring for someone you love is one of the most important things a person can do — and one of the most tiring. Respite care gives family carers a planned break, from a single afternoon to a few weeks, while your loved one stays comfortable in their own home.",
      "Whether you need cover for a holiday, time to recover from your own illness or operation, or simply a regular breather each week, we step in gently — following the routines your loved one already knows.",
    ],
    includedTitle: "What respite care can cover",
    included: [
      "Everything your loved one usually receives — personal care, medication, meals",
      "Companionship and reassurance while you're away",
      "Regular visits or full live-in cover, depending on what you need",
      "A handover with you before you go, so routines carry on seamlessly",
      "Updates through our Care App, so you can truly switch off",
    ],
    secondListTitle: "When families use respite care",
    secondList: [
      "A holiday or a few days away",
      "Recovering from your own illness or operation",
      "A regular weekly break to recharge",
      "Covering a family carer's work or other commitments",
      "Trying out home care before a longer arrangement",
    ],
    price:
      "Respite visits start from £36 per hour, with live-in respite from £1,550 per week — you only pay for the cover you need, with no joining fees. We'll talk it through at a free assessment.",
  },
];
