import React from "react"
import { COLORS } from "../constants/constants"

interface IProps {
	children?: string
	to: string
	title?: string
}

const LinkText: React.FC<IProps> = ({ children, to, title }) => {
	return (
		<a
			href={to || "#"}
			target="_blank"
			title={title || ""}
			rel={"noreferrer"}
			style={{ color: COLORS.purple }}>
			{children}
		</a>
	)
}

export default LinkText
