import { Text } from '@flash-swap/uikit'
import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Overlay({ isShown, text }) {
  if (isShown) {
    return (
      <StyledContainer>
        <Text>{text}</Text>
      </StyledContainer>
    )
  }

  return <></>
}

export default Overlay
