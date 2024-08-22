import React, { ReactNode, useEffect, useState } from "react"
import "./App.css"
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom"
import Home from "./pages/Home"
import Error from "./pages/Error"
import Signin from "./pages/Signin"
import { Col, ConfigProvider } from "antd"
import { COLORS } from "./constants/constants"
import { fbAuth, fireStore } from "./firebase"
import Loading from "./components/Loading"
import Create from "./pages/Create"
import Chat from "./pages/Chat"
import { CometChatUIKit } from "@cometchat/chat-uikit-react"
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared"
import { doc, getDoc } from "firebase/firestore"
interface IProps {
	APP_ID: string
	REGION: string
	AUTH_KEY: string
}

const COMETCHAT_CONSTANTS: IProps = {
	APP_ID: process.env.REACT_APP_COMETCHAT_APP_ID ?? "", //Replace with your App ID
	REGION: "IN", //Replace with your App Region
	AUTH_KEY: process.env.REACT_APP_COMETCHAT_AUTH_KEY ?? "", //Replace with your Auth Key
}

const UIKitSettings = new UIKitSettingsBuilder()
	.setAppId(COMETCHAT_CONSTANTS.APP_ID)
	.setRegion(COMETCHAT_CONSTANTS.REGION)
	.setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
	.build()

type PrivateRouteProps = {
	children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)

	async function initializeCometChat(uid: string) {
		try {
			await CometChatUIKit.init(UIKitSettings)
			const loggedInUser = await CometChatUIKit.getLoggedinUser()

			if (!loggedInUser || loggedInUser.getUid() !== uid) {
				if (loggedInUser) await CometChatUIKit.logout()
				await CometChatUIKit.login(uid)
			}
		} catch (error) {
			console.error("Error during CometChat initialization: ", error) // Replace with a logging library if available.
		}
	}

	useEffect(() => {
		const unsubscribe = fbAuth.onAuthStateChanged(async (user) => {
			if (!user) return navigate("/login")

			try {
				const { uid } = user
				const userDocRef = doc(fireStore, "users", uid)
				const docSnap = await getDoc(userDocRef)

				if (!docSnap.exists()) return navigate("/error")

				const { role, uuid } = docSnap.data()
				if (role !== "admin") return navigate("/error")

				await initializeCometChat(uuid)
			} catch (error) {
				console.error("Error during authentication: ", error) // Replace with a logging library if available.
				navigate("/error")
			} finally {
				setLoading(false)
			}
		})

		return () => unsubscribe()
	}, [navigate])

	if (loading) {
		return (
			<Col span={24} style={{ textAlign: "center", marginTop: "5em" }}>
				<Loading />
			</Col> // Show loading spinner or some other placeholder
		)
	}

	return <>{children}</>
}

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		),
		errorElement: <Error />,
	},
	{
		path: "/error",
		element: <Error />,
	},
	{
		path: "/login",
		element: <Signin />,
	},
	{
		path: "/create",
		element: (
			<PrivateRoute>
				<Create />
			</PrivateRoute>
		),
	},
	{
		path: "/messages",
		element: (
			<PrivateRoute>
				<Chat />
			</PrivateRoute>
		),
	},
])

function App() {
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Input: {
							colorPrimary: COLORS.purple,
							colorBorder: COLORS.gray300,
							controlOutlineWidth: 1,
							borderRadius: 16,
							controlHeight: 40,
							algorithm: true, // Enable algorithm
						},
						DatePicker: {
							colorPrimary: COLORS.purple,
							colorBorder: COLORS.gray300,
							controlOutlineWidth: 1,
							borderRadius: 16,
							controlHeight: 40,
							colorText: COLORS.black,
							algorithm: true,
						},
						Checkbox: {
							colorPrimary: COLORS.purple,
							colorPrimaryHover: COLORS.purple,
							colorBorder: COLORS.gray500,
							borderRadius: 4,
							algorithm: true,
						},
					},
				}}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</>
	)
}

export default App
