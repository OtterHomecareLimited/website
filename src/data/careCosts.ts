// Every number used by /home-care-vs-care-home lives here, so the annual update
// is one file. Change these, change the page and the calculator together.
//
// CHECKED: August 2026. Next check due: August 2027 (or sooner if our rates move).
// The page renders `checked` visibly — do not update figures without updating it.
//
// Care home figures are the homes' own published charges on carehome.co.uk,
// August 2026. We publish the local band rather than a league table: these are
// homes we refer clients into, and the argument does not need a target.
//
// Do NOT substitute aggregator "average" figures. Lottie put Wiltshire
// residential dementia at £1,561/wk; two independent local homes publish
// £1,795–£1,920 and £1,800–£1,830. The averages understate real local prices by
// 15–23% and would make our comparison look dishonest to anyone holding a quote.

export const checked = "August 2026";

/** Otter's own published rates. Must match /cost-of-home-care. */
export const otter = {
  visiting: {
    // per visit, by length
    hour:      { weekday: 36.0,  weekend: 40.0,  bankHoliday: 48.0 },
    threeQtr:  { weekday: 31.75, weekend: 34.75, bankHoliday: 41.75 },
    half:      { weekday: 27.5,  weekend: 29.5,  bankHoliday: 35.5 },
  },
  night: {
    sleeping: { weekday: 240, weekend: 260, bankHoliday: 280 },
    waking:   { weekday: 290, weekend: 320, bankHoliday: 350 },
  },
  // Live-in weekly, by dependency band, plus the food charge that sits on top.
  liveIn: { A: 1550, B: 1650, C: 1800 },
  liveInFood: 50,
};

/** Local care homes, from their own published "Weekly Charges per Person". */
export const careHomes = {
  // The band we quote for dementia care, drawn from the two homes that publish it.
  dementiaResidential: { low: 1795, high: 1920 },
  dementiaRespite:     { low: 1800, high: 2105 },
  residential:         { low: 1700, high: 1795 },
  nursingFrom:         1955,
  sources: [
    { home: "Goodson Lodge, Trowbridge",        residential: "£1,750–£1,795", dementia: "£1,795–£1,920", respite: "£2,030–£2,105", funding: "Self-funding, or council funding only with a top-up. No NHS Continuing Healthcare." },
    { home: "Staverton House, Trowbridge",      residential: null,           dementia: "£1,800–£1,830", respite: "£1,800–£1,830", funding: "All four funding routes accepted." },
    { home: "Wiltshire Heights, Bradford-on-Avon", residential: "from £1,700", dementia: null,          respite: null,            funding: "All four routes. Nursing from £1,955, less any Funded Nursing Care." },
  ],
};

/** Means test and benefits. Figures from GOV.UK and Age UK, checked Aug 2026. */
export const funding = {
  capitalUpper: 23250,
  capitalLower: 14250,
  attendanceAllowance: { lower: 76.7, higher: 114.6 },
  propertyDisregardWeeks: 12,
};

// Housekeeping note, 22 Aug 2026: public/img/dem-stay-yourself.jpg and
// cond-dementia.jpg are THE SAME STOCK PHOTO saved twice at different crops
// (different bytes, identical picture). That caught us out once — the homepage
// Dementia and Conditions tiles sat side by side showing the same image. If you
// pick either file for a new tile, check what its neighbour is using.
