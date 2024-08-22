import React from "react"
import styled from "styled-components"
import { COLORS, FONTS } from "../constants/constants"
import { useTranslation } from "react-i18next"

interface TextProps {
	family?: string
	weight?: string
	color?: string
	size?: string
	lang?: string
	$sub?: boolean
	className?: string
}

interface IProps {
	trans: string
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
	line-height: 1;
	display: block;

	&.nav-text {
		font-size: ${(props) => props.size ?? "3.5em"};
		font-weight: ${(props) => props.weight ?? "bold"};
		width: fit-content;
		margin-top: 8rem;
	}

	&.nav-text:hover {
		color: ${COLORS.purple};
		cursor: pointer;
	}

	&.text-lg {
		font-size: ${(props) => props.size ?? "1.125rem"};
		font-weight: ${(props) => props.weight ?? "bold"};
		line-height: 1.75rem;
		width: fit-content;
	}
	&.text-md {
		font-size: ${(props) => props.size ?? "1rem"};
		font-weight: ${(props) => props.weight ?? "bold"};
		line-height: 1.5rem;
		width: fit-content;
	}
	&.text-sm {
		font-size: ${(props) => props.size ?? "0.875rem"};
		font-weight: ${(props) => props.weight ?? "bold"};
		line-height: 1.25rem;
		width: fit-content;
	}
	&.text-xs {
		font-size: ${(props) => props.size ?? "0.875rem"};
		font-weight: ${(props) => props.weight ?? "400"};
		line-height: 1.25rem;
		width: fit-content;
	}
	&.text-xxs {
		font-size: ${(props) => props.size ?? "0.75rem"};
		font-weight: ${(props) => props.weight ?? "400"};
		line-height: 1.125rem;
		width: fit-content;
	}

	&.hover-underline-only:hover {
		text-decoration: underline;
	}
	&.pointer {
		cursor: pointer;
	}
	&.button-text {
		font-size: ${(props) => props.size ?? "1rem"};
		font-weight: ${(props) => props.weight ?? "600"};
		line-height: 1.5rem;
	}
`

const TransText: React.FC<IProps> = ({
	trans,
	textProps,
	style,
	onClick,
	$sub,
	className,
}) => {
	const { t, i18n } = useTranslation()
	return (
		<TextDiv
			{...{ ...textProps, lang: i18n.resolvedLanguage, $sub: $sub }}
			style={style}
			onClick={onClick}
			className={className}>
			{t(trans)}
		</TextDiv>
	)
}

export default TransText
