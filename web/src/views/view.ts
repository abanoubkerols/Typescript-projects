import { Model } from "../models/model";

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regions: { [key: string]: Element } = {};
  eventMap(): { [key: string]: () => void } {
    return {};
  }
  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionMap = this.regionsMap();
    for (let key in regionMap) {
      const selector = regionMap[key];
      const el = fragment.querySelector(selector);
      if (el) {
        this.regions[key] = el;
      }
    }
  }

  bindEventing(fragment: DocumentFragment): void {
    const eventMap = this.eventMap();
    for (let eventKey in eventMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventMap[eventKey]);
      });
    }
  }

  onRender(): void {}
  render(): void {
    this.parent.innerHTML = ''
    const tempEl = document.createElement("template");
    tempEl.innerHTML = this.template();
    this.bindEventing(tempEl.content);
    this.mapRegions(tempEl.content);
    this.onRender();
    this.parent.append(tempEl.content);
  }
}
