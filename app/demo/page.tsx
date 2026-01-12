/**
 * [Demo] MouseTextEffect 데모 페이지 (간단 버전)
 * [URL] http://localhost:3000/demo
 */

import { Metadata } from "next";
import SimpleDemo from "./SimpleDemo";

export const metadata: Metadata = {
  title: "MouseTextEffect Demo",
  description: "Framer Motion MouseTextEffect 컴포넌트 데모",
};

export default function DemoPage() {
  return <SimpleDemo />;
}
