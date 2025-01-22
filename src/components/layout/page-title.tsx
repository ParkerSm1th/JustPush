"use client";
import { useEffect, useState } from "react";
import { BreadcrumbPage } from "../ui/breadcrumb";

export const PageTitle = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(document.title);
  }, []); // Runs only after the component mounts in the browser

  return <BreadcrumbPage>{title}</BreadcrumbPage>;
};
