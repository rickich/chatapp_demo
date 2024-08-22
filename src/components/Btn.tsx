import React from "react"
import styled from "styled-components"
import { COLORS } from "../constants/constants"

interface IProps {
	children: any
	style?: React.CSSProperties
	onClick?: any
}

const ButtonContainer = styled.div`
	width: 100%;
	padding-top: 1.3em;
	padding-bottom: 1.3em;
	background-color: ${COLORS.neon};
	border-radius: 100px;
	text-align: center;
	cursor: pointer;
`

const Btn: React.FC<IProps> = ({ children, style, onClick }) => {
	return (
		<ButtonContainer style={style} onClick={onClick}>
			{children}
		</ButtonContainer>
	)
}

export default Btn
