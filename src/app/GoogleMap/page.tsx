"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import GoogleMapComponent from "@/components/googlemap";

export default function Page() {
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("京都");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null); // 地図URLを保存するためのstate

  useEffect(() => {
    const defaultAddress = "京都";
    setAddress(defaultAddress);
  }, []);

  const fetchAddressFromPostalCode = async () => {
    if (!postalCode) return;

    try {
      const response = await axios.get(
        `https://api.zipaddress.net/?zipcode=${postalCode}`
      );
      if (response.data.code === 200) {
        const { pref, city, fullAddress } = response.data.data;
        setPrefecture(pref);
        setCity(city);
        setAddress(fullAddress);
        setError(null);
      } else {
        setError("住所の取得に失敗しました。");
      }
    } catch (err) {
      console.error(err);
      setError("エラーが発生しました。再度お試しください。");
    }
  };

  return (
    <div className="max-w-96 w-full flex text-center flex-col">
      <div className="py-2 text-4xl bg-blue-700 text-white">
        <h1>Google Map with Pin</h1>
      </div>

      <div>
        <div className="mt-6">郵便番号を入力</div>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="border-2 p-2"
        />
        <button
          onClick={fetchAddressFromPostalCode}
          className="mt-2 p-2 bg-blue-500 text-white"
        >
          住所を取得
        </button>

        {prefecture && city && (
          <div className="mt-6">
            <div>都道府県: {prefecture}</div>
            <div>市区町村: {city}</div>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}

        <div className="mt-4 flex flex-col mx-2">
          <div>番地等の入力</div>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 p-2"
          />
        </div>

        <div className="mt-4">
          <GoogleMapComponent address={address} onMapUrlChange={setMapUrl} />
        </div>

        {mapUrl && (
          <div className="mt-4">
            <div>Google MapのURL:</div>
            <a href={mapUrl} target="_blank" className="text-blue-500">
              {mapUrl}
            </a>
          </div>
        )}
      </div>

      <div className="mt-12 mb-6 w-16 bg-slate-400">
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}
