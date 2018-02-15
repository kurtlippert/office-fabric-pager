export type ActionTypeWithoutPayload =
  | 'FIRST_PAGE'
  | 'PREVIOUS_PAGE'
  | 'FIRST_ELLIPSIS'
  | 'SECOND_ELLIPSIS'
  | 'NEXT_PAGE'
  | 'LAST_PAGE'

export type ActionTypeWithPayload =
  | 'SELECTED_PAGE'

export type ActionType = ActionTypeWithoutPayload | ActionTypeWithPayload

export interface ActionWithoutPayload {
  type: ActionTypeWithoutPayload
}

export interface ActionWithPayload {
  type: ActionTypeWithPayload
  payload: number
}

export type Action = ActionWithoutPayload | ActionWithPayload

export const firstPage = (): Action => ({
  type: 'FIRST_PAGE',
})

export const previousPage = (): Action => ({
  type: 'PREVIOUS_PAGE',
})

export const selectedPage = (payload: number): Action => ({
  payload,
  type: 'SELECTED_PAGE',
})

export const firstEllipsis = (): Action => ({
  type: 'FIRST_ELLIPSIS',
})

export const secondEllipsis = (): Action => ({
  type: 'SECOND_ELLIPSIS',
})

export const nextPage = (): Action => ({
  type: 'NEXT_PAGE',
})

export const lastPage = (): Action => ({
  type: 'LAST_PAGE',
})
