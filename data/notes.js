export const notes = [
  {
    id: "note-android",
    title: "Android architecture that stays readable",
    date: "2026-08-01",
    category: "Android",
    readTime: "6 min",
    summary: "Architecture is useful when it makes change easier to reason about.",
    href: "/note-android.html",
    sections: [
      {
        heading: "Start with responsibility",
        body: "Each layer should have one job that can be explained without a diagram."
      },
      {
        heading: "Prefer visible boundaries",
        body: "Boundaries help when they reduce accidental coupling."
      }
    ]
  },
  {
    id: "note-ai",
    title: "AI products should explain themselves",
    date: "2026-08-06",
    category: "AI / Product",
    readTime: "5 min",
    summary: "A useful intelligent feature should reduce uncertainty, not hide it.",
    href: "/note-ai.html",
    sections: [
      {
        heading: "Keep intent visible",
        body: "Users need to see what the system is trying to do and how to correct it."
      },
      {
        heading: "Explain the useful part",
        body: "Explanation should answer the next question the user has."
      }
    ]
  }
];
