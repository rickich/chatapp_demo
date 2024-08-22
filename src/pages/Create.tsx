import React, { useState } from "react"
import {
	Col,
	Layout,
	Row,
	Input,
	DatePicker,
	Select,
	Button,
	Form,
	InputNumber,
	Divider,
} from "antd"
import Navbar from "../components/Navbar"
import FooterContent from "../components/FooterContent"
import TransText from "../components/TransText"
import { COLORS } from "../constants/constants"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Icon from "@ant-design/icons"
import dayjs from "dayjs"

import { ReactComponent as CalendarIcon } from "../assets/icons/calendar.svg"
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg"
import { ReactComponent as EyeOffIcon } from "../assets/icons/eye-off.svg"
import { styled } from "styled-components"
import UploadAvatar from "../components/UploadAvatar"
import TextArea from "antd/es/input/TextArea"

const { Content } = Layout

const StyledButton = styled(Button)`
	width: 100%;
	background-color: ${COLORS.purple};
	border-radius: 100px;
	text-align: center;
	cursor: pointer;
	height: auto;
	padding-top: 0.7rem;
	padding-bottom: 0.7rem;
`

const Create: React.FC = () => {
	const [formLayout, setformLayout] = useState("talkimate")

	const handleRoleChange = (value: string) => {
		setformLayout(value)
	}

	const onFinish = (values: any) => {
		console.log(values)
	}

	return (
		<Layout
			style={{
				backgroundColor: COLORS.darkBg,
				minHeight: "100vh",
			}}>
			<Header>
				<Navbar />
			</Header>
			<Content style={{ backgroundColor: COLORS.white }}>
				<Col span={24}>
					<Row>
						<Col xs={24} md={{ span: 10, offset: 6 }}>
							<Col
								xs={{ span: 20, offset: 2 }}
								md={{ span: 20, offset: 2 }}
								style={{
									paddingTop: "6rem",
									paddingBottom: "12rem",
								}}>
								<Col xs={24} md={{ span: 14, offset: 5 }}>
									{/* header */}
									<TransText
										className="text-lg"
										trans={"admin-create.heading"}
										style={{
											marginBottom: "5rem",
										}}
									/>
									{/* form start */}
									<Form
										onFinish={onFinish}
										initialValues={{ role: "talkimate" }}>
										<TransText
											className="text-sm"
											trans={"admin-create.type"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item name={"role"}>
											<Select
												style={{ width: 120 }}
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
										</Form.Item>
										<TransText
											className="text-sm"
											trans={"admin-create.img"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<UploadAvatar />
										<TransText
											className="text-sm"
											trans={"signup.email"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item name={"email"}>
											<Input />
										</Form.Item>
										<TransText
											className="text-sm"
											trans={"signup.password"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item name={"password"}>
											<Input.Password
												iconRender={(visible) =>
													visible ? (
														<Icon
															component={() => (
																<EyeOffIcon
																	width={
																		"1rem"
																	}
																	height={
																		"1rem"
																	}
																	stroke={
																		COLORS.gray400
																	}
																/>
															)}
														/>
													) : (
														<Icon
															component={() => (
																<EyeIcon
																	width={
																		"1rem"
																	}
																	height={
																		"1rem"
																	}
																	stroke={
																		COLORS.gray400
																	}
																/>
															)}
														/>
													)
												}
											/>
										</Form.Item>
										<TransText
											className="text-sm"
											trans={"signup.nickname"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item name="nickname">
											<Input />
										</Form.Item>

										<TransText
											className="text-sm"
											trans={"signup.birthday"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item name={"dob"}>
											<DatePicker
												placeholder="YYYY/MM/DD"
												style={{ width: "100%" }}
												defaultValue={dayjs(
													dayjs(),
													"YYYY/MM/DD"
												)}
												format={"YYYY/MM/DD"}
												suffixIcon={
													<Icon
														component={() => (
															<CalendarIcon
																width={"1rem"}
																height={"1rem"}
																stroke={
																	COLORS.gray400
																}
															/>
														)}
													/>
												}
											/>
										</Form.Item>
										{formLayout === "talkimate" && (
											<>
												<TransText
													className="text-sm"
													trans={
														"admin-create.status"
													}
													style={{
														marginTop: "0.75rem",
														marginBottom:
															"0.375rem",
													}}
												/>
												<Form.Item name="status">
													<Input />
												</Form.Item>

												<TransText
													className="text-sm"
													trans={"admin-create.bio"}
													style={{
														marginTop: "0.75rem",
														marginBottom:
															"0.375rem",
													}}
												/>
												<Form.Item name="bio">
													<TextArea
														autoSize={{
															minRows: 3,
															maxRows: 5,
														}}
														maxLength={300}
													/>
												</Form.Item>
												<Divider />
												<TransText
													className="text-sm"
													trans={"admin-create.rate"}
													style={{
														marginTop: "0.75rem",
														marginBottom:
															"0.375rem",
													}}
												/>
												<Form.Item name="rate">
													<InputNumber />
												</Form.Item>
											</>
										)}
										<Form.Item>
											<Col
												span={24}
												style={{ marginTop: "3rem" }}>
												<StyledButton htmlType="submit">
													<TransText
														className="button-text"
														trans={
															"signup.buttonTxt"
														}
														textProps={{
															color: COLORS.white,
														}}
													/>
												</StyledButton>
											</Col>
										</Form.Item>
									</Form>
								</Col>
							</Col>
						</Col>
					</Row>
				</Col>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				<FooterContent />
			</Footer>
		</Layout>
	)
}

export default Create
