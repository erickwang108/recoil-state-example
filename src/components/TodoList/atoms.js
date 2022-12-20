import { atom, atomFamily } from 'recoil';

export const idsState = atom({
  key: 'ids',
  default: [],
});

export const itemState = atomFamily({
  key: 'item',
  default: { label: '', checked: false },
});
