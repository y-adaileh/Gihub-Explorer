export enum SearchTapLabel {
  Users = 'Users',
  Repositories = 'Repositories',
}

export interface SearchTap {
  label: SearchTapLabel;
  isActive: boolean;
}
