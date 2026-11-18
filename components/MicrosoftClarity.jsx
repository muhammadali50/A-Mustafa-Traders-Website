"use client";

import { useEffect } from "react";

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
const placeholderIds = new Set(["PASTE_YOUR_PROJECT_ID_HERE", "yourProjectId"]);
let initialized = false;

export default function MicrosoftClarity() {
  useEffect(() => {
    if (!projectId || placeholderIds.has(projectId) || initialized) return;

    initialized = true;
    // Loaded on demand so the SDK is not part of the initial bundle (or shipped at all without an id).
    import("@microsoft/clarity").then(({ default: Clarity }) => Clarity.init(projectId));
  }, []);

  return null;
}
