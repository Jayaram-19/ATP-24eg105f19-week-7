import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router"
import { Toaster } from "react-hot-toast"

function RootLayout() {
  return (
    <div>
      <Toaster position="top-center" />
      <Header/>
      <div className="min-h-screen mx-32">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default RootLayout;