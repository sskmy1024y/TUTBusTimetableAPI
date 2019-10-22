import { AttentionSpan, Detail } from './StyledComponents'
import { TimetableDataType } from 'modules/Timetable'
import { useMemo } from 'hooks'
import Marquee from '../Marquee'
import React from 'react'

interface MarqueeProps {
  dataType?: TimetableDataType
  marquee?: JSX.Element
}

export function FullMarquee({ dataType, marquee }: MarqueeProps) {
  const marqueeContents = useMemo(
    () => (
      <>
        {dataType === TimetableDataType.BusFinished && <AttentionSpan>本日の運行は終了しました</AttentionSpan>}
        {dataType === TimetableDataType.BusNotFound && (
          <AttentionSpan>検索条件に合うバスが見つかりませんでした</AttentionSpan>
        )}
        {dataType === TimetableDataType.NoBus && <AttentionSpan>本日の運行はありません</AttentionSpan>}
        {!!marquee && marquee}
      </>
    ),
    [dataType, marquee]
  )

  return (
    <Detail xl={12} md={12}>
      <Marquee>{marqueeContents}</Marquee>
    </Detail>
  )
}
