import type { AppProps } from "next/app";
import "../src/styles/global.scss";

import Footer from "../src/components/modules/Footer";
import Header from "../src/components/modules/Header";
import Sidebar from "../src/components/modules/Sidebar";
import PostProvider from "../src/providers/PostProvider";
import SearchHistoryProvider from "../src/providers/SearchHistoryProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider initialPosts={pageProps.posts}>
      <SearchHistoryProvider>
        <Header />
        <div className="content">
          <main className="page-container">
            <Component {...pageProps} />
          </main>
          <Sidebar />
        </div>
        <Footer />
      </SearchHistoryProvider>
    </PostProvider>
  );
}
export default MyApp;
