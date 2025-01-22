"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import Link from "next/link";

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID;

export default function Page() {
  const [status, setStatus] = useState<string>("Initializing...");

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({
          liffId: LIFF_ID!,
        });

        if (liff.isLoggedIn()) {
          setStatus("LIFF initialized successfully!");
        } else {
          setStatus("Not logged in.");
          liff.login();
        }
      } catch (err) {
        console.error("LIFF initialization failed", err);
        setStatus("LIFF initialization failed.");
      }
    };

    initLiff();
  }, []);

  return (
    <>
      <div className=" max-w-96 w-full flex text-center flex-col">
        <div className=" py-2 text-4xl bg-blue-700 text-white">
          <h1>TOP PAGE</h1>
        </div>
        <div className="flex text-2xl space-y-4 flex-col text-center mt-4">
          <Link href="/QRCodeGenerator">
            <button className="windows-button">QRCode Generator</button>
          </Link>
          <Link href="/GoogleMap">
            <button className="windows-button">GoogleMap</button>
          </Link>
          <Link href="/GetUserProfile">
            <button className="windows-button">Get User Profile</button>
          </Link>
        </div>
        <div className="mt-16 text-center">
          <p>{status}</p>
        </div>
      </div>
    </>
  );
}
