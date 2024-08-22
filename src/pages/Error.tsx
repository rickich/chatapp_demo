import { Col, Image, Row } from "antd"
import React from "react"
import TransText from "../components/TransText"
import { useRouteError } from "react-router-dom"
import Text from "../components/Text"
import Btn from "../components/Btn"

import heroImg from "../assets/img/hero.png"
import logoImg from "../assets/img/logo_purple.png"

const Error: React.FC = () => {
	const error: any = useRouteError()

	return (
		<Col span={16} offset={4} style={{ marginTop: "10em" }}>
			<Row>
				<Col xs={24} md={12}>
					<Image
						width={150}
						src={logoImg}
						preview={false}
						onClick={(e) => {
							e.preventDefault()
							window.location.replace("/")
						}}
						style={{ cursor: "pointer" }}
					/>
					<TransText
						trans={"error.heading"}
						textProps={{
							size: "4em",
							weight: "800",
							color: "#D9D9D9",
						}}
						style={{ marginTop: "1.5em " }}
					/>
					<TransText
						trans={"error.desc"}
						textProps={{ size: "1.5em", weight: "500" }}
						style={{ marginTop: "1.5em ", marginBottom: "1.5em" }}
					/>
					<Text $sub>{error?.status}</Text>
					<Text style={{ marginTop: "0.5em" }} $sub>
						{error?.statusText}
					</Text>
					<Col xs={{ span: 24 }} md={8} style={{ marginTop: "5em" }}>
						<Btn
							onClick={() => {
								window.location.replace("/")
							}}>
							<TransText
								trans={"error.cta"}
								textProps={{ size: "1em", weight: "500" }}
							/>
						</Btn>
					</Col>
				</Col>
				<Col xs={0} md={12}>
					<Image
						width={"100%"}
						src={heroImg}
						preview={false}
						style={{ opacity: "10%" }}
					/>
				</Col>
			</Row>
		</Col>
	)
}
export default Error
