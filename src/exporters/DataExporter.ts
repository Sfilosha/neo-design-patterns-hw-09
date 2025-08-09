import { UserData } from "../data/UserData";
import fetch from "node-fetch";

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = "";

  public async export() {
    await this.load();
    this.transform();
    this.beforeRender();
    this.result = this.render();
    this.afterRender();
    this.save();
  }

  protected async load() {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await resp.json();
    this.data = users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
    }));
  }

  protected transform() {
    this.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender() {
    // hook
  }

  protected afterRender() {
    // hook
  }

  protected abstract render(): string;
  protected abstract save(): void;
}
