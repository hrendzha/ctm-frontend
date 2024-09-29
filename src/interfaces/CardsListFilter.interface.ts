interface ICardsListFilter {
  searchQuery: string;
  level?: number;
  sort?: string;
}

interface ICardsListFilterAPI extends ICardsListFilter {
  page: number;
  perPage: number;
}

export type { ICardsListFilter, ICardsListFilterAPI };
