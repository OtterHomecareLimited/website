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
        "Everyone I have seen has gone the extra mile and for me at this extremely difficult stage of his quickly diminishing control it has been a God send. I cannot recommend them highly enough.",
      who: "J W · Wife of Client",
    },

    serviceType: "Personal care at home",
    areaServed: ["Trowbridge", "Bradford-on-Avon", "Melksham", "Westbury", "Frome", "West Wiltshire", "Somerset"],
    priceFrom: { amount: 27.5, unit: "30-minute visit" },
    sections: [
      {
        eyebrow: "The honest bit",
        h2: "Nobody looks forward to needing this",
        body: [
          "Help with washing, dressing or the toilet is the part of care people put off longest, and often the part they're least willing to talk about. That reluctance is completely reasonable, and it's worth saying out loud rather than pretending otherwise.",
          "What makes it bearable is not being cheerful about it. It's the same few people, every time, who already know how you like things done — so you're not explaining yourself to a stranger, and nobody is learning on you.",
        ],
      },
      {
        eyebrow: "How we work",
        h2: "Dignity, in practice rather than in a brochure",
        body: [
          "Before anyone starts, our Registered Manager or a Care Supervisor visits to write the care plan with you — not just what help is needed, but how you want it done. Which side you prefer to be helped from, what you'd rather do yourself, what you'd rather nobody mentioned. It's recorded so it doesn't depend on anyone's memory.",
          "Every Care Professional is directly employed by us, DBS-checked, and trained by our own in-house trainer beyond the mandatory basics before they visit anyone alone. We are not an introductory agency passing you a name and a number.",
        ],
        list: [
          "The same small team, who learn how you like things",
          "Preferences written into the care plan, not left to memory",
          "Directly employed and DBS-checked — never subcontracted",
          "Trained in-house before a first solo visit",
          "Male or female Care Professional, if you have a preference",
        ],
      },
      {
        eyebrow: "Working with others",
        h2: "Alongside your GP and the district nurses",
        body: [
          "Personal care often sits next to other help — district nurses for dressings, a GP managing medication, a physiotherapist after a fall. We talk to them directly rather than leaving families to relay messages between people who ought to be speaking to each other.",
          "Medication is recorded electronically at each visit, and families can see what was given and when through the <a href='/family/care-app'>care app</a>, wherever they are.",
        ],
      },
      {
        eyebrow: "Cost and funding",
        h2: "What personal care costs",
        body: [
          "Personal care is charged at our standard visiting rates — £36 for an hour on a weekday, £31.75 for 45 minutes, £27.50 for half an hour, with no travel or call-out charge. Home care is VAT-exempt.",
          "Council funding, Direct Payments, Attendance Allowance and NHS Continuing Healthcare may all help with the cost. The full rate card and an explanation of each route is on our <a href='/cost-of-home-care'>costs and funding page</a>.",
        ],
      },
    ],
    faqs: [
      { q: "Can I ask for a male or female Care Professional?",
        a: ["Yes, and you should. It's one of the first things we ask at the assessment, and it goes in the care plan. Most people have a preference for personal care and there is nothing awkward about saying so."] },
      { q: "Will it be the same person each time?",
        a: ["A small regular team rather than one individual, so that holidays and illness don't leave you with a stranger. You'll meet them before they start, and they'll already have read how you like things done."] },
      { q: "What if I only need help on some days?",
        a: ["That's fine. Plenty of people book two or three mornings a week rather than every day. We'd rather you had exactly what you need than a package that looks tidier on paper."] },
      { q: "Do you help with continence care?",
        a: ["Yes — discreetly, and it's written into the plan like anything else. If continence products or a district nurse referral would help, we'll raise it rather than leave you to work it out."] },
      { q: "How is medication handled?",
        a: ["Depending on what you need, we prompt, assist or administer, and it's recorded electronically at every visit rather than on a paper sheet in the kitchen. Family can see what was given and when through the care app."] },
    ],
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

    serviceType: "Home visiting care",
    areaServed: ["Trowbridge", "Bradford-on-Avon", "Melksham", "Westbury", "Frome", "West Wiltshire", "Somerset"],
    priceFrom: { amount: 27.5, unit: "30-minute visit" },
    sections: [
      {
        eyebrow: "How it works",
        h2: "Visits built around the day you already have",
        body: [
          "Visiting care is exactly what it sounds like: a Care Professional comes to the home for an agreed length of time, does what needs doing, and leaves things as you'd want them. It might be one call-in a day to help someone get up and dressed, or four visits from morning to bedtime.",
          "What it isn't is a fixed package you have to fit into. We start from the day you already have — when you like to get up, when you eat, when your programmes are on — and put the visits around that. If mornings are the hard part and the rest of the day is fine, that's all you need to book.",
        ],
      },
      {
        eyebrow: "Length and frequency",
        h2: "How long, and how often",
        body: [
          "We offer 30-minute, 45-minute and one-hour visits, from once a week to several times a day. Most people start with more than they think they'll need and scale back, or start small and add as things change — both are fine, and there's no notice penalty for adjusting.",
          "If you're finding the nights harder than the days, overnight support is a separate option — a sleeping night for occasional help, or a waking night for active care. And if visits stop being enough, <a href='/live-in-care'>live-in care</a> is the usual next step rather than a move into a home.",
        ],
        list: [
          "30, 45 or 60-minute visits",
          "From weekly to several times a day",
          "Morning, lunchtime, teatime and bedtime calls",
          "Sleeping or waking nights where they're needed",
          "Change the pattern as needs change, without penalty",
        ],
      },
      {
        eyebrow: "Cost and funding",
        h2: "What visiting care costs",
        body: [
          "A one-hour weekday visit is £36, 45 minutes is £31.75 and 30 minutes is £27.50, with published rates for weekends and bank holidays too. There is no travel charge and no call-out fee anywhere we cover, and home care is VAT-exempt.",
          "We publish the whole rate card rather than asking you to ring for a number, along with the four routes that might help pay for it — council funding, Attendance Allowance, self-funding and NHS Continuing Healthcare. It's all on our <a href='/cost-of-home-care'>costs and funding page</a>.",
        ],
      },
    ],
    faqs: [
      { q: "What's the shortest visit you do?",
        a: ["Thirty minutes. That's enough for a medication prompt, help getting up or settled, or a quick check that everything is as it should be. If half an hour turns out to be a rush, say so and we'll lengthen it — nobody does good work against a stopwatch."] },
      { q: "How quickly can visits start?",
        a: ["We can usually carry out the free home assessment the same day you call, and have care in place within 48 hours. If it's more urgent than that, tell us when you ring and we'll be straight with you about what we can do."] },
      { q: "Will it be the same Care Professional every time?",
        a: ["That's the point of keeping the team small. You'll have a regular group who know your routine rather than whoever the rota produces, and you'll meet them before they start. Holidays and illness happen, but we'll tell you in advance rather than sending a stranger unannounced."] },
      { q: "Do you charge more for travel, or for weekends?",
        a: ["Never for travel — the rate is the same whether you're in the middle of Trowbridge or out in a village, and there's no call-out fee. Weekends and bank holidays do carry a higher rate, and every figure is published on the costs page so there are no surprises on the invoice."] },
      { q: "Can we change the visits later?",
        a: ["Yes, and most people do. Needs rarely stay still. We review the plan with you regularly, and you can add, shorten or drop visits as things change — there's no notice penalty for reducing care."] },
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

    serviceType: "Companionship care",
    areaServed: ["Trowbridge", "Bradford-on-Avon", "Melksham", "Westbury", "Frome", "West Wiltshire", "Somerset"],
    priceFrom: { amount: 27.5, unit: "30-minute visit" },
    sections: [
      {
        eyebrow: "Why it counts as care",
        h2: "Loneliness does real damage",
        body: [
          "Companionship is easy to treat as the soft option — the thing you book once the important care is arranged. In practice it's often the visit that changes the most. Someone who has spoken to nobody since Tuesday eats less, moves less and reports less, and the decline that follows is rarely put down to loneliness.",
          "A regular visit from someone who remembers what you told them last week is not a luxury. It's frequently the difference between a person who is managing and a person who is quietly stopping.",
        ],
      },
      {
        eyebrow: "What a visit looks like",
        h2: "Company, and whatever the day needs",
        body: [
          "There's no script. Some visits are a pot of tea and the crossword. Some are a walk, a trip to the shops, or getting to a club that stopped being manageable alone. Some are practical — a bit of tidying, a hand with the post, someone to sit with while a form gets filled in.",
          "Because our Care Professionals are trained care staff rather than sitters, a companionship visit can quietly include the practical help that makes the difference, without it needing to be a separate booking.",
        ],
        list: [
          "Conversation, hobbies, games and reminiscing",
          "Walks, outings and getting to clubs or church",
          "Company for meals, appointments and errands",
          "Light practical help around the house",
          "A regular, familiar face rather than a rotating one",
        ],
      },
      {
        eyebrow: "Something we fund ourselves",
        h2: "The Otter Happy Hour",
        body: [
          "Every so often we put on an extra hour that nobody is billed for — the Otter Happy Hour. It exists to do the thing that never quite fits into a scheduled visit: a trip out to Longleat or a local farm, an afternoon with an old hobby, or simply going somewhere that matters to someone.",
          "One lady asked to be taken up by the White Horse, to the spot where her husband's ashes had been scattered. Another had once helped at a local stable, so we took her back to see the horses. We pay for that time because care isn't only about safety and support. There are more of them on our <a href='/real-moments'>real moments page</a>.",
        ],
      },
      {
        eyebrow: "Cost and funding",
        h2: "What companionship care costs",
        body: [
          "Companionship is charged at the same visiting rates as any other care — £36 for a weekday hour, £31.75 for 45 minutes, £27.50 for half an hour, with no travel or call-out charge. If we drive you somewhere, mileage is 55p a mile and always agreed with you first.",
          "It can also be funded the same ways as any other home care. The full rate card and the funding routes are on our <a href='/cost-of-home-care'>costs and funding page</a>.",
        ],
      },
    ],
    faqs: [
      { q: "Is companionship cheaper than personal care?",
        a: ["No — it's the same hourly rate. The person coming has the same training and the same DBS check, and often ends up helping with practical things too. What changes is what the hour is spent on, not what it costs."] },
      { q: "Can you take my mother out, not just sit with her?",
        a: ["Yes, and it's often the best use of the visit. Shops, appointments, a café, a club, church on a Sunday. If we drive, mileage is 55p a mile and agreed with you beforehand."] },
      { q: "What is the Otter Happy Hour?",
        a: ["An extra hour we fund ourselves, so it costs you nothing, used for something that wouldn't fit in a normal visit — a trip out, an old hobby, a place that means something. Ask your Care Professional or ring the office."] },
      { q: "How do you decide who visits?",
        a: ["We match on personality as much as availability — shared interests, temperament, whether someone wants conversation or quiet company. If it isn't clicking, tell us and we'll change it. Nobody should feel they have to make do."] },
      { q: "Can companionship include practical help?",
        a: ["Yes. Light tidying, laundry, a hand with post and forms, help preparing a meal. Our Care Professionals are trained care staff, so if personal care is needed later it doesn't mean starting again with someone new."] },
    ],
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
        "We have gone from thinking our mum would be going into a care home imminently, to having mum safe, supported and most of all happy in her own home now.",
      who: "Anna B · Family of a client, via Google",
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
