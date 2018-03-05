
// react
import { createElement as r } from 'react'
import { render } from 'react-dom'

// redux
import { Provider } from 'react-redux'
import { Reducer } from 'redux'

// misc
import configureStore from '../redux/configureStore'
import { State } from './model'
import update from './update'
import Pager from './view'

const store = configureStore(update as Reducer<State>)

render(
  r(Provider, { store },
    r(Pager, {
      currentPage: 5,
      totalPages: 10,
    }),
  ),
  document.getElementById('root'),
)
