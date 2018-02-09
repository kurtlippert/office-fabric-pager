import { render } from 'react-dom'
import { div } from 'react-dom-factories'

render(
    div({}, 'Hello World'),
    document.getElementById('root'),
)
