import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const file = readFileSync(filePath, "utf-8");

    const parser = new XMLParser();

    const json = parser.parse(file);
    const rawUsers = json.users?.user;

    this.users = (Array.isArray(rawUsers) ? rawUsers : [rawUsers]).map((u: any) => ({
      id: parseInt(u.id, 10),
      name: u.name,
      email: u.email,
      phone: u.phone,
    }));
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
