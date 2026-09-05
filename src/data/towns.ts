// v5 town-page data — drives /[slug] town pages + the /areas-we-cover hub.
// Warminster added 4 Sep 2026 (sixth town; first families there since 2026).
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

  // --- Optional depth blocks (added Aug 2026) -------------------------------
  // Rendered only when present, so towns can be deepened one at a time without
  // touching the template. Bodies may contain <b> and <br> — set:html.
  // Bradford-on-Avon, Westbury and Warminster are done; the other three still need
  // Jamie's local detail before they can be written honestly.
  localCare?: { headline: string; body: string };
  community?: { headline: string; body: string };
  funding?: { headline: string; body: string };
  faqs?: { q: string; a: string }[];
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
    faqs: [
      { q: "How quickly can care start in Trowbridge?",
        a: "We can usually carry out the free assessment the same day you call, and have care in place within 48 hours. If it is more urgent than that, say so when you ring and we will tell you honestly what we can do." },
      { q: "Do you cover the villages around the town?",
        a: "Yes — Hilperton, Staverton, Southwick, North Bradley, Wingfield, West Ashton, Keevil, Semington, Steeple Ashton, Great Hinton, Littleton and Hoggington, and the lanes between them. There is no extra charge for any of them, and no travel or call-out fee." },
      { q: "Can you help someone coming out of the RUH in Bath?",
        a: "Yes, and it is something we do often. Where it helps, we will come and assess on the ward so that care is arranged before discharge day rather than after it." },
      { q: "Will the same carers come each time?",
        a: "That is the whole reason we stay small. You will have a regular team who know the routine, rather than whoever the rota throws up — and you will meet them before they start. When one of them is on holiday or off sick, cover comes from that same small team, and we tell you who is coming." },
    ],
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
    testimonial: { quote: "Otter staff are superb in every way. They are kind, and really understand what being caring carers means.", author: "Frances W", role: "Client" },

    localCare: {
      headline: "Working with your GP and the hospital",
      body: "Most of the people we look after in Bradford-on-Avon are registered with the <b>Bradford-on-Avon &amp; Melksham Health Partnership</b> on Station Approach, <b>St Margaret's Surgery</b> on Bridge Street, or the branch surgery up at <b>Winsley</b>. Whichever is yours, we speak to them directly — and to the district nurses — so you are not left carrying messages between people who ought to be talking to each other.<br><br>We also help a good number of people home from the <b>RUH in Bath</b>. If that is where your relative is now, we can carry out the assessment on the ward rather than waiting for discharge day, so care is ready for the day they come home. We can do the same in a care home if someone is there for a short stay and wants to get back.",
    },
    community: {
      headline: "Not a patch we drive to",
      body: "Jamie, who founded Otter, lives in Bradford-on-Avon, and two of our office team live here too. We currently look after around fifteen families in and around the town.<br><br>Being local shows up in what we actually do rather than what we say. We take clients to <b>Music for the Mind</b> at the Wiltshire Music Centre, and to Beyond Dementia activities at <b>Holy Trinity Church</b>. One lady gets to church every Sunday, because that is the most important hour of her week. And a fair amount of our time goes on coffee and a change of scene — <b>Hartley Farm</b>, Merkins, Flourish over at Farleigh Hungerford, or the gardens at <b>Iford Manor</b>.",
    },
    funding: {
      headline: "Paying for care in Bradford-on-Avon",
      body: "Bradford-on-Avon is in Wiltshire, so if you are asking for help with the cost it is <b>Wiltshire Council</b> you will be dealing with — worth knowing on this side of the county, where people often assume Somerset. We look after clients funded by the council, we accept Direct Payments, and we are happy to invoice the council directly.<br><br>We also publish our rates rather than asking you to ring for a number: visiting care from £36 an hour, live-in from £1,550 a week, with no travel or call-out charge. The rate is the same whether you are on Bridge Street or up at Monkton Farleigh.",
    },
    faqs: [
      { q: "How quickly can care start in Bradford-on-Avon?",
        a: "We can usually carry out the free assessment the same day you call, and have care in place within 48 hours. If it is more urgent than that, say so when you ring and we will tell you honestly what we can do." },
      { q: "Do you cover the villages around the town?",
        a: "Yes — Winsley, Turleigh, Westwood, Avoncliff, Limpley Stoke, Monkton Farleigh and Iford, and the lanes between them. There is no extra charge for any of them, and no travel or call-out fee." },
      { q: "Can you help someone coming out of the RUH in Bath?",
        a: "Yes, and it is something we do often. Where it helps, we will come and assess on the ward so that care is arranged before discharge day rather than after it." },
      { q: "Will the same carers come each time?",
        a: "That is the whole reason we stay small. You will have a regular team who know the routine, rather than whoever the rota throws up — and you will meet them before they start. When one of them is on holiday or off sick, cover comes from that same small team, and we tell you who is coming." },
    ],
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
    testimonial: { quote: "All home care should be as good as this, lovely carers, nothing too much trouble, they don't just do the basics, but will help out with anything…", author: "E S", role: "Client" },
    faqs: [
      { q: "How quickly can care start in Melksham?",
        a: "We can usually carry out the free assessment the same day you call, and have care in place within 48 hours. If it is more urgent than that, say so when you ring and we will tell you honestly what we can do." },
      { q: "Do you cover the villages around Melksham?",
        a: "Yes — Broughton Gifford, Whitley, Atworth, Shaw, Bowerhill, Beanacre, Seend and Seend Cleeve, and the lanes between them. There is no extra charge for any of them, and no travel or call-out fee." },
      { q: "Can you help someone coming out of the RUH in Bath?",
        a: "Yes, and it is something we do often. Where it helps, we will come and assess on the ward so that care is arranged before discharge day rather than after it." },
      { q: "Will the same carers come each time?",
        a: "That is the whole reason we stay small. You will have a regular team who know the routine, rather than whoever the rota throws up — and you will meet them before they start. When one of them is on holiday or off sick, cover comes from that same small team, and we tell you who is coming." },
    ],
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
    testimonial: { quote: "The Otter Home Care staff were incredibly kind and considerate in all their dealings with me and my stepmother.", author: "J K", role: "Stepson of Client" },

    localCare: {
      headline: "Working with your GP and the hospital",
      body: "Most of the people we look after in Westbury are registered with <b>Westbury Group Practice</b> at the White Horse Health Centre on Mane Way. We speak to the surgery and to the district nurses directly, so nobody is left relaying messages between people who ought to be talking to each other.<br><br>For anything more serious it is usually the <b>RUH in Bath</b>, with the Minor Injury Unit at Trowbridge closer to hand. We help a good number of people home from the RUH, and where it helps we will carry out the assessment on the ward so care is ready for the day they get back — or in a care home, if someone is there for a short stay and wants to come home.",
    },
    community: {
      headline: "Westbury people, not visitors",
      body: "Several of our Care Professionals are from Westbury. This is their town — the school run, the shops, the people they already know — rather than a patch they drive out to. We look after a growing number of families here and in the villages around.<br><br>And we get out. We have taken clients up to the <b>White Horse</b> itself, which is not a small thing for someone who has looked at it from their window every day for fifty years and assumed those days were behind them.",
    },
    funding: {
      headline: "Paying for care in Westbury",
      body: "Westbury is in Wiltshire, so if you are asking for help with the cost it is <b>Wiltshire Council</b> you will be dealing with. We look after clients funded by the council, we accept Direct Payments, and we are happy to invoice the council directly.<br><br>We also publish our rates rather than asking you to ring for a number: visiting care from £36 an hour, live-in from £1,550 a week, with no travel or call-out charge. The rate is the same in town as it is out at Chapmanslade or Upton Scudamore.",
    },
    faqs: [
      { q: "How quickly can care start in Westbury?",
        a: "We can usually carry out the free assessment the same day you call, and have care in place within 48 hours. If it is more urgent than that, say so when you ring and we will tell you honestly what we can do." },
      { q: "Do you cover the villages around Westbury?",
        a: "Yes — Dilton Marsh, Bratton, Edington, Heywood, Hawkeridge, Chapmanslade and Upton Scudamore. There is no extra charge for any of them, and no travel or call-out fee." },
      { q: "Can you help someone coming out of the RUH in Bath?",
        a: "Yes, and it is something we do often. Where it helps, we will come and assess on the ward so that care is arranged before discharge day rather than after it." },
      { q: "Are your carers actually local to Westbury?",
        a: "Several of them are Westbury people. It is why we can be with you quickly, and why the same faces keep coming back rather than a different carer every week. When one of them is on holiday or off sick, cover comes from that same small team, and we tell you who is coming." },
    ],
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
    testimonial: { quote: "I cannot recommend Otter Home Care highly enough: we used them to provide care for my elderly dad. Their level of care was excellent, the carers were always on time and were very attentive.", author: "Helen F", role: "Daughter of Client" },
    faqs: [
      { q: "How quickly can care start in Frome?",
        a: "We can usually carry out the free assessment the same day you call, and have care in place within 48 hours. If it is more urgent than that, say so when you ring and we will tell you honestly what we can do." },
      { q: "Do you cover the villages around Frome?",
        a: "Yes — Beckington, Nunney, Mells, Rode, Norton St Philip, Woolverton, Tellisford, Chantry, Great Elm and Feltham, and the lanes between them. There is no extra charge for any of them, and no travel or call-out fee." },
      { q: "Can you help someone coming out of the RUH in Bath?",
        a: "Yes, and it is something we do often. Where it helps, we will come and assess on the ward so that care is arranged before discharge day rather than after it." },
      { q: "Will the same carers come each time?",
        a: "That is the whole reason we stay small. You will have a regular team who know the routine, rather than whoever the rota throws up — and you will meet them before they start. When one of them is on holiday or off sick, cover comes from that same small team, and we tell you who is coming." },
    ],
  },
  {
    slug: "warminster",
    name: "Warminster",
    title: "Home Care in Warminster | Otter Homecare",
    description: "Compassionate home care in Warminster and the Wylye Valley villages. Visiting care, dementia support and live-in care, with flexible visits to suit you. Call 01225 690022.",
    h1: "Home care in Warminster",
    intro: "Warminster sits at the edge of Salisbury Plain, the next town along from Westbury, where several of our Care Professionals live. We provide warm, professional home care across Warminster and the Wylye Valley villages, from a friendly daily visit to full live-in support, so your loved ones can stay safe and independent in the home they love.",
    locHeadline: "Care from people who know Warminster",
    locBody: "Warminster is a few minutes down the A350 from Westbury, where several of our Care Professionals live, and our Trowbridge office is twenty minutes away. That means we can be with you quickly, and we can send the same familiar faces each visit rather than whoever happens to be free. We know the town, from the Lake Pleasure Grounds to the Market Place, and the lanes out to <b>Sutton Veny</b>, <b>Heytesbury</b> and <b>Corsley</b>.",
    photo: "/img/town-warminster.jpg",
    chips: ["Sutton Veny","Heytesbury","Codford","Crockerton","Longbridge Deverill","Corsley","Horningsham","Bishopstrow","Norton Bavant","Maiden Bradley"],
    cardBlurb: "Our newest town. Care across Warminster and the villages from Sutton Veny to Codford and the Deverills.",
    // No Warminster review yet (we only started here in 2026). This is a genuine
    // homecare.co.uk review, spread for variety like the other five (see the
    // 2026-06-07 content pack) — swap in a Warminster family's words as soon as
    // we have one.
    testimonial: { quote: "The care I have received so far is excellent, second to none. The carers are friendly and understanding. Very knowledgeable and appear to have a high quality of training. I have been treated with full dignity and respect at all times.", author: "S M", role: "Client" },

    // Depth blocks written 4 Sep 2026 from public local sources (GP surgeries,
    // the community hospital, Beyond Dementia's Warminster group), not from
    // client stories — we don't have Warminster stories yet. Everything here is
    // checkable. Jamie (5 Sep): confident, not apologetic — say "newest town"
    // once, never "we only started in 2026".
    localCare: {
      headline: "Working with your GP and the hospital",
      body: "Warminster has two GP surgeries, <b>The Avenue Surgery</b> and <b>Smallbrook Surgery</b> up at the community hospital. Smallbrook is run by the Westbury Group Practice, the same practice we already work alongside for our Westbury clients. Whichever is yours, we speak to the surgery and to the district nurses directly, so you aren't left carrying messages between people who ought to be talking to each other.<br><br>Warminster also has its own <b>community hospital</b> on The Avenue, with wards where people recover before coming home. For anything more serious it is usually the <b>RUH in Bath</b> or <b>Salisbury District Hospital</b>, with the Minor Injuries Unit in Trowbridge closer to hand. If your relative is on a ward now, in Warminster, Bath or Salisbury, we can come and assess them there, so care is ready for the day they get home rather than the week after.",
    },
    community: {
      headline: "Warminster is on our doorstep",
      body: "Several of our Care Professionals live in Westbury, four miles up the road, and Warminster is somewhere they shop, walk and know well rather than a patch they drive out to. We already look after families here and in the villages around, the number is growing, and the same regular faces come each visit.<br><br>Dementia touches many of the families we support, and Warminster is well served. <b>Beyond Dementia</b>, the Wiltshire charity our team raised money for earlier this year, is based in the town and runs a memory group at Christ Church on Tuesday afternoons. There is a monthly memory café at the Lakeside Community Centre too. If your relative would enjoy either, we can take them along and stay. The same goes for a coffee by the lake at the <b>Pleasure Grounds</b>, a look round the shops, or a drive out towards <b>Cley Hill</b> on a clear afternoon.<br><br>Warminster is a garrison town, so many of the older people here have an Army background, or a partner who did. We take our lead from you on how you like things done.",
    },
    funding: {
      headline: "Paying for care in Warminster",
      body: "Warminster is in Wiltshire, so if you are asking for help with the cost it is <b>Wiltshire Council</b> you will be dealing with. We look after clients funded by the council, we accept Direct Payments, and we are happy to invoice the council directly.<br><br>We also publish our rates rather than asking you to ring for a number. Visiting care is from £36 an hour and live-in care from £1,550 a week, with no travel or call-out charge. The rate is the same in town as it is out at Codford or Maiden Bradley.<br><br>If you or your partner served, it is worth asking the council how a war pension is treated in the financial assessment. <b>SSAFA</b> and the <b>Royal British Legion</b> both help with that paperwork, and we can point you to the right person.",
    },
    faqs: [
      { q: "How quickly can care start in Warminster?",
        a: "We can usually carry out the free assessment the same day you call, and have care in place within 48 hours. If it is more urgent than that, say so when you ring and we will tell you honestly what we can do." },
      { q: "Do you cover the villages around Warminster?",
        a: "Yes. Sutton Veny, Heytesbury, Codford, Crockerton, Longbridge Deverill, Corsley, Horningsham, Bishopstrow, Norton Bavant and Maiden Bradley, and the lanes between them. There is no extra charge for any of them, and no travel or call-out fee." },
      { q: "Are your carers local to Warminster?",
        a: "Warminster is the newest of our six towns, and the Care Professionals who cover it live in Westbury and Trowbridge, a few minutes up the A350. You will have a small regular team who know your routine, and you will meet them before care starts." },
      { q: "Can you help someone coming out of hospital in Bath, Salisbury or Warminster?",
        a: "Yes. Where it helps, we will come and assess on the ward, whether that is the RUH, Salisbury District Hospital or the community hospital on The Avenue, so care is arranged before discharge day rather than after it." },
    ],
  },
];

// The 4 shared "How we can help" cards (identical across towns).
// The "How we can help" cards (identical across towns).
// Needs only — no live-in here. Live-in is a delivery model, not a need, and
// mixing it in made it read as a rival to personal care; it now leads the
// three-rung support block further down each town page instead. Mirrors the
// homepage grid (21 Aug 2026).
export const helpCards = [
  { href: "/personal-care",  img: "/img/personal-care-real.jpg", title: "Personal Care",     blurb: "Washing, dressing, medication and everyday routines, always with dignity." },
  { href: "/companionship",  img: "/img/svc-companionship.jpg",  title: "Companionship",     blurb: "Friendly visits and good company that keep loneliness at bay." },
  { href: "/dementia",       img: "/img/dem-stay-yourself.jpg",  title: "Dementia Care",     blurb: "Patient, familiar support that keeps someone safe at home — and themselves." },
  { href: "/conditions",     img: "/img/svc-specialist.jpg",     title: "Specialist Support",blurb: "Stroke recovery, frailty, end-of-life and other conditions." },
];
