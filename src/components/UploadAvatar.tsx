import React, { useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { message, Upload } from "antd"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile } from "antd/es/upload/interface"
import ImgCrop from "antd-img-crop"
import { fbAuth, fbStorage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!")
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!")
	}
	return isJpgOrPng && isLt2M
}

const UploadAvatar: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>()

	const uploadToFirebase = async (file: RcFile): Promise<void> => {
		let fileType
		if (file.type === "image/jpeg") {
			fileType = ".jpg"
		}
		if (file.type === "image/png") {
			fileType = ".png"
		}
		const storageRef = ref(
			fbStorage,
			"profile_pictures/" + fbAuth.currentUser?.uid + fileType
		)
		const uploadTask = uploadBytesResumable(storageRef, file)
		try {
			await uploadTask
			const downloadURL = await getDownloadURL(storageRef)
			console.log("File uploaded:", downloadURL)
			setImageUrl(downloadURL)
		} catch (e) {
			console.log("Failed to upload file:", e)
			message.error("Upload failed")
		}
	}

	const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
		console.log(info)
		if (info.file.status === "uploading") {
			setLoading(true)
			return
		}

		if (info.file.status === "done") {
			setLoading(false)
			const file: RcFile = info.file.originFileObj as RcFile
			await uploadToFirebase(file)
		}
	}

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)

	return (
		<>
			<ImgCrop rotationSlider cropShape="round">
				<Upload
					name="avatar"
					listType="picture-circle"
					className="avatar-uploader"
					showUploadList={false}
					customRequest={({ file, onSuccess, onError }) => {
						if (file instanceof Blob) {
							// RcFile extends Blob
							uploadToFirebase(file as RcFile)
								.then(() => {
									if (onSuccess) {
										onSuccess(undefined) // Sending an empty object as XMLHttpRequest is not involved here.
									}
								})
								.catch((error) => {
									if (onError) {
										onError(error)
									}
								})
						} else {
							console.error("Unexpected file type")
							if (onError) {
								onError(new Error("Unexpected file type"))
							}
						}
					}}
					beforeUpload={beforeUpload}
					onChange={handleChange}>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt="avatar"
							style={{ width: "100%", borderRadius: "50%" }}
						/>
					) : (
						uploadButton
					)}
				</Upload>
			</ImgCrop>
		</>
	)
}

export default UploadAvatar
