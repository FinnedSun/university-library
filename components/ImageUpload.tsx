"use client"

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import ImageKit from "imagekit";
import {
  IKImage,
  ImageKitProvider,
  IKUpload,
} from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";


const { env: {
  apiEndpoint,
  imagekit: {
    publicKey,
    urlEndpoint
  }
} } = config;


// Fungsi untuk mengautentikasi dengan ImageKit API
const authenticator = async () => {
  try {
    // Kirim request ke endpoint autentikasi
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`)

    // Cek jika response tidak berhasil
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request gagal dengan status ${response.status}: ${errorText}`)
    }

    // Parse response JSON
    const data = await response.json()

    // Ambil data yang diperlukan
    const { signature, expire, token } = data;

    // Kembalikan data autentikasi
    return {
      signature, // Tanda tangan untuk verifikasi
      expire,    // Waktu kadaluarsa token
      token      // Token autentikasi
    };

  } catch (error: any) {
    throw new Error(`Request autentikasi gagal: ${error.message}`)
  }
}



export const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)

  const onError = (error: any) => {
    console.log(error)

    toast({
      title: "File upload failed",
      description: "Something went wrong while uploading the file. Please try again.",
      variant: "destructive"
    })
  }
  const onSuccess = (res: any) => {
    setFile(res)
    onFileChange(res.filePath)

    toast({
      title: "File uploaded successfully",
      description: `${file?.filePath} uploaded successfully!`,
      variant: "default"
    })
  }
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png" />

      <button className="upload-btn" onClick={(e) => {
        e.preventDefault()

        if (ikUploadRef.current) {
          ikUploadRef.current.click()
        }

      }}>

        <Image
          src={"/icons/upload.svg"}
          alt="upload"
          width={20}
          height={20}
          className="object-contain" />

        <p className="text-base text-light-100">Upload an image</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}
