export type ChapterStat = {
  label: string;
  value: string;
};

export type Chapter = {
  id: string;
  yearLabel: string;
  eraLabel: string;
  chapterNumber: string; // e.g. "01 / 04"
  title: string;
  body: string;
  stats?: ChapterStat[];
  // 0..1 percentage of the entire timeline scroll where this chapter is active
  scrollSegment: [number, number];
  // 0..1 percentage along the track path where the marker should rest
  trackProgress: [number, number];
};

export const chapters: Chapter[] = [
  {
    id: "birth",
    yearLabel: "2003 — 2005",
    eraLabel: "THE BIRTH",
    chapterNumber: "01 / 04",
    title: "Built to break the formula.",
    body: "Construction begins September 2003 on a steep, anti-clockwise circuit designed by Hermann Tilke — a deliberate departure from his usual long-straight, hairpin formula. Eighteen months and $40 million later, Istanbul Park hosts its first Turkish Grand Prix in August 2005. Drivers are stunned. The world has just got a new modern classic.",
    stats: [
      { label: "OPENED", value: "AUG 2005" },
      { label: "DESIGNER", value: "H. TILKE" },
      { label: "COST", value: "$40M" },
      { label: "DIRECTION", value: "ANTI-CW" },
    ],
    scrollSegment: [0, 0.25],
    trackProgress: [0, 0.25],
  },
  {
    id: "golden",
    yearLabel: "2005 — 2011",
    eraLabel: "THE GOLDEN ERA",
    chapterNumber: "02 / 04",
    title: "Türkiye on the world stage.",
    body: "Seven Grands Prix in seven years. Felipe Massa wins three in a row (2006-2008) and is crowned 'King of Istanbul'. Turn 8 — quickly nicknamed Diabolica — is rated by drivers alongside Spa's Eau Rouge. The 2011 race sets the all-time record for pit stops in a dry F1 race: 82. Istanbul Park is a global broadcast star.",
    stats: [
      { label: "RACES", value: "7" },
      { label: "MASSA WINS", value: "3×" },
      { label: "PIT STOPS '11", value: "82 ★" },
      { label: "TV REACH", value: "1.5B+" },
    ],
    scrollSegment: [0.25, 0.55],
    trackProgress: [0.25, 0.55],
  },
  {
    id: "fall",
    yearLabel: "2011",
    eraLabel: "THE FALL",
    chapterNumber: "03 / 04",
    title: "The math stopped working.",
    body: "On 30 July 2011, Formula 1 announces Türkiye is off the 2012 calendar. The hosting fee — roughly $26M per year — is too high for promoters. Tickets are too expensive; the 125,000-seat circuit is rarely full. Drivers loved it. The accountants did not. Türkiye loses a global stage in a single decision.",
    stats: [
      { label: "ANNOUNCED", value: "JUL 2011" },
      { label: "FEE / YEAR", value: "$26M" },
      { label: "CAPACITY", value: "125K" },
      { label: "FILLED", value: "RARELY" },
    ],
    scrollSegment: [0.55, 0.7],
    trackProgress: [0.55, 0.7],
  },
  {
    id: "comeback",
    yearLabel: "2012 — 2021",
    eraLabel: "QUIET YEARS · COMEBACK",
    chapterNumber: "04 / 04",
    title: "Never quite gone.",
    body: "The track survives on track days, World Rallycross weekends, and corporate events. Then COVID rewrites the calendar. F1 returns in 2020 — and Lewis Hamilton, starting sixth in pouring rain, wins his seventh world title at Istanbul Park, equaling Schumacher. Bottas wins in 2021. The world remembers what it was missing.",
    stats: [
      { label: "TRACK DAYS", value: "EST. 2013" },
      { label: "RETURN", value: "2020" },
      { label: "HAMILTON 7×", value: "HERE" },
      { label: "BOTTAS WIN", value: "2021" },
    ],
    scrollSegment: [0.7, 1.0],
    trackProgress: [0.7, 1.0],
  },
];
