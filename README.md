# use-countdown

## Installation

`npm install --save use-countdown`

## Usage

- `useCountdown`
  ```jsx
  import React from 'react'
  import { useCountdown } from 'use-countdown'

  export const Countdown = () => {
    const ms = useCountdown({
      targetTime: new Date(2100, 08, 12).getTime(),
      interval: 1000, // default
    })

    return (
      <React.Fragment>
        <h1>Countdown</h1>
        <p>{ms}</p>
      </React.Fragment>
    )
  }
  ```
- `useFormattedCountdown`
  ```jsx
  import React from 'react'
  import { useFormattedCountdown } from 'use-countdown'

  export const Countdown = () => {
    const countdown = useFormattedCountdown({
      targetTime: new Date(2100, 08, 12).getTime(),
      interval: 1000,
      includeSymbols: ['d', 'h', 'm'],
      separator: ' - ',
    })
    // will return like: 99d - 10h - 16m

    return (
      <React.Fragment>
        <h1>Formatted Countdown</h1>
        <p>{countdown}</p>
      </React.Fragment>
    )
  }
  ```

## Options

```ts
export interface CountdownOptions {
    readonly targetTime: number;
    readonly interval?: number;
}

export interface FormattedCountdownOptions extends CountdownOptions {
    readonly includeSymbols?: Array<'d' | 'h' | 'm' | 's'>;
    readonly separator?: string;
}
```
