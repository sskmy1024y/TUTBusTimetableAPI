# Bus Timetable Site

## run

```bash
$ docker-compose build front
$ docker-compose up front
```

## yarn commands

### `yarn start`

This command is starting develop.
Default port is `:3000`

### `yarn storybook`

This product is support storybook.
Default port is `:9009` or `:3001`

## Develop Notes

### 2019/11/08

#### Update Typescript version 3.7.3

Usable `Nullish Coalescing Operator` and `Optional Chaining`.
However, Still not support `create-react-app` (-In babel and eslint).
As a temporary response, install `customize-cra` `react-app-rewired` to overwride webpack configs.

```ts:Sample Code
interface HogeProps {
  hoge?: number
  fuga?: {
    hogefuga: number
  }
}

const hoge: HogeProps = {
  hoge: 100,
  fuga: {
    hogefuga: 1000,
  },
}
const fuga: HogeProps = {
  hoge: 100,
}

console.log(hoge?.fuga?.hogefuga ?? 'none')
console.log(fuga?.fuga?.hogefuga ?? 'none')

---
> {hogefuga: 1000}
> none
```
