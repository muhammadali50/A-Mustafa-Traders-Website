"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
const placeholderIds = new Set(["PASTE_YOUR_PROJECT_ID_HERE", "yourProjectId"]);
let initialized = false;

export default function MicrosoftClarity() {
  useEffect(() => {
    if (!projectId || placeholderIds.has(projectId) || initialized) return;

    initialized = true;
    Clarity.init(projectId);
  }, []);

  return null;
}
