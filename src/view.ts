
// tslint:disable:no-object-literal-type-assertion no-submodule-imports

// react
import { createElement as r } from 'react'
import { div } from 'react-dom-factories'

// redux
import { connect } from 'react-redux'

import { DefaultButton, IIconProps } from 'office-ui-fabric-react'
import { IconNames, initializeIcons } from 'office-ui-fabric-react/lib/Icons'

// misc
import {
  Action,
  firstEllipsis,
  firstPage,
  lastPage,
  nextPage,
  previousPage,
  secondEllipsis,
  selectedPage,
  SelectedPagePayload,
  TypicalPagePayload,
} from '@main/actions'
import { State } from '@main/model'
import { Dispatch } from 'redux'
import { style } from 'typestyle'
import {
  getPaginationModel,
  ITEM_KEYS,
  ITEM_TYPES,
  PaginationModelItem,
  PaginationModelOptions,
} from 'ultimate-pagination'

initializeIcons()

const flexContainer = style({
  display: 'flex',
})

const flexItem = style({
  flex: '1 1 auto',
  minWidth: '1px',
  padding: '0 5px 0 5px',
})

const paginationModelItemToPage =
  (paginationModelItem: PaginationModelItem,
   dispatchTypicalPageAction: DispatchTypicalPageAction,
   dispatchSelectedPageAction: DispatchSelectedPageAction) => {
  switch (paginationModelItem.type) {
    case ITEM_TYPES.FIRST_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.DoubleChevronLeft } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatchTypicalPageAction(firstPage),
        })
      )
    case ITEM_TYPES.PREVIOUS_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.ChevronLeft } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatchTypicalPageAction(previousPage),
        })
      )
    case ITEM_TYPES.NEXT_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.ChevronRight } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatchTypicalPageAction(nextPage),
        })
      )
    case ITEM_TYPES.LAST_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.DoubleChevronRight } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatchTypicalPageAction(lastPage),
        })
      )
    case ITEM_TYPES.PAGE:
      return (
        r(DefaultButton, {
          checked: paginationModelItem.isActive,
          className: `${flexItem} ${style({
            $nest: {
              '&:hover': {
                backgroundColor: paginationModelItem.isActive
                  ? 'rgb(200, 200, 200)'
                  : 'rgb(234, 234, 234)',
                $nest: {
                  '&:active': {
                    backgroundColor: 'rgb(200, 200, 200)',
                  }
                }
              }
            }
          })}`,
          key: paginationModelItem.key,
          onClick: () => dispatchSelectedPageAction(selectedPage, paginationModelItem.value),
        }, paginationModelItem.value)
      )
    case ITEM_TYPES.ELLIPSIS:
      return paginationModelItem.key === ITEM_KEYS.FIRST_ELLIPSIS
        ? r(DefaultButton, {
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatchTypicalPageAction(firstEllipsis),
        }, '...')
        : r(DefaultButton, {
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatchTypicalPageAction(secondEllipsis),
        }, '...')
    default:
      return r(DefaultButton, { className: flexItem, key: paginationModelItem.key }, 'N/A')
  }
}

type SelectedPageAction = (payload: SelectedPagePayload) => Action
type TypicalPageAction = (payload: TypicalPagePayload) => Action

type DispatchSelectedPageAction = (pageAction: SelectedPageAction, selectedPageNumber: number) => Action
type DispatchTypicalPageAction = (pageAction: TypicalPageAction) => Action

interface PagerProps {
  state: State,
  dispatchSelectedPageAction: DispatchSelectedPageAction
  dispatchTypicalPageAction: DispatchTypicalPageAction
}

const Pager: React.SFC<PagerProps> = ({ state, dispatchTypicalPageAction, dispatchSelectedPageAction }) =>
  div({ className: flexContainer },
    state.map((paginationModelItem: PaginationModelItem) =>
      paginationModelItemToPage(paginationModelItem, dispatchTypicalPageAction, dispatchSelectedPageAction)),
  )

const mapDispatchToPagerProps = (dispatch: Dispatch<State>, ownProps: PaginationModelOptions) => ({
  dispatchSelectedPageAction: (pageAction: SelectedPageAction, selectedPageNumber: number) =>
    dispatch(
      pageAction({ paginationModelOptions: ownProps, selectedPageNumber })),
  dispatchTypicalPageAction: (pageAction: TypicalPageAction) =>
    dispatch(
      pageAction(ownProps)),
})

const mapStateToPagerProps = (state: State, ownProps: PaginationModelOptions) => ({
  state: state.length === 0 ? getPaginationModel(ownProps) : state,
})

interface DispatchToProps {
  dispatchSelectedPageAction: DispatchSelectedPageAction,
  dispatchTypicalPageAction: DispatchTypicalPageAction,
}

export default connect<{ state: State }, DispatchToProps, PaginationModelOptions, State>(
  mapStateToPagerProps,
  mapDispatchToPagerProps,
)(Pager as React.SFC<PagerProps>)
