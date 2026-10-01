/**
 * Everything a couple would want to change lives here.
 * Edit this file, drop your images in /public/images, and you're done.
 */

export type Tone = "spring" | "city" | "day" | "night" | "warm";
export type Story = { caption: string; image?: string; tone: Tone };

export type EventInfo = {
  key: string;
  title: string; // script heading, e.g. "Wedding"
  subtitle: string; // shown on the artwork, e.g. "Muhurtham"
  weekday: string;
  day: string;
  month: string;
  year: string;
  time: string; // shown on the artwork
  timeLine: string; // shown on the card
  venue: string;
  city: string;
  mapUrl: string;
  image?: string; // e.g. "/images/wedding.jpg"
  tone: Tone;
  schedule: { time: string; label: string }[];
};

export const invite = {
  groom: { name: "Lukxshanan", shortName: "Lukxshan", parents: "Son of Mr. & Mrs. Nadesan Vijitha" },
  bride: { name: "Kishanthi", shortName: "Kishanthi", parents: "Daughter of Mr. & Mrs. Henrich Ravi Swarna" },

  // ISO string WITH timezone offset. This drives the countdown.
  weddingDateTime: "2026-10-25T10:18:00+05:30",
  scratch: { month: "October", day: "25", year: "2026" },
  dateLine: "Wedding · 25 · 10 · 2026",

  tagline: "A new chapter, woven with two hearts and the blessings of family.",

  storyIntro:
    "Two hearts, two families, one beautiful beginning — and a new chapter waiting to unfold.",
  story: [
    { caption: "We met as college classmates.",image: "public/images/FirstCard.png", tone: "spring" },
    { caption: "Friendship turned into something we couldn't name.", image: "public/images/SecondCard.png", tone: "warm" },
    { caption: "We chased our dreams and built our lives abroad.", image: "public/images/ThirdCard.png", tone: "city" },
    { caption: "Through every distance, home was each other.", image: "public/images/FourthCard.png", tone: "day" },
    { caption: "And now, with your blessings, we begin forever.", image: "public/images/FifthCard.png", tone: "night" },
  ] as Story[],

  events: [
    {
      key: "wedding",
      title: "Wedding",
      subtitle: "Muhurtham",
      weekday: "Sunday",
      day: "25",
      month: "October",
      year: "2026",
      time: "10:18 AM – 11:35 AM",
      timeLine: "10:18 AM – 11:35 AM",
      venue: "Sri Sithi Vinayagar Temple",
      city: "Kallady, Batticaloa",
      mapUrl: "https://www.google.com/maps/place/%E0%AE%B8%E0%AF%8D%E0%AE%B0%E0%AF%80+%E0%AE%9A%E0%AE%BF%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AE%BF+%E0%AE%B5%E0%AE%BF%E0%AE%A8%E0%AE%BE%E0%AE%AF%E0%AE%95%E0%AE%B0%E0%AF%8D+%E0%AE%86%E0%AE%B2%E0%AE%AF%E0%AE%AE%E0%AF%8D+(Sri+Sithi+Vinayakar+Temple)/@7.7122475,81.7047616,16z/data=!4m14!1m7!3m6!1s0x3afacd4904319af3:0x4769ea14c79fdd5c!2z4K644K-N4K6w4K-AIOCumuCuv-CupOCvjeCupOCuvyDgrrXgrr_grqjgrr7grq_grpXgrrDgr40g4K6G4K6y4K6v4K6u4K-NIChTcmkgU2l0aGkgVmluYXlha2FyIFRlbXBsZSk!8m2!3d7.7122799!4d81.7098334!16s%2Fg%2F11c1q9c1x_!3m5!1s0x3afacd4904319af3:0x4769ea14c79fdd5c!8m2!3d7.7122799!4d81.7098334!16s%2Fg%2F11c1q9c1x_!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D",
      tone: "day",
      image: "/images/SixthCard.png",
      schedule: [
        { time: "8:30 AM", label: "Arrival" },
        { time: "10:18 AM", label: "Muhurtham" },
        { time: "11:35 AM", label: "Blessings" },
      ],
    },
    {
      key: "Lunch",
      title: "Lunch",
      subtitle: "Wedding Lunch",
      weekday: "Sunday",
      day: "25",
      month: "October",
      year: "2026",
      time: "12:30 PM Onwards",
      timeLine: "From 12:30 PM onwards",
      venue: "Green Garden Hotel",
      city: "Kallady, Batticaloa",
      image: "/images/SeventhCard.png",
      mapUrl: "https://www.google.com/maps/place/PP66%2BVG7+Green+Garden+Hotel+Batticaloa+Pvt,+Kallady/data=!4m2!3m1!1s0x3afacd49b710311f:0x830bc273a41562b9!18m1!1e1?entry=gps&coh=192189&g_ep=CAESBzI2LjM0LjQYACCenQoqswEsMTAwODMzOTg0LDk0MjY3NzI3LDk0MjkyMTk1LDk0Mjk5NTMyLDEwMDc5NjQ5OCwxMDA3OTc3NjEsMTAwNzk2NTM1LDk0MjgwNTc2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE4NjUzLDk0MjI5ODM5LDk0Mjc1MTY4LDk0Mjc5NjE5LDEwMDgyNTAyNSwxMDA4MjAyMzcsMTAwODIyNDk0LDEwMDgyNzk3NUICTEs%3D&skid=ce7c4b97-3c4d-40a5-8d30-b8831e9f2446&g_st=aw",
      tone: "afternoon",
      schedule: [
        // { time: "6:30 PM", label: "Welcome" },
        // { time: "7:00 PM", label: "Music" },
        // { time: "7:30 PM", label: "Feast" },
      ],
    },
  ] as EventInfo[],

  closing: {
    symbol: "ॐ",
    text: "Beyond the sacred vows, blessed by our loving families, and graced by the Almighty, we begin our forever with grateful, joyful hearts. We cannot wait to celebrate this new chapter with you.",
  },

  // WhatsApp number in international format, digits only.
  rsvpWhatsApp: "94766394336",

  // Write your own WhatsApp message here. \n = new line.
rsvpMessage: (guest: string | null) =>
  `Hello! ${guest ? `This is ${guest}. ` : ""}` +
  `We are happy to confirm our presence at ${invite.groom.shortName} & ${invite.bride.shortName}'s wedding 🎉\n` +
  `See you on 25th October!`,

  // Put your file at /public/music.mp3 (if it's missing, the music button hides itself).
  music: "/Music/Music4.mp3",
};
