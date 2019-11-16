import React from 'react'
import styled from 'styled-components'

const path = `M49.786 10.0085V6.8L42.8 13.814L49.786 20.8067L56.8001 13.814H53.4423V13.814C53.1223 13.032 51.685 12.6903 51.4207 12.6275L51.3903 12.6201L50.7188 13.2917C48.331 13.2544 47.1371 13.6648 46.4283 14.5602V13.2544C46.5402 13.0305 47.361 12.0978 49.786 12.0605C52.211 12.0232 53.2557 12.9185 53.4423 13.329V11.6501C53.2324 11.4186 53.1099 11.3048 52.8826 11.1278L52.8826 11.1278L52.3603 11.6501C50.5322 10.9786 47.5848 11.0762 46.4282 12.4709V11.2024C46.6521 10.7547 47.8832 10.0085 49.786 10.0085H49.786ZM49.7503 14.1137C47.8833 14.1125 46.6425 14.8291 46.4282 15.3437V16.6122C46.9132 15.9779 47.6967 15.7168 48.4802 15.5302L49.4502 14.5602C50.8401 14.4547 52.8891 14.9025 53.3676 15.7541V15.3064C52.8826 14.5229 51.6173 14.1148 49.7503 14.1137Z`
const path2 = `M93.7703 15.6291C93.7703 6.7878 74.2849 0 49.9423 0C25.5997 0 6.2285 6.84485 6.2285 15.7432V24.9267H4.62852C2.05712 24.9267 0 27.0942 0 29.5469V45.4612C1.96413e-05 47.8569 2.11187 49.9674 4.62852 49.9674H6.2285V81.1685C6.2285 84.5909 8.97133 87.3288 12.5141 87.4429H87.5418C90.9704 87.4429 93.7703 84.705 93.7703 81.1685V49.9674H95.3132C97.9417 49.9674 100.056 47.9139 99.9988 45.2901C99.9417 42.6662 99.9417 32.2848 99.9988 29.661C100.056 27.0371 97.9989 25.0407 95.3132 25.0407H93.7703V15.6291ZM12.5571 21.4041V15.7432C13.1279 13.1849 25.6849 6.22146 49.9423 6.22146C74.1997 6.22146 86.914 13.2838 87.5418 15.6709L87.5 21.4041C87 21.6082 12.5571 21.4041 12.5571 21.4041ZM12.5571 27.8V65.7534H87.5V27.8H12.5571ZM70.4338 75.0859H87.5571V81.3644H70.4338V75.0859ZM29.6804 75.0859H12.5571V81.3644H29.6804V75.0859Z`
const path3 = `M31.0855 93.7428V87.4L12.4 87.4571V93.6856C12.4 97.1713 15.1429 100.028 18.5714 99.7999H24.857C28.3998 100.086 31.0855 97.1713 31.0855 93.7428ZM87.4277 93.7428V87.4571L68.6279 87.4V93.7428C68.6279 97.1142 71.3708 100.028 74.9136 99.7999H81.0849C84.5706 100.086 87.4277 97.2284 87.4277 93.7428Z`

interface TUTBusIconProps {
  size: number
}

function TUTBusIcon({ size }: TUTBusIconProps) {
  return (
    <Icon viewBox="0 0 100 100" width={size} height={size} fill="none">
      <path fillRule={'evenodd'} clipRule={'evenodd'} d={path} />
      <path fillRule={'evenodd'} clipRule={'evenodd'} d={path2} />
      <path fillRule={'evenodd'} clipRule={'evenodd'} d={path3} fillOpacity="0.3" />
      <rect x={12.4} y={27.8} width={75.2} height={38} fillOpacity="0.3" />
    </Icon>
  )
}

export default TUTBusIcon

const Icon = styled.svg`
  stroke: none;
  fill: currentColor;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
`