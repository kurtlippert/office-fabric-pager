import { PaginationModelOptions } from 'ultimate-pagination'

export type TypicalActionType =
  | 'FIRST_PAGE'
  | 'PREVIOUS_PAGE'
  | 'FIRST_ELLIPSIS'
  | 'SECOND_ELLIPSIS'
  | 'NEXT_PAGE'
  | 'LAST_PAGE'

export type SelectedPageActionType =
  | 'SELECTED_PAGE'

export type ActionType = TypicalActionType | SelectedPageActionType

export type TypicalPagePayload = PaginationModelOptions

export interface SelectedPagePayload {
  selectedPageNumber: number
  paginationModelOptions: PaginationModelOptions
}

export interface TypicalAction {
  type: TypicalActionType
  payload: TypicalPagePayload
}

export interface SelectedPageAction {
  type: SelectedPageActionType
  payload: SelectedPagePayload
}

export type Action = TypicalAction | SelectedPageAction

export const firstPage = (payload: TypicalPagePayload): Action => ({
  payload,
  type: 'FIRST_PAGE',
})

export const previousPage = (payload: TypicalPagePayload): Action => ({
  payload,
  type: 'PREVIOUS_PAGE',
})

export const selectedPage = (payload: SelectedPagePayload): Action => ({
  payload,
  type: 'SELECTED_PAGE',
})

export const firstEllipsis = (payload: TypicalPagePayload): Action => ({
  payload,
  type: 'FIRST_ELLIPSIS',
})

export const secondEllipsis = (payload: TypicalPagePayload): Action => ({
  payload,
  type: 'SECOND_ELLIPSIS',
})

export const nextPage = (payload: TypicalPagePayload): Action => ({
  payload,
  type: 'NEXT_PAGE',
})

export const lastPage = (payload: TypicalPagePayload): Action => ({
  payload,
  type: 'LAST_PAGE',
})
