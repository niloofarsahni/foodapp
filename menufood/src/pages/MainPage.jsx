// MainPage.jsx
import { useState } from "react";
import BrandIntro from "../components/BrandIntro";
import CategoryPanel from "../components/CategoryPanel";

export default function MainPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden relative">
      <BrandIntro />
      <CategoryPanel open={open} setOpen={setOpen} />
    </div>
  );
}