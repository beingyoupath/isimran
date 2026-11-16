import rawThoughtsData from "../data/thoughts.json";
import { SITE_URL } from "./seoConfig";

export type ThoughtSeason = "winter" | "summer" | "monsoon" | "festive";
export type ThoughtType = "quote" | "adapted" | "original";
export type ThoughtTheme =
  | "resilience"
  | "calm"
  | "focus"
  | "self-compassion"
  | "relationships"
  | "work"
  | "growth"
  | "gratitude"
  | "meaning";

export interface ThoughtEntry {
  id: string;
  text: string;
  short: string;
  author: string;
  source: string;
  type: ThoughtType;
  theme: ThoughtTheme;
  seasons: ThoughtSeason[];
  mmdd?: string;
  occasion?: string;
  linkTo?: string;
  helplineNote?: string;
  verified: boolean;
}

export interface WeekdayPractice {
  dayIndex: number; // 0 = Sunday .. 6 = Saturday
  weekday: string;
  emoji: string;
  title: string;
  duration: string;
  body: string;
}

export interface FestivalSlot {
  name: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  todo?: string;
  thoughtId: string;
}

export interface ThoughtsDataset {
  meta: {
    timezone: string;
    baseYear: number;
    yearStep: number | string;
    totalPoolThoughts: number;
    seasons: Record<ThoughtSeason, number[]>;
  };
  defaultThought: ThoughtEntry;
  weekdayPractices: WeekdayPractice[];
  specialDays: ThoughtEntry[];
  festivals: FestivalSlot[];
  festivalThoughts: Record<string, ThoughtEntry>;
  pool: ThoughtEntry[];
}

export interface ISTDateParts {
  year: number;
  month: number; // 1..12
  day: number; // 1..31
  mmdd: string; // MM-DD
  isoDate: string; // YYYY-MM-DD
  dayOfYear: number; // 1..366
  weekdayIndex: number; // 0..6 (Sunday..Saturday)
  weekday: string; // "Sunday".."Saturday"
  formattedDate: string; // e.g., "Monday, 16 November 2026"
  monthLabel: string; // e.g., "November 2026"
}

export interface DailyThoughtResult {
  thought: ThoughtEntry;
  practice: WeekdayPractice;
  ist: ISTDateParts;
  season: ThoughtSeason;
  matchKind: "special" | "festival" | "pool" | "fallback";
}

export interface ArchiveDayItem {
  isoDate: string;
  day: number;
  month: number;
  monthName: string;
  weekday: string;
  displayDate: string;
  thought: ThoughtEntry;
  matchKind: "special" | "festival" | "pool" | "fallback";
}

export interface ArchiveMonthGroup {
  month: number;
  monthName: string;
  items: ArchiveDayItem[];
}

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const thoughtsData = rawThoughtsData as ThoughtsDataset;

export function getDefaultThought(): ThoughtEntry {
  return thoughtsData.defaultThought;
}

export function getDefaultWeekdayPractice(): WeekdayPractice {
  return (
    thoughtsData.weekdayPractices.find((p) => p.dayIndex === 1) ||
    thoughtsData.weekdayPractices[0]
  );
}

export function getSeasonFromMonth(month: number): ThoughtSeason {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "summer";
  if (month >= 6 && month <= 9) return "monsoon";
  return "festive";
}

export function getDayOfYearUTC(year: number, month: number, day: number): number {
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, month - 1, day);
  return Math.floor((current - start) / 86400000) + 1;
}

export function buildISTDatePartsFromYMD(
  year: number,
  month: number,
  day: number
): ISTDateParts {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  const mmdd = `${mm}-${dd}`;
  const isoDate = `${year}-${mm}-${dd}`;
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const weekdayIndex = utcDate.getUTCDay();
  const weekday = WEEKDAY_NAMES[weekdayIndex];
  const monthName = MONTH_NAMES[month - 1] || "";

  return {
    year,
    month,
    day,
    mmdd,
    isoDate,
    dayOfYear: getDayOfYearUTC(year, month, day),
    weekdayIndex,
    weekday,
    formattedDate: `${weekday}, ${day} ${monthName} ${year}`,
    monthLabel: `${monthName} ${year}`,
  };
}

export function getISTDateParts(date: Date = new Date()): ISTDateParts {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formatted = formatter.format(date); // YYYY-MM-DD
    const [yStr, mStr, dStr] = formatted.split("-");
    const year = Number(yStr);
    const month = Number(mStr);
    const day = Number(dStr);

    if (
      Number.isFinite(year) &&
      Number.isFinite(month) &&
      Number.isFinite(day) &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31
    ) {
      return buildISTDatePartsFromYMD(year, month, day);
    }
  } catch {
    // Fallback below if Intl fails
  }

  // Deterministic UTC+05:30 offset calculation as fallback
  const istMillis = date.getTime() + 330 * 60 * 1000;
  const shifted = new Date(istMillis);
  return buildISTDatePartsFromYMD(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth() + 1,
    shifted.getUTCDate()
  );
}

export function getWeekdayPracticeForIST(weekdayIndex: number): WeekdayPractice {
  const list = thoughtsData.weekdayPractices || [];
  return (
    list.find((p) => p.dayIndex === weekdayIndex) ||
    getDefaultWeekdayPractice()
  );
}

