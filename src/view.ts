
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
  firstEllipsis,
  firstPage,
  lastPage,
  nextPage,
  previousPage,
  secondEllipsis,
  selectedPage,
} from '@main/actions'
import { State } from '@main/model'
import { Dispatch } from 'redux'
import { style } from 'typestyle'
import {
  ITEM_KEYS,
  ITEM_TYPES,
  PaginationModelItem,
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

const paginationModelItemToPage = (paginationModelItem: PaginationModelItem, dispatch: Dispatch<State>) => {
  switch (paginationModelItem.type) {
    case ITEM_TYPES.FIRST_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.DoubleChevronLeft } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(firstPage()),
        })
      )
    case ITEM_TYPES.PREVIOUS_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.ChevronLeft } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(previousPage()),
        })
      )
    case ITEM_TYPES.NEXT_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.ChevronRight } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(nextPage()),
        })
      )
    case ITEM_TYPES.LAST_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.DoubleChevronRight } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(lastPage()),
        })
      )
    case ITEM_TYPES.PAGE:
      return (
        r(DefaultButton, {
          checked: paginationModelItem.isActive,
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatch(selectedPage(paginationModelItem.value)),
        }, paginationModelItem.value)
      )
    case ITEM_TYPES.ELLIPSIS:
      return paginationModelItem.key === ITEM_KEYS.FIRST_ELLIPSIS
        ? r(DefaultButton, {
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatch(firstEllipsis()),
        }, '...')
        : r(DefaultButton, {
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatch(secondEllipsis()),
        }, '...')
    default:
      return r(DefaultButton, { className: flexItem, key: paginationModelItem.key }, 'N/A')
  }
}

interface PagerProps {
  state: State,
  dispatch: Dispatch<State>,
}

const Pager: React.SFC<PagerProps> = ({ state, dispatch }) =>
  div({ className: flexContainer },
    state.map((paginationModelItem: PaginationModelItem) =>
      paginationModelItemToPage(paginationModelItem, dispatch)),
  )

const mapDispatchToPagerProps = (dispatch: Dispatch<State>) => ({ dispatch })

const mapStateToPagerProps = (state: State) => ({ state })

export default connect<{ state: State }, { dispatch: Dispatch<State> }, void, State>(
  mapStateToPagerProps,
  mapDispatchToPagerProps,
)(Pager as React.SFC<PagerProps>)
