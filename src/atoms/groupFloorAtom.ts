import { atom } from "jotai";

export const floors = [
  "全て",
  "B1",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;

export const selectedFloorAtom = atom<(typeof floors)[number]>(floors[0]);
