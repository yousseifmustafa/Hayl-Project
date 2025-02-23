"use client";

import dynamic from "next/dynamic";
import Catslider from "../Catslider/Catslider";
import DealsBanner from "../DealsBanner/DealsBanner";
import { Categories } from "@/Data/Data";
const DynamicScrollLinked = dynamic(() => import("./ScrollLinked"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <DealsBanner />
      <br />
      <Catslider />
      {Categories.map((category, id) => (
        <DynamicScrollLinked key={id} category={category} />
      ))}
    </div>
  );
}
