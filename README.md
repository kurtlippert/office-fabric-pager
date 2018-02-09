# react-ts-starter  
`npm start` to run  
  
**Features**  
* `webpack.config` written in ts
* tree-shaking support (all without having to use babel)
* no `JSX` (or `TSX`). All pure ts with `react-dom-factories`
* `tsconfig` uses `paths` to make import paths look nicer
  * webpack > resolve > alias should inform webpack what these mean (not fully tested yet)  
  
**Notes**
* `tsconfig` may have extraneous items (libs for example)
