"use client";

import { useEffect } from "react";

type ClientLogProps = {
  message: string;
};

export function ClientLog({ message }: ClientLogProps) {
  useEffect(() => {
    console.log(message);
  }, [message]);

  return null;
}
