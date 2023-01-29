import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

export default function ImageComponent({props}) {

  return (
    <Card
    image={props.thumbnailUrl}
    header={props.title}
    meta='Friend'
    description={props.title}
  />
  )
}
