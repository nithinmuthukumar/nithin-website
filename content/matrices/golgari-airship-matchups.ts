import type { SideboardMatrixProps } from "@/components/blog/SideboardMatrix";

export const title = "Golgari Airship: Sideboard Matrix";

export const matrix: SideboardMatrixProps = {
  sideboardCards: [
    { name: "Day of Black Sun", count: 2 },
    { name: "Duress", count: 4 },
    { name: "Intimidation Tactics", count: 2 },
    { name: "Origin of Metalbending", count: 1 },
    { name: "Soul-Guide Lantern", count: 1 },
    { name: "Strategic Betrayal", count: 2 },
    { name: "The End", count: 1 },
    { name: "Urgent Necropsy", count: 1 },
    { name: "Vicious Rivalry", count: 1 },
  ],
  maindeckCards: [
    { name: "Badgermole Cub", count: 4 },
    { name: "Beseech the Mirror", count: 4 },
    { name: "Bitter Triumph", count: 1 },
    { name: "Deep-Cavern Bat", count: 1 },
    { name: "Gene Pollinator", count: 4 },
    { name: "Leatherhead, Swamp Stalker", count: 1 },
    { name: "Llanowar Elves", count: 2 },
    { name: "Multiversal Passage", count: 3 },
    { name: "Mutagen Man, Living Ooze", count: 3 },
    { name: "Obsessive Pursuit", count: 4 },
    { name: "Phoenix Fleet Airship", count: 1 },
    { name: "Professor Dellian Fel", count: 1 },
    { name: "Sentinel of the Nameless City", count: 2 },
    { name: "The Ooze", count: 1 },
    { name: "The Witch's Vanity", count: 2 },
    { name: "Tragic Trajectory", count: 3 },
    { name: "Witherbloom Charm", count: 2 },
  ],
  matchups: [
    {
      name: "Prowess",
      colors: ["U", "R"],
      in: { "Day of Black Sun": 2, "Strategic Betrayal": 2, Duress: 4 },
      out: {
        "Deep-Cavern Bat": 1,
        "Beseech the Mirror": 2,
        "Phoenix Fleet Airship": 1,
        "Mutagen Man, Living Ooze": 1,
        "Llanowar Elves": 2,
        "Bitter Triumph": 1,
      },
    },
    {
      name: "Landfall",
      colors: ["G"],
      in: { "Day of Black Sun": 2, "The End": 1, "Intimidation Tactics": 2 },
      out: {
        "Professor Dellian Fel": 1,
        "Sentinel of the Nameless City": 2,
        "The Witch's Vanity": 2,
      },
    },
    {
      name: "Lessons",
      colors: ["U", "R"],
      in: {
        "Strategic Betrayal": 2,
        Duress: 4,
        "Soul-Guide Lantern": 1,
        "Origin of Metal Bending": 1,
        "Urgent Necropsy": 1,
      },
      out: {
        "Llanowar Elves": 2,
        "Bitter Triumph": 1,
        "Deep-Cavern Bat": 1,
        "Tragic Trajectory": 3,
        "The Witch's Vanity": 2,
      },
    },
    {
      name: "Excruciator",
      colors: ["U", "B"],
      in: { Duress: 4, "Intimidation Tactics": 2 },
      out: {
        "Tragic Trajectory": 3,
        "The Witch's Vanity": 2,
        "Witherbloom Charm": 1,
      },
    },
    {
      name: "Spellementals",
      colors: ["U", "R"],
      in: { "Soul-Guide Lantern": 1, "Strategic Betrayal": 2, Duress: 4 },
      out: {
        "The Witch's Vanity": 2,
        "Tragic Trajectory": 1,
        "Witherbloom Charm": 2,
        "Deep-Cavern Bat": 1,
        "Llanowar Elves": 1,
      },
    },
    {
      name: "Rhythm",
      colors: ["W", "U", "G"],
      in: {
        "Vicious Rivalry": 1,
        "Intimidation Tactics": 2,
        "Day of Black Sun": 2,
      },
      out: {
        "Llanowar Elves": 2,
        "Leatherhead Swamp Stalker": 1,
        "Sentinel of the Nameless City": 2,
      },
    },
    {
      name: "Rhythm",
      colors: ["W", "G"],
      in: {
        "Vicious Rivalry": 1,
        "Intimidation Tactics": 2,
        "Day of Black Sun": 2,
      },
      out: {
        "Llanowar Elves": 2,
        "Sentinel of the Nameless City": 2,
        "Deep-Cavern Bat": 1,
      },
    },
    {
      name: "Elementals",
      colors: ["U", "R"],
      in: { "Intimidation Tactics": 2 },
      out: { "Llanowar Elves": 1, "Sentinel of the Nameless City": 1 },
    },
    {
      name: "Mobilize",
      colors: ["W", "R"],
      in: {
        "Origin of Metalbending": 1,
        "Day of Black Sun": 2,
        "Intimidation Tactics": 2,
      },
      out: {
        "Llanowar Elves": 2,
        "Deep-Cavern Bat": 1,
        "Phoenix Fleet Airship": 1,
        "The Ooze": 1,
      },
    },
    {
      name: "Midrange",
      colors: ["U", "B"],
      in: { "Intimidation Tactics": 2, "The End": 1, Duress: 1 },
      out: {
        "Deep-Cavern Bat": 1,
        "Sentinel of the Nameless City": 2,
        "The Ooze": 1,
      },
    },
    {
      name: "Momo",
      colors: ["W", "U"],
      in: {
        "Day of Black Sun": 2,
        "Intimidation Tactics": 2,
        "Vicious Rivalry": 1,
      },
      out: {
        "The Ooze": 1,
        "Badgermole Cub": 4,
      },
    },
    {
      name: "Control",
      colors: ["W", "U", "R"],
      in: {
        "Origins of Metalbending": 1,
        Duress: 4,
        "Intimidation Tactics": 2,
      },
      out: {
        "Tragic Trajectory": 3,
        "The Witch's Vanity": 2,
        "Bitter Triumph": 1,
        "Witherbloom Charm": 1,
      },
    },
    {
      name: "Omniscience",
      colors: ["U", "R", "G"],
      in: { "The End": 1, Duress: 4, "Intimidation Tactics": 2 },
      out: {
        "The Witch's Vanity": 2,
        "Witherbloom Charm": 2,
        "Tragic Trajectory": 3,
      },
    },
    {
      name: "Aggro",
      colors: ["R"],
      in: {
        "Intimidation Tactics": 2,
        "Day of Black Sun": 2,
      },
      out: {
        "Llanowar Elves": 2,
        "Deep-Cavern Bat": 1,
        "Phoenix Fleet Airship": 1,
      },
    },
    {
      name: "Reanimator",
      colors: ["U", "B", "G"],
      in: {
        "Intimidation Tactics": 2,
        "Soul-Guide Lantern": 1,
        "Strategic Betrayal": 2,
      },
      out: { "The Witch's Vanity": 2, "Tragic Trajectory": 3 },
    },
  ],
};
