import React from "react"
import TransText from "./TransText"
import { styled } from "styled-components"
import { COLORS } from "../constants/constants"
import { Col, Row } from "antd"

interface IProps {
	trans: string
	forward: boolean
	emoji?: string[]
}

interface ContainerProps {
	$forward?: boolean
}

const BubbleContainer = styled.div<ContainerProps>`
	width: fit-content;
	max-width: 70%;
`

const Bubble = styled.div<ContainerProps>`
	font-size: 0.9em;
	padding: 0.5625em 0.79em 0.5625em 0.79em;
	border-radius: ${(props) =>
		props.$forward
			? "0.25em 1.25em 1.25em 1.25em"
			: "1.25em 0.25em 1.25em 1.25em"};
	background-color: ${(props) =>
		props.$forward ? COLORS.neonLight : COLORS.purpleLight};

	white-space: normal;
	overflow-wrap: break-word;
`

const Container = styled(Col)<{ $forward?: boolean }>`
	text-align: ${(props) => (props.$forward ? "left" : "right")};
	text-align: ${(props) =>
		props.$forward ? "-webkit-left" : "-webkit-right"};
	text-align: ${(props) => (props.$forward ? "-moz-left" : "-moz-right")};
	text-align: ${(props) => (props.$forward ? "-o-left" : "-o-right")};
	text-align: ${(props) => (props.$forward ? "-ms-left" : "-ms-right")};
	padding: 1.56em 0em 1.56em 0em;
`
const ReactionContainer = styled.div<{ $forward?: boolean }>`
	margin-top: 0.5em;
	text-align: ${(props) => (!props.$forward ? "left" : "right")};
	text-align: ${(props) =>
		!props.$forward ? "-webkit-left" : "-webkit-right"};
	text-align: ${(props) => (!props.$forward ? "-moz-left" : "-moz-right")};
	text-align: ${(props) => (!props.$forward ? "-o-left" : "-o-right")};
	text-align: ${(props) => (!props.$forward ? "-ms-left" : "-ms-right")};
`
const ReactionBg = styled.div<{ $i?: number }>`
	width: fit-content;
	padding: 0.3em 0.65em 0.3em 0.65em;
	border-radius: 1em;
	background-color: #f2f4f7;
	font-size: 0.9em;
	margin-left: ${(props) => props.$i && props.$i % 2 !== 0 && "0.3em"};
	margin-right: ${(props) => props.$i && props.$i % 2 !== 0 && "0.3em"};
`

const MessageBubble: React.FC<IProps> = ({ trans, forward, emoji }) => {
	return (
		<Container span={24} $forward={forward}>
			<BubbleContainer>
				<Bubble $forward={forward}>
					<TransText
						trans={trans}
						$sub
						style={{ textAlign: "left" }}
					/>
				</Bubble>
				<Row justify={forward ? "end" : "start"}>
					{emoji &&
						emoji.map((e, i) => (
							<ReactionContainer
								key={"emoji" + i}
								$forward={forward}>
								<ReactionBg $i={i}>{emoji[i]}</ReactionBg>
							</ReactionContainer>
						))}
				</Row>
			</BubbleContainer>
		</Container>
	)
}

export default MessageBubble
