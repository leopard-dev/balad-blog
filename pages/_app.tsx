import type { AppProps } from "next/app";
import React from "react";
import Footer from "../src/components/modules/Footer";
import Header from "../src/components/modules/Header";
import SideBar from "../src/components/modules/SideBar";
import "../src/styles/global.scss";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="content">
        <main className="page-container">
          <Component {...pageProps} />
        </main>
        <SideBar />
      </div>
      <Footer />
    </>
  );
}
export default MyApp;
