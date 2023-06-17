"use client";

import { useSignal } from "@preact/signals-react";

let debounce: NodeJS.Timeout;
const DEBOUNCETIME = 500;

export default function Home() {
  const sc = useSignal(0);
  // const qArtist = useSignal("");
  // qArtist.subscribe((artist) => {
  //   if (debounce) {
  //     clearTimeout(debounce);
  //   }
  //   const listener = () => {
  //     console.log("pop ->", artist);
  //   };
  //   debounce = setTimeout(listener, DEBOUNCETIME);
  // });

  return (
    <div className="flex p-24 flex-col grow">
      <div className="relative">
        {/* <input
          type="text"
          value={qArtist.value}
          onChange={(evt) => {
            qArtist.value = evt.currentTarget.value;
          }}
          className="bg-neutral-700 outline-none ring-1 ring-pink-800 p-0.5 selection:bg-pink-600 "
          placeholder="Search Artist"
        /> */}
        <div
          className="absolute -bottom-[5rem] z-10 h-[5rem] bg-neutral-600 w-full overflow-y-scroll"
          hidden
        >
          <p className="hover:bg-neutral-500 select-none">bladee</p>
          <p className="hover:bg-neutral-500 select-none">bladee</p>
          <p className="hover:bg-neutral-500 select-none">bladee</p>
          <p className="hover:bg-neutral-500 select-none">bladee</p>
          <p className="hover:bg-neutral-500 select-none">bladee</p>
        </div>
      </div>
      <button onClick={() => sc.value++}>count s</button>
      <p className="px-1">Signal</p>
      <p>Test - {sc.value}</p>
      <p>Test MultiP - {sc.value * 2}</p>
    </div>
  );
}