export function selectThoughtForISTParts(ist: ISTDateParts): DailyThoughtResult {
  const season = getSeasonFromMonth(ist.month);
  const practice = getWeekdayPracticeForIST(ist.weekdayIndex);

  try {
    // 1. Fixed special days by MM-DD
    const specialMatch = (thoughtsData.specialDays || []).find(
      (item) => item.mmdd === ist.mmdd
    );
    if (specialMatch) {
      return {
        thought: specialMatch,
        practice,
        ist,
        season,
        matchKind: "special",
      };
    }

    // 2. Moveable festival window (inclusive [date, endDate || date]) for the current year
    const festivalMatch = (thoughtsData.festivals || []).find((fest) => {
      const start = fest.date;
      const end = fest.endDate || fest.date;
      return ist.isoDate >= start && ist.isoDate <= end;
    });
    if (festivalMatch && thoughtsData.festivalThoughts?.[festivalMatch.thoughtId]) {
      const baseThought = thoughtsData.festivalThoughts[festivalMatch.thoughtId];
      return {
        thought: {
          ...baseThought,
          occasion: baseThought.occasion || festivalMatch.name,
        },
        practice,
        ist,
        season,
        matchKind: "festival",
      };
    }

    // 3. Seasonal pool deterministic index = (dayOfYear + yearOffset) mod poolSize
    const pool = thoughtsData.pool || [];
    const seasonalPool = pool.filter((item) => item.seasons?.includes(season));
    const activePool = seasonalPool.length > 0 ? seasonalPool : pool;

    if (activePool.length > 0) {
      const baseYear = thoughtsData.meta?.baseYear || 2026;
      const yearDiff = ist.year - baseYear;
      const poolSize = activePool.length;
      const yearStep = poolSize >= 3 ? poolSize - 2 : 1;
      const yearOffset = yearDiff * yearStep;
      const rawIndex = ist.dayOfYear - 1 + yearOffset;
      const index = ((rawIndex % poolSize) + poolSize) % poolSize;

      return {
        thought: activePool[index],
        practice,
        ist,
        season,
        matchKind: "pool",
      };
    }
  } catch {
    // Fallback to fixed defaultThought so card is never empty
  }

  return {
    thought: getDefaultThought(),
    practice,
    ist,
    season,
    matchKind: "fallback",
  };
}

export function getDailyThoughtIST(date: Date = new Date()): DailyThoughtResult {
  const ist = getISTDateParts(date);
  return selectThoughtForISTParts(ist);
}

/**
 * Computes milliseconds remaining until the next 00:00:02 Asia/Kolkata (UTC+05:30).
 * India observes a permanent UTC+05:30 offset without Daylight Saving Time.
 */
export function msUntilNextISTMidnight(nowMs: number = Date.now()): number {
  const istOffsetMs = 330 * 60 * 1000;
  const istNowMs = nowMs + istOffsetMs;
  const msInDay = 86400 * 1000;
  const nextMidnightIstMs = Math.floor(istNowMs / msInDay + 1) * msInDay + 2000;
  return Math.max(1000, nextMidnightIstMs - istNowMs);
}

/**
 * Returns chronological archive entries from Jan 1 of `ist.year` up to `ist.isoDate`,
 * grouped month-by-month (latest month and day first, or chronological within month).
 */
export function getYearArchiveUntilISTToday(
  ist: ISTDateParts = getISTDateParts()
): ArchiveMonthGroup[] {
  const groupsMap = new Map<number, ArchiveDayItem[]>();

  const startUtc = Date.UTC(ist.year, 0, 1);
  const endUtc = Date.UTC(ist.year, ist.month - 1, ist.day);

  for (let ts = endUtc; ts >= startUtc; ts -= 86400000) {
    const dt = new Date(ts);
    const y = dt.getUTCFullYear();
    const m = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();
    const dayParts = buildISTDatePartsFromYMD(y, m, d);
    const selection = selectThoughtForISTParts(dayParts);

    if (!groupsMap.has(m)) {
      groupsMap.set(m, []);
    }

    groupsMap.get(m)!.push({
      isoDate: dayParts.isoDate,
      day: d,
      month: m,
      monthName: MONTH_NAMES[m - 1] || "",
      weekday: dayParts.weekday,
      displayDate: `${d} ${MONTH_NAMES[m - 1]} ${y}`,
      thought: selection.thought,
      matchKind: selection.matchKind,
    });
  }

  return Array.from(groupsMap.entries()).map(([month, items]) => ({
    month,
    monthName: MONTH_NAMES[month - 1] || "",
    items,
  }));
}

export function buildWhatsAppThoughtShareUrl(thought: ThoughtEntry): string {
  const authorPart =
    thought.author && thought.author !== "Being You Path"
      ? ` — ${thought.author} (${thought.source})`
      : "";
  const message = `"${thought.text}"${authorPart}\n— Being You Path\n${SITE_URL}/thought-of-the-day`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildCopyThoughtText(thought: ThoughtEntry): string {
  const authorPart =
    thought.author === "Being You Path"
      ? "Being You Path"
      : `${thought.author} (${thought.source}) | Being You Path`;
  return `"${thought.text}" — ${authorPart}`;
}
