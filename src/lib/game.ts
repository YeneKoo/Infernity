import { questions, type Mission, type Question } from "@/data/game"

export const QUESTIONS_PER_RUN = 8
export const STARTING_LIVES = 3
export const QUESTION_SECONDS = 20

export function shuffle<T>(items: T[], random = Math.random): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = copy[index]
    copy[index] = copy[swapIndex]
    copy[swapIndex] = current
  }
  return copy
}

export function buildRun(
  mission: Mission,
  count = QUESTIONS_PER_RUN,
  random = Math.random,
): Question[] {
  const pool = questions.filter((question) => question.mission === mission)
  return shuffle(pool, random)
    .slice(0, Math.min(count, pool.length))
    .map((question) => ({
      ...question,
      options: shuffle(question.options, random),
    }))
}

export function missionQuestionCount(mission: Mission): number {
  return questions.filter((question) => question.mission === mission).length
}

export function scoreForCorrect(streakAfter: number): number {
  return 100 + Math.min(streakAfter * 25, 100)
}

export function rankForScore(score: number): {
  label: "Cadet" | "Flight Engineer" | "Fire Marshal"
  description: string
} {
  if (score < 500) {
    return {
      label: "Cadet",
      description: "Keep training. Review the missed records and try again.",
    }
  }
  if (score < 1000) {
    return {
      label: "Flight Engineer",
      description: "Strong run. A little more practice and you are mission-ready.",
    }
  }
  return {
    label: "Fire Marshal",
    description: "Excellent work. You can brief a crew on these fire-safety basics.",
  }
}
