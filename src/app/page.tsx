/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

"use client";
import { Input } from "@/components/ui/input";
import { UpdateQrCodeDB } from "@/app/api/actions/actions";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
export default function HomePage() {
  const [qrValue, setQrValue] = useState<string>("https://qrhuzz.com");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (qrRef.current !== null) {
      toPng(qrRef.current, { cacheBust: true })
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = `qrhuzz${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
          UpdateQrCodeDB(qrValue).catch((err) => {
            console.error("Error updating DB", err);
          });
          console.log("QR Code downloaded successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-b from-[#a3f7ac] to-[#008a0f] text-white md:justify-center">
      <div className="mt-10 flex w-3/4 flex-col-reverse items-center justify-center gap-4 md:flex-col lg:w-2/5 lg:gap-12">
        <h1 className="text-6xl font-extrabold tracking-tight text-white md:text-7xl">
          QR Huzz
        </h1>
        <div className="flex w-full flex-row gap-4">
          <Input
            className="onfocus:translate-y-8 placeholder:text-white/80 focus:border-green-950 focus:ring-white"
            placeholder="Enter link..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQrValue(e.target.value)
            }
            type="url"
            name="qrValue"
          />
        </div>
        <div ref={qrRef} className="rounded-md bg-white p-4">
          <QRCode
            onClick={handleDownload}
            style={{ cursor: "pointer" }}
            size={256}
            value={qrValue}
            className="rounded-md"
          />
        </div>
      </div>
    </main>
  );
}
