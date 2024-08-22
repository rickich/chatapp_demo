import {
	CometChatConversationsWithMessages,
	CometChatMessageHeader,
	CometChatPalette,
	CometChatTheme,
	CometChatThemeContext,
	MessagesConfiguration,
} from "@cometchat/chat-uikit-react"

import React, { useState } from "react"
import { Col, Layout } from "antd"
import Navbar from "../components/Navbar"
import FooterContent from "../components/FooterContent"
import { COLORS, FONTS } from "../constants/constants"

import Header from "../components/Header"
import Footer from "../components/Footer"

import Plus from "../assets/icons/message-plus-square.svg"

const { Content } = Layout

const msgConfig = new MessagesConfiguration({
	disableTyping: true,
})

const Chat: React.FC = () => {
	const theme = new CometChatTheme({
		palette: new CometChatPalette({
			primary: {
				light: COLORS.purple,
				dark: COLORS.purple,
			},
			accent: {
				light: COLORS.black,
				dark: COLORS.black,
			},
		}),
	})
	return (
		<Layout style={{ backgroundColor: COLORS.darkBg }}>
			<Header>
				<Navbar />
			</Header>
			<Content
				style={{ backgroundColor: COLORS.white, minHeight: "85vh" }}>
				<Col span={24}>
					<Col
						span={20}
						offset={2}
						style={{ paddingTop: "3em", paddingBottom: "3em" }}>
						<CometChatThemeContext.Provider
							value={{ theme: theme }}>
							<CometChatConversationsWithMessages
								messageText="here is messgae text"
								startConversationIconURL={`${Plus}`}
								conversationsWithMessagesStyle={{
									height: "85vh",
									border: "none",
									messageTextFont: FONTS.enMain,
								}}
								messagesConfiguration={msgConfig}
							/>

							{/* <MessageListWrapper
								setSomeInterestingOpStarted={
									setInterestingAsyncOpStarted
								}
							/> */}
						</CometChatThemeContext.Provider>
					</Col>
				</Col>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				<FooterContent />
			</Footer>
		</Layout>
	)
}

export default Chat
