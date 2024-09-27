import { atom } from "jotai";

const genderAtom = atom<string>("");
const dateOfBirthAtom = atom<Date | null>(null);

export { genderAtom, dateOfBirthAtom };
