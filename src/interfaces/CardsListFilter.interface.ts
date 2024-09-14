interface ICardsListFilter {
  searchQuery: string;
  level?: number;
}

interface ICardsListFilterAPI extends ICardsListFilter {
  page: number;
  perPage: number;
}

export type { ICardsListFilter, ICardsListFilterAPI };
