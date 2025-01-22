"use client";
import { useState } from "react";
import QRCode from "@/components/qrcode";
import Link from "next/link";

export default function Page() {
  const [url, setUrl] = useState("https://www.line.me/ja/");
  const [generatedUrl, setGeneratedUrl] = useState(url);

  const GenerateQRCode = () => {
    if (url) {
      setGeneratedUrl(url);
    } else {
      alert("URLを入力してください");
    }
  };

  return (
    <div className=" max-w-96 w-full flex text-center flex-col">
      <div className=" py-2 text-4xl bg-blue-700 text-white">
        <h1>QRcode Generator</h1>
      </div>
      <input
        className="my-4 p-2 border rounded-md"
        type="url"
        placeholder="URLを入力してください"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="p-2 bg-slate-800 text-white rounded-md"
        onClick={GenerateQRCode}
      >
        生成
      </button>

      {generatedUrl && (
        <div className="mt-6 p-4 bg-white flex justify-center">
          <QRCode url={generatedUrl} />
        </div>
      )}
      <div className="mt-12 w-16 bg-slate-400">
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}
