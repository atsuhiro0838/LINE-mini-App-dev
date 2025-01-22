"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import QRCode from "@/components/qrcode";
import Link from "next/link";

interface Profile {
  userId: string;
  displayName: string;
  statusMessage?: string;
  pictureUrl?: string;
}

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (liff.isLoggedIn()) {
          const profileData = await liff.getProfile();
          setProfile(profileData);
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className=" max-w-96 w-full flex text-center flex-col">
        <div className=" py-2 text-4xl bg-blue-700 text-white">
          <h1>Get User Profile</h1>
        </div>
        <div className="flex flex-col text-center mt-4">
          {profile ? (
            <>
              <pre className="text-left text-sm break-words w-full">
                {JSON.stringify(profile, null, 2)}{" "}
              </pre>
              <div className="mt-6">
                <p>userId, displayName, statusMessage のQRコード</p>
                <div className="mt-6 p-4 bg-white flex justify-center">
                  <QRCode
                    url={JSON.stringify({
                      userId: profile.userId,
                      displayName: profile.displayName,
                      statusMessage: profile.statusMessage,
                    })}
                  />
                </div>
              </div>
              <div className="mt-6">
                <p>pictureUrl のQRコード</p>
                <div className="mt-6 p-4 bg-white flex justify-center">
                  <QRCode url={profile.pictureUrl || ""} />
                </div>
              </div>
            </>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
        <div className="mt-12 w-16 bg-slate-400">
          <Link href="/">Back</Link>
        </div>
      </div>
    </>
  );
}
