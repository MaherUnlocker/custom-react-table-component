# Custom react-table-component / Storybook User Guide

`react-table-component` is based on <code>React-Table v7</code>: collection of hooks for **building powerful tables and datagrid experiences**. These hooks are lightweight, composable, and ultra-extensible, but **do not render any markup or styles for you**. This effectively means that React Table is a "headless" UI library.

<a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/30791819/147334536-5de8ed47-4719-4563-b537-f468cfef3fdf.PNG"><img src="https://user-images.githubusercontent.com/30791819/147334536-5de8ed47-4719-4563-b537-f468cfef3fdf.PNG" alt="sample" style="max-width: 100%;"></a>



## greets to 

> https://github.com/atefBB

> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)

## Installation

You can install React Table with [NPM](https://npmjs.com),
[Yarn](https://yarnpkg.com), or a good ol' `<script>` via
[unpkg.com](https://unpkg.com).

```sh
npm install @maherunlocker/custom-react-table-component
 --save
```

or

```sh
yarn add @maherunlocker/custom-react-table-component

```

This package is compatible with React v16.8+ and works with ReactDOM.

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### How to use
import `Dynamictable` from @maherunlocker/react-table-component

```jsx
<DynamicTable
    //put your backend api url
    url={apiUrl}
    //optionnal props
    actionColumn={<div>put your component</div>}
    canGroupBy
    canSort
    canResize
    canSelect
    canExpand
    ShowGlobalFilter
    ShowFilterbyColomn
    ShowHideColomnIcon
  />
```

### Example for data with expend
```js
{
  "id": 1,
  "name": "Maher",
  "lastName": "unlocker",
  "age": 15,
  "subRows": [
    {
      "id": 2,
      "name": "Maher",
      "lastName": "unlocker",
      "age": 15,
      "subRows": []
    },
    {
      "id": 3,
      "name": "Maher",
      "lastName": "unlocker",
      "age": 15,
      "subRows": []
    }
  ]
},
{
  "id": 4,
  "name": "Maher",
  "lastName": "unlocker",
  "age": 15,
  "subRows": []
}
```

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.


## This example uses:


  * `useGroupBy` to enable header groups
  * `useFilters` for per-column filters.  Note that filters are displayed in a separate filter dropdown rather than being embedded in each column header.
  * `useSortBy` for column sorting
  * `useExpanded` to allow expansion of grouped columns
  * `useFlexLayout` for a scalable full width table
  * `usePagination` for pagination
  * `useResizeColumns` for resizable columns
  * `useRowSelect` for row selection
