
// react
import { createElement as r } from 'react'
import { render } from 'react-dom'

// redux
import { Provider } from 'react-redux'
import { Reducer } from 'redux'

// misc
import { State } from '@main/model'
import update from '@main/update'
import Pager from '@main/view'
import configureStore from '@redux/configureStore'

// const store = createStore(update)
const store = configureStore(update as Reducer<State>)

render(
  r(Provider, { store },
    r(Pager),
  ),
  document.getElementById('root'),
)
