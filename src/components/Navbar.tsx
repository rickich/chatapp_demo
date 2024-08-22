import { Col, Drawer, Image, Row } from "antd"
import styled from "styled-components"
import React, { useState } from "react"
import logoImg from "../assets/img/logo.png"
import menuIcon from "../assets/img/menuIcon.png"
import { ReactComponent as TranslateIcon } from "../assets/icons/translate-01.svg"
import logoPurple from "../assets/img/logo_purple.png"
import closeIcon from "../assets/img/closeIcon.png"
import TransText from "./TransText"
import Text from "./Text"
import { useTranslation } from "react-i18next"
import { COLORS } from "../constants/constants"
import Icon from "@ant-design/icons"
import { fbAuth } from "../firebase"
import { useNavigate } from "react-router-dom"

interface ILangProps {
	label: string
	key: string
	lang: string
}

const Container = styled.div`
	position: sticky;
	top: 0;
	zindex: 1;
	width: 100%;
	display: flex;
	alignitems: center;
	backgroundcolor: transparent;
`

const langItems: ILangProps[] = [
	{
		label: "English",
		key: "en",
		lang: "en",
	},
	{
		label: "한국어",
		key: "ko",
		lang: "ko",
	},
]

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const loggedIn = fbAuth.currentUser ? true : false
	const { i18n } = useTranslation()
	const navigate = useNavigate()
	const [currentLang, setcurrentLang] = useState(i18n.resolvedLanguage)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const handleLangChange = (lang: string) => {
		i18n.changeLanguage(lang).then(() => {
			const index = langItems.findIndex(
				(item) => item.lang === i18n.resolvedLanguage
			)
			setcurrentLang(langItems[index]["lang"])
		})
	}

	return (
		<Container>
			<Col span={24}>
				<Row justify={"space-between"} align={"middle"}>
					<Col xs={{ span: 4 }} md={{ span: 2 }}>
						<Image
							width={"100%"}
							src={logoImg}
							preview={false}
							onClick={() => {
								window.location.assign("/")
							}}
							style={{ cursor: "pointer" }}
						/>
					</Col>
					<Col span={6} offset={10} style={{ textAlign: "right" }}>
						<Image
							width={32}
							src={menuIcon}
							preview={false}
							style={{ cursor: "pointer" }}
							onClick={showDrawer}
						/>
					</Col>
				</Row>
			</Col>
			<Drawer
				title="Basic Drawer"
				placement="right"
				width={"100%"}
				onClose={onClose}
				open={open}
				headerStyle={{
					display: "none",
				}}>
				<Col span={20} offset={2}>
					<Row justify={"space-between"} style={{ marginTop: "2em" }}>
						<Image
							width={150}
							src={logoPurple}
							preview={false}
							style={{ cursor: "pointer" }}
							onClick={() => {
								window.location.assign("/")
							}}
						/>
						<Image
							width={32}
							src={closeIcon}
							preview={false}
							style={{ cursor: "pointer" }}
							onClick={onClose}
						/>
					</Row>
					{!loggedIn ? (
						<TransText
							className="nav-text"
							trans={"navigation.signin"}
							onClick={() => {
								window.location.assign("/login")
							}}
						/>
					) : (
						<>
							<TransText
								className="nav-text"
								trans={"navigation.users"}
								onClick={() => {
									navigate("/")
								}}
							/>
							<TransText
								className="nav-text"
								trans={"navigation.messages"}
								onClick={() => {
									navigate("/messages")
								}}
							/>
							{/* <TransText
								className="nav-text"
								trans={"navigation.tools"}
								onClick={() => {
									navigate("/tools")
								}}
							/> */}
							<TransText
								className="nav-text"
								trans={"navigation.signout"}
								onClick={() => {
									fbAuth.signOut()
								}}
							/>
						</>
					)}
					{/* <TransText
						className="nav-text"
						trans={"navigation.channel"}
						onClick={() => {
							window.location.assign("/channel")
						}}
					/> */}
					<Row
						align={"bottom"}
						style={{ marginTop: "8rem", marginBottom: "8rem" }}>
						<Icon
							component={() => (
								<TranslateIcon
									width={"1.2rem"}
									height={"1.2rem"}
									stroke={COLORS.gray400}
								/>
							)}
						/>
						{langItems.map((item, i) => (
							<Col key={i}>
								<Text
									className="hover-text"
									textProps={{
										size: "1.2em",
										color:
											currentLang === item.lang
												? COLORS.purple
												: COLORS.black,
										weight: "700",
									}}
									style={{
										cursor: "pointer",
										marginLeft: "1rem",
										width: "fit-content",
									}}
									onClick={(e: any) => {
										e.preventDefault()
										handleLangChange(item.lang)
									}}>
									{item.label}
								</Text>
							</Col>
						))}
					</Row>
				</Col>
			</Drawer>
		</Container>
	)
}
