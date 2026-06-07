// v5 town-page data — drives /[slug] town pages + the /areas-we-cover hub.
// Content reconciled from the captured Wix copy + Otterly Outstanding deep-dive,
// confirmed by Jamie 2026-06-07. Photos self-hosted in /public/img.

export interface Town {
  slug: string;
  name: string;            // display name
  title: string;           // <title>
  description: string;     // meta description
  h1: string;
  intro: string;
  locHeadline: string;     // "Care from people who know X"
  locBody: string;         // may contain <b> — rendered with set:html
  photo: string;           // /img/town-*.jpg
  chips: string[];         // surrounding villages
  cardBlurb: string;       // short blurb for the Areas hub card
  testimonial: { quote: string; author: string; role: string };
}

export const towns: Town[] = [
  {
    slug: "trowbridge",
    name: "Trowbridge",
    title: "Home Care in Trowbridge | Otter Homecare",
    description: "Compassionate home care in Trowbridge and nearby villages — visiting care, dementia support and live-in care, with flexible visits to suit you. Call 01225 690022.",
    h1: "Home care in Trowbridge",
    intro: "Trowbridge is our home town — it's where our office is and where many of our team live. We provide warm, professional home care across Trowbridge and the surrounding villages, helping your loved ones stay safe, comfortable and independent in the home they love.",
    locHeadline: "Care from people who know Trowbridge",
    locBody: "Our Care Professionals live locally, so they're never far away. We know the town, the GP surgeries and the community — and we can be with you quickly when it matters. It's also where we host our <b>Otter Café</b> community get-togethers at Staverton Village Hall, over tea, cake and good company.",
    photo: "/img/town-trowbridge.jpg",
    chips: ["Hilperton","Staverton","Southwick","North Bradley","Wingfield","West Ashton","Keevil","Semington","Steeple Ashton","Great Hinton","Littleton","Hoggington"],
    cardBlurb: "Our home town. Care across Trowbridge and the villages from Hilperton to Steeple Ashton.",
    testimonial: { quote: "She is such a gentle and caring soul and has been a godsend for my parents. We all really appreciate having Pam in our lives.", author: "Lyn E", role: "Daughter of Client" },
  },
  {
    slug: "bradford-on-avon",
    name: "Bradford-on-Avon",
    title: "Home Care in Bradford-on-Avon | Otter Homecare",
    description: "Professional home care in Bradford-on-Avon and surrounding villages — visiting care, dementia support and live-in care, with flexible visits to suit you. Call 01225 690022.",
    h1: "Home care in Bradford-on-Avon",
    intro: "From the riverside town to the hillside villages, we provide compassionate home care across Bradford-on-Avon and nearby. Whether it's a daily visit, dementia support or full live-in care, our small local team helps your loved ones stay independent at home.",
    locHeadline: "Care from people who know Bradford-on-Avon",
    locBody: "Our Care Professionals know the area well — the steep lanes, the villages up the valley, and how to be there quickly when you need us. Local, familiar faces, every visit.",
    photo: "/img/town-bradford-on-avon.jpg",
    chips: ["Winsley","Turleigh","Westwood","Avoncliff","Limpley Stoke","Monkton Farleigh","Iford"],
    cardBlurb: "Care across Bradford-on-Avon, Winsley, Westwood, Limpley Stoke and nearby.",
    testimonial: { quote: "Otter staff are superb in every way. They are kind, and really understand what being caring carers is all about.", author: "Frances W", role: "Client" },
  },
  {
    slug: "melksham",
    name: "Melksham",
    title: "Home Care in Melksham | Otter Homecare",
    description: "Compassionate home care in Melksham and nearby villages — visiting care, dementia support and live-in care, with flexible visits to suit you. Call 01225 690022.",
    h1: "Home care in Melksham",
    intro: "We provide warm, professional home care across Melksham and the surrounding villages — from a friendly daily visit to round-the-clock live-in support — so your loved ones can stay safe and comfortable in their own home.",
    locHeadline: "Care from people who know Melksham",
    locBody: "Our Care Professionals live locally and know Melksham and its villages well. That means familiar faces, quick response when it matters, and care that fits into the life and community your loved one already knows.",
    photo: "/img/town-melksham.jpg",
    chips: ["Broughton Gifford","Whitley","Atworth","Shaw","Bowerhill","Beanacre","Seend","Seend Cleeve"],
    cardBlurb: "Supporting Melksham and the villages including Atworth, Shaw, Seend and Beanacre.",
    testimonial: { quote: "All home care should be as good as this. Lovely carers, nothing is too much trouble — they don't just do the job, they care.", author: "E S", role: "Client" },
  },
  {
    slug: "westbury",
    name: "Westbury",
    title: "Home Care in Westbury | Otter Homecare",
    description: "Compassionate home care in Westbury and nearby villages — visiting care, dementia support and live-in care, with flexible visits to suit you. Call 01225 690022.",
    h1: "Home care in Westbury",
    intro: "Beneath the White Horse, we provide compassionate home care across Westbury and the surrounding villages. From daily visits to dementia and live-in care, our small local team helps your loved ones stay independent in the home they love.",
    locHeadline: "Care from people who know Westbury",
    locBody: "Our Care Professionals live locally and know Westbury and its villages — so you get familiar faces who can be with you quickly, and care that's genuinely part of the community.",
    photo: "/img/town-westbury.jpg",
    chips: ["Dilton Marsh","Bratton","Edington","Heywood","Hawkeridge","Chapmanslade","Upton Scudamore"],
    cardBlurb: "Care in Westbury and the villages including Dilton Marsh, Bratton and Edington.",
    testimonial: { quote: "The Otter Home Care staff were incredibly kind and considerate in all their dealings with me and my family.", author: "J K", role: "Stepson of Client" },
  },
  {
    slug: "frome",
    name: "Frome",
    title: "Home Care in Frome | Otter Homecare",
    description: "Trusted home care in Frome and surrounding villages — visiting care, dementia support and live-in care, with flexible visits to suit you. Call 01225 690022.",
    h1: "Home care in Frome",
    intro: "Frome is our Somerset town. We provide warm, professional home care across Frome and the surrounding villages, helping your loved ones stay safe, comfortable and independent at home — with the same small-team, one-to-one care we bring across the border in Wiltshire.",
    locHeadline: "Care from people who know Frome",
    locBody: "Our Care Professionals live locally and know Frome and its villages well — familiar faces who can reach you quickly, and care that fits naturally into community life.",
    photo: "/img/town-frome.jpg",
    chips: ["Beckington","Nunney","Mells","Rode","Norton St Philip","Woolverton","Tellisford","Chantry","Great Elm","Feltham"],
    cardBlurb: "Our Somerset town. Care across Frome and villages including Beckington, Rode and Norton St Philip.",
    testimonial: { quote: "I cannot recommend Otter Home Care highly enough. We used them to provide care for my elderly dad and they were wonderful.", author: "Helen F", role: "Daughter of Client" },
  },
];

// The 4 shared "How we can help" cards (identical across towns).
export const helpCards = [
  { href: "/personal-care",  img: "/img/svc-personal.jpg",     title: "Personal Care",     blurb: "Washing, dressing, medication and everyday routines, always with dignity." },
  { href: "/live-in-care",   img: "/img/svc-livein.jpg",       title: "Live-in Care",      blurb: "Round-the-clock, one-to-one support in the home they know best." },
  { href: "/companionship",  img: "/img/svc-companionship.jpg",title: "Companionship",     blurb: "Friendly visits and good company that keep loneliness at bay." },
  { href: "/conditions",     img: "/img/svc-specialist.jpg",   title: "Specialist Support",blurb: "Dementia, stroke recovery, frailty and end-of-life care." },
];
