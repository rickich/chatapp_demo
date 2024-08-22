import { Col } from "antd"
import React from "react"

interface IProps {
	style?: React.CSSProperties
	children: any
}

const Footer: React.FC<IProps> = ({ style, children }) => {
	return (
		<Col
			xs={{ span: 22, offset: 1 }}
			md={{ span: 20, offset: 2 }}
			style={{ padding: "1.5em 0" }}>
			{children}
		</Col>
	)
}

export default Footer
