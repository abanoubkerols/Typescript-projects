import { AxiosPromise, AxiosResponse } from "axios";


interface ModalAttribute<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}


interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}


interface Event {
  on(evenName: string, callback: () => void): void;
  trigger(event: string): void;
}


interface HasId{
    id? :number
}


export class Model<T extends HasId> {
  constructor(
    private attributes: ModalAttribute<T>,
    private events: Event,
    private sync: Sync<T>
  ) {}

  on =this.events.on
  trigger =this.events.trigger
  get =this.attributes.get

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("cannot fetch without an id");
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((res: AxiosResponse): void => {
      this.trigger("save");
    }).catch(()=>{
      this.trigger('error')
    })
  }
}
