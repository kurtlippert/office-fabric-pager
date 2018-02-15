import { getPaginationModel, PaginationModel, PaginationModelOptions } from 'ultimate-pagination'

export const initialPaginationModel: PaginationModelOptions = {
  currentPage: 5,
  hideFirstAndLastPageLinks: true,
  totalPages: 10,
}

export const initialState: State = getPaginationModel(initialPaginationModel)

export type State = PaginationModel
