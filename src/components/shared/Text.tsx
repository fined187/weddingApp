import React from 'react'

function Text({ children }: { children: string }) {
  const message = children.split('\n').map((str, idx, array) => {
    return (
      <React.Fragment>
        {str}
        {idx === array.length - 1 ? null : <br />}
      </React.Fragment>
    )
  })
  return <div>{message}</div>
}

export default Text
