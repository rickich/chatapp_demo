import React, { useState } from "react"
import { Col,  Layout, Row, Select, Divider, Table } from "antd"
import Navbar from "../components/Navbar"
import FooterContent from "../components/FooterContent"
import TransText from "../components/TransText"
import { COLORS } from "../constants/constants"

import Btn from "../components/Btn"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { ColumnsType } from "antd/es/table"
import { useTranslation } from "react-i18next"

const { Content } = Layout
interface DataType {
	key: string
	email: string
	nickname: string
	dob: Date
	role: string
	avatar: string
}

const data: DataType[] = [
	{
		key: "1",
		email: "kuan@kqc.com",
		nickname: "Kuan",
		dob: new Date("2001-01-24"),
		role: "talkimate",
		avatar: "https://firebasestorage.googleapis.com/v0/b/talkiverse-9059f.appspot.com/o/profile_pictures%2F7XGlQzSKj2ZAklhmdmRok6EJQK92?alt=media&token=f78dc5dc-1614-4d13-9023-29c8c22cd791",
	},
	{
		key: "2",
		email: "kuan@kqc.com",
		nickname: "Kuan",
		dob: new Date("2001-01-24"),
		role: "talkimate",
		avatar: "https://firebasestorage.googleapis.com/v0/b/talkiverse-9059f.appspot.com/o/profile_pictures%2F7XGlQzSKj2ZAklhmdmRok6EJQK92?alt=media&token=f78dc5dc-1614-4d13-9023-29c8c22cd791",
	},
	{
		key: "3",
		email: "kuan@kqc.com",
		nickname: "Kuan",
		dob: new Date("2001-01-24"),
		role: "talkimate",
		avatar: "https://firebasestorage.googleapis.com/v0/b/talkiverse-9059f.appspot.com/o/profile_pictures%2F7XGlQzSKj2ZAklhmdmRok6EJQK92?alt=media&token=f78dc5dc-1614-4d13-9023-29c8c22cd791",
	},
	{
		key: "4",
		email: "kuan@kqc.com",
		nickname: "Kuan",
		dob: new Date("2001-01-24"),
		role: "talkimate",
		avatar: "https://firebasestorage.googleapis.com/v0/b/talkiverse-9059f.appspot.com/o/profile_pictures%2F7XGlQzSKj2ZAklhmdmRok6EJQK92?alt=media&token=f78dc5dc-1614-4d13-9023-29c8c22cd791",
	},
	{
		key: "5",
		email: "kuan@kqc.com",
		nickname: "talkiverse",
		dob: new Date("2001-01-24"),
		role: "channel",
		avatar: "https://firebasestorage.googleapis.com/v0/b/talkiverse-9059f.appspot.com/o/profile_pictures%2F7XGlQzSKj2ZAklhmdmRok6EJQK92?alt=media&token=f78dc5dc-1614-4d13-9023-29c8c22cd791",
	},
]

const Home: React.FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [searchType, setsearchType] = useState("talkimate")

	const columns: ColumnsType<DataType> = [
		{
			dataIndex: "key",
			key: "key",
		},
		{
			title: t("admin-users.profileImg"),
			dataIndex: "avatar",
			key: "avatar",
			width: "3rem",
			render: (t) => (
				<img
					src={t}
					alt="avatar"
					style={{ width: "3rem", borderRadius: "50%" }}
				/>
			),
		},
		{
			title: t("admin-users.nickname"),
			dataIndex: "nickname",
			key: "nickname",
		},
		{
			title: t("admin-users.email"),
			dataIndex: "email",
			key: "email",
		},
		{
			title: t("admin-users.role"),
			dataIndex: "role",
			key: "role",
		},
	]

	const handleRoleChange = (value: string) => {
		setsearchType(value)
	}

	return (
		<Layout style={{ backgroundColor: COLORS.darkBg }}>
			<Header>
				<Navbar />
			</Header>
			<Content style={{ backgroundColor: COLORS.white }}>
				<Col span={24}>
					<Col
						span={20}
						offset={2}
						style={{ paddingTop: "3em", paddingBottom: "3em" }}>
						<Row justify={"space-between"} align={"middle"}>
							<TransText
								className="button-text"
								trans={"admin-users.heading"}
								textProps={{
									size: "2rem",
									color: COLORS.black,
								}}
							/>
							<Col span={5}>
								<Btn
									style={{
										backgroundColor: COLORS.purple,
										borderRadius: "1rem",
									}}
									onClick={() => {
										navigate("/create")
									}}>
									<TransText
										className="button-text"
										trans={"admin.createUser"}
										textProps={{
											color: COLORS.white,
										}}
									/>
								</Btn>
							</Col>
						</Row>
						<div style={{ margin: "3rem" }}></div>
						<Divider />
						<div style={{ margin: "3rem" }}></div>
						<Select
							style={{ width: 120 }}
							value={searchType}
							onChange={handleRoleChange}
							options={[
								{
									value: "talkimate",
									label: "Talkimate",
								},
								{
									value: "user",
									label: "User",
								},
								{
									value: "admin",
									label: "Admin",
									disabled: true,
								},
								{
									value: "channel",
									label: "Channel",
									disabled: true,
								},
							]}
						/>
						<div style={{ margin: "3rem" }}></div>
						<Table columns={columns} dataSource={data} />
					</Col>
				</Col>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				<FooterContent />
			</Footer>
		</Layout>
	)
}

export default Home
