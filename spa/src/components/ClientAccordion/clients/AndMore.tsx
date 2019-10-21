import React from 'react'
import ClientTemplate from '.'

import Icon from 'assets/images/empty_icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ClientAndMore({ eventKey }: { eventKey: string }) {
  return (
    <ClientTemplate
      iconPath={Icon}
      title={'And more...'}
      subTitle={'APIを使って、オリジナルのクライアントを作ってみよう！'}
      eventKey={eventKey}
    >
      <>
        <p>
          この&nbsp;TUT学バスAPI<small>(非公式)</small>
          &nbsp;は、誰でも無料で使えます。APIを使って、オリジナルのクライアントを作ってみてください！
          <br />
          <br />
          なおクライアントを制作・公開していただけた方は、この<b>クライアント一覧</b>に追加させて頂きたいと思います。
          <br />
          下記の連絡先までご連絡ください！
        </p>
        <a href="mailto:c011627332@edu.teu.ac.jp?subject=学バスAPIのクライアント作成について&amp;body=以下、メールの本文を記述してください">
          <FontAwesomeIcon icon="envelope" size="1x" />
          &nbsp;C011627332@edu.teu.ac.jp
        </a>
      </>
    </ClientTemplate>
  )
}
