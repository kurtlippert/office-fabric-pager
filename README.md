# office-fabric-pager
`npm start` to run  
  
**Features**  
* `webpack.config` written in ts
* tree-shaking support (all without having to use babel)
* no `JSX` (or `TSX`). All pure ts with `react-dom-factories`
* `tsconfig` uses `paths` to make import paths look nicer
  * webpack > resolve > alias should inform webpack what these mean (not fully tested yet)  
* pager component (to be used with table or fabric 'DetailsList' component):  
  * see `PaginationModelOptions` documentation for the available options
  * set `initialPaginationModel` in src/model
  
**Notes**
* `tsconfig` may have extraneous items (libs for example)
* `tsconfig.webpack.json` is what webpack will transpile ts into
  1. it receives the es5 code with es6 modules so it can tree-shake...
  2. then it transpiles again to es5 and commonjs modules for the browser
* `tslint` is a tad opinionated and can be modified per liking
