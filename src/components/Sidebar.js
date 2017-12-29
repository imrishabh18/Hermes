import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from '../colors'
import * as layers from '../layers'

const OuterContainer = styled.div`
  min-width: 16.66%;
  flex-grow: 1;
  padding: 18px;
  background-color: ${colors.white};
  //border-right: 1px solid ${colors.border};
  box-shadow: ${colors.border} 2px 0 4px 0;
  z-index: ${layers.Sidebar};
`

const Title = styled.h2`
  margin-top: 0;
`

export const Sidebar = ({ className, title, children }) => {
  return (
    <OuterContainer className={className}>
      {title ? <Title>{title}</Title> : null}
      {children}
    </OuterContainer>
  )
}
Sidebar.propTypes = {
  title: PropTypes.string
}
