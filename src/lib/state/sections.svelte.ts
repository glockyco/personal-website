export interface Section {
  id: string;
  label: string;
}

let sections = $state<Section[]>([]);

export const sectionNav = {
  get sections() {
    return sections;
  },
  set(s: Section[]) {
    sections = s;
  }
};
