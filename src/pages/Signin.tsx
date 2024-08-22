import React, { useState } from "react"
import { Col, Layout, Row, Input, Form } from "antd"
import Navbar from "../components/Navbar"
import FooterContent from "../components/FooterContent"
import TransText from "../components/TransText"
import { COLORS } from "../constants/constants"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Icon from "@ant-design/icons"

import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg"
import { ReactComponent as EyeOffIcon } from "../assets/icons/eye-off.svg"
import Btn from "../components/Btn"
import { fbAuth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { handleFirebaseAuthError } from "../util/AuthErrors"
import Text from "../components/Text"

const { Content } = Layout

type FieldType = {
	email?: string
	password?: string
}

const Signin: React.FC = () => {
	const [form] = Form.useForm()
	const [errorMsg, seterrorMsg] = useState("")
	const handleSubmit = (e: any) => {
		e.preventDefault()
		// Perform validation or any other logic you need
		form.submit() // Submit the form programmatically
	}

	const navigate = useNavigate()

	const onFinish = (values: any) => {
		signInWithEmailAndPassword(fbAuth, values.email, values.password)
			.then((userCredential) => {
				// Signed in
				navigate("/")
			})
			.catch((error) => {
				const errorMessage = handleFirebaseAuthError(error)
				seterrorMsg(errorMessage)
			})
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
								<Form
									form={form}
									name="loginform"
									onFinish={onFinish}
									autoComplete="off">
									<Col xs={24} md={{ span: 14, offset: 5 }}>
										<TransText
											className="text-lg"
											trans={"signin.heading"}
										/>
										<TransText
											className="text-sm"
											trans={"signin.email"}
											style={{
												marginTop: "5rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item<FieldType>
											name="email"
											rules={[
												{
													required: true,
													message:
														"Please input your email!",
												},
											]}>
											<Input />
										</Form.Item>
										<TransText
											className="text-sm"
											trans={"signin.password"}
											style={{
												marginTop: "0.75rem",
												marginBottom: "0.375rem",
											}}
										/>
										<Form.Item<FieldType>
											name="password"
											rules={[
												{
													required: true,
													message:
														"Please input your password!",
												},
											]}>
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
										<Col
											span={24}
											style={{ marginTop: "0.75rem" }}>
											<Row justify={"center"}>
												<TransText
													className="text-xxs"
													trans={"signin.forgot"}
												/>
												<TransText
													className="pointer text-xxs hover-underline-only "
													trans={
														"signin.forgotAction"
													}
													textProps={{
														weight: "600",
													}}
													style={{
														marginLeft: ".5rem",
														color: COLORS.purple,
													}}
												/>
											</Row>
										</Col>
										<Col
											span={24}
											style={{ marginTop: "5rem" }}>
											<Text
												textProps={{
													color: COLORS.red,
												}}>
												{errorMsg}
											</Text>
											<Btn
												style={{
													backgroundColor:
														COLORS.purple,
													borderRadius: "1rem",
												}}
												onClick={handleSubmit}>
												<TransText
													className="button-text"
													trans={"signin.buttonTxt"}
													textProps={{
														color: COLORS.white,
													}}
												/>
											</Btn>
										</Col>
									</Col>
								</Form>
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

export default Signin
