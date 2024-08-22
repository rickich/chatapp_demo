import React from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { COLORS } from "../constants/constants"
const antIcon = (
	<LoadingOutlined style={{ fontSize: 24, color: COLORS.purple }} spin />
)

const Loading = () => {
	return <Spin indicator={antIcon} />
}

export default Loading
