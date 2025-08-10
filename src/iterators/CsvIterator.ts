import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const file = readFileSync(filePath, "utf-8");
    const lines = file.trim().split("\n");
    const [, ...dataLines] = lines; // skip header

    this.users = dataLines.map(line => {
      const [idStr, name, email, phone] = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/(^"|"$)/g, ''));
      return {
        id: parseInt(idStr, 10),
        name,
        email,
        phone,
      };
    });
  }

  [Symbol.iterator](): Iterator<UserData> {
    let index = 0;
    const users = this.users;

    return {
      next(): IteratorResult<UserData> {
        if (index < users.length) {
          return { value: users[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
