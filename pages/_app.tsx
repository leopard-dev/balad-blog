import type { AppProps } from "next/app";
import "../src/styles/global.scss";

import Footer from "../src/components/modules/Footer";
import Header from "../src/components/modules/Header";
import SideBar from "../src/components/modules/SideBar";
import PostProvider from "../src/providers/PostProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider initialPosts={pageProps.posts ?? []}>
      <Header />
      <div className="content">
        <main className="page-container">
          <Component {...pageProps} />
        </main>
        <SideBar />
      </div>
      <Footer />
    </PostProvider>
  );
}
export default MyApp;
