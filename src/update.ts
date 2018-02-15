import { Action } from '@main/actions'
import { initialPaginationModel, initialState, State } from '@main/model'
import { getPaginationModel, ITEM_KEYS } from 'ultimate-pagination'
// tslint:disable-next-line:no-submodule-imports
import { ItemKeys } from 'ultimate-pagination/lib/ultimate-pagination-constants'

const getActivePage = (state: State) => {
  const { value = -1 } = state.find((page) => page.isActive) || {}
  // tslint:disable-next-line:no-console
  if (value === -1) { console.error('could not find active page in pagination model') }
  return value
}

const getPageWithKey = (state: State, key: ItemKeys | number) => {
  const { value = -1 } = state.find((page) => page.key === key) || {}
  // tslint:disable-next-line:no-console
  if (value === -1) { console.error(`could not find ${key} page in pagination model`) }
  return value
}

const pages = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FIRST_PAGE':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: 1,
      })
    case 'PREVIOUS_PAGE':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: getActivePage(state) - 1,
      })
    case 'SELECTED_PAGE':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: action.payload,
      })
    case 'FIRST_ELLIPSIS':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: getPageWithKey(state, ITEM_KEYS.FIRST_ELLIPSIS),
      })
    case 'SECOND_ELLIPSIS':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: getPageWithKey(state, ITEM_KEYS.SECOND_ELLIPSIS),
      })
    case 'NEXT_PAGE':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: getActivePage(state) + 1,
      })
    case 'LAST_PAGE':
      return getPaginationModel({
        ...initialPaginationModel,
        currentPage: initialPaginationModel.totalPages,
      })
    default:
      return state
  }
}

export default pages
