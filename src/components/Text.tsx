import React from "react"
import styled from "styled-components"
import { COLORS, FONTS } from "../constants/constants"
import { useTranslation } from "react-i18next"

interface TextProps {
	family?: string
	weight?: string
	color?: string
	size?: string
	ellipsis?: boolean
	lang?: string
	$sub?: boolean
	className?: string
}

interface IProps {
	children: string
	$sub?: boolean
	textProps?: TextProps
	style?: React.CSSProperties
	onClick?: any
	className?: string
}

const TextDiv = styled.div<TextProps>`
	color: ${(props) => props.color ?? COLORS.black};
	font-weight: ${(props) => props.weight ?? "normal"};
	font-family: ${(props) => {
		if (props.family) {
			return props.family
		} else {
			if (props.$sub) {
				if (props.lang === "ko") {
					return FONTS.koSub
				}
				if (props.lang === "en") {
					return FONTS.enSub
				}
			} else {
				if (props.lang === "ko") {
					return FONTS.koMain
				}
				if (props.lang === "en") {
					return FONTS.enMain
				}
			}

			return FONTS.enMain
		}
	}};
	font-size: ${(props) => props.size ?? "1em"};
	line-height: 1.3;
	display: block;
	word-break: break-all;

	&.hover-text:hover {
		color: ${COLORS.purple};
		cursor: pointer;
	}
`

const Text: React.FC<IProps> = ({
	children,
	textProps,
	style,
	onClick,
	$sub,
	className,
}) => {
	const { i18n } = useTranslation()
	return (
		<TextDiv
			{...{ ...textProps, lang: i18n.resolvedLanguage, $sub: $sub }}
			style={style}
			onClick={onClick}
			className={className}>
			{children}
		</TextDiv>
	)
}

export default Text
