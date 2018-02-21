import { Action } from '@main/actions'
import { State } from '@main/model'
import { getPaginationModel, ITEM_KEYS } from 'ultimate-pagination'
// tslint:disable-next-line:no-submodule-imports
import { ItemKeys } from 'ultimate-pagination/lib/ultimate-pagination-constants'

const getActivePage = (state: State) => {
  const { value = -1 } = state.find((page) => page.isActive) || {}
  // tslint:disable-next-line:no-console
  if (value === -1) { console.error('could not find active page in pagination model') }
  return value
}

const getPreviousPage = (state: State) => {
  const activePage = getActivePage(state)
  const previousPage = activePage - 1
  return previousPage < 1 ? activePage : previousPage
}

const getNextPage = (state: State, lastPage: number) => {
  const activePage = getActivePage(state)
  const nextPage = activePage + 1
  return nextPage > lastPage ? activePage : nextPage
}

const getPageWithKey = (state: State, key: ItemKeys | number) => {
  const { value = -1 } = state.find((page) => page.key === key) || {}
  // tslint:disable-next-line:no-console
  if (value === -1) { console.error(`could not find ${key} page in pagination model`) }
  return value
}

const pages = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FIRST_PAGE':
      return getPaginationModel({
        ...action.payload,
        currentPage: 1,
      })
    case 'PREVIOUS_PAGE':
      return getPaginationModel({
        ...action.payload,
        currentPage: getPreviousPage(state),
      })
    case 'SELECTED_PAGE':
      return getPaginationModel({
        ...action.payload.paginationModelOptions,
        currentPage: action.payload.selectedPageNumber,
      })
    case 'FIRST_ELLIPSIS':
      return getPaginationModel({
        ...action.payload,
        currentPage: getPageWithKey(state, ITEM_KEYS.FIRST_ELLIPSIS),
      })
    case 'SECOND_ELLIPSIS':
      return getPaginationModel({
        ...action.payload,
        currentPage: getPageWithKey(state, ITEM_KEYS.SECOND_ELLIPSIS),
      })
    case 'NEXT_PAGE':
      return getPaginationModel({
        ...action.payload,
        currentPage: getNextPage(state, action.payload.totalPages),
      })
    case 'LAST_PAGE':
      return getPaginationModel({
        ...action.payload,
        currentPage: action.payload.totalPages,
      })
    default:
      return state
  }
}

export default pages
