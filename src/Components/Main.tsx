import React from 'react'
import { dataType } from '../Common/index'

const Main = (props: { showData: Array<dataType> }) => {
  return (
    <div className="container mx-auto">
      {props.showData.map((item: dataType, _key: number) => {
        return (
          <div key={_key}>
            <label style={{ marginRight: '20px' }}>{item.title}</label>
            <label>
              <b>{item.user}</b>
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default Main
