import { Col, Row } from "antd"
import React from "react"
import Text from "./Text"
import { COLORS, FONTS } from "../constants/constants"

export default function FooterContent() {
	return (
		<Col span={22} offset={1}>
			<Row align={"middle"}>
				<Col span={12} style={{ textAlign: "left" }}>
					<Text
						textProps={{
							family: FONTS.enMain,
							color: COLORS.white,
							weight: "800",
						}}>
						Milli Inc.
					</Text>
					<Text
						textProps={{
							family: FONTS.enMain,
							color: COLORS.white,
						}}>
						info@talkiverse.com
					</Text>
				</Col>
				<Col span={8} offset={4} style={{ textAlign: "right" }}>
					<Text
						textProps={{
							family: FONTS.enMain,
							color: COLORS.white,
						}}>
						2023 © Talkiverse
					</Text>
				</Col>
			</Row>
		</Col>
	)
}
