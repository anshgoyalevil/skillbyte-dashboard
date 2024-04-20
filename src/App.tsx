import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Home from "./components/Screens/Home";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Fragments/Navbar/Navbar";
import { Footer } from "./components/Fragments/Footer/Footer";
import links from "./components/data/links";
import footerLinks from "./components/data/footerLinks";
import { ContactUs } from "./components/Screens/ContactUs";
import OurProcess from "./components/Screens/OurProcess";
import OurServices from "./components/Screens/OurServices";
import { Login } from "./components/Screens/Login";
import { Register } from "./components/Screens/Register";
import Dashboard from "./components/Screens/Dashboard";
import DashboardHome from "./components/Screens/DashboardHome";
import { Notifications } from "@mantine/notifications";
import { EmptyPage } from "./components/Screens/EmptyPage";
import AddInternship from "./components/Screens/AdminScreens/AddInternship";
import { AddBatch } from "./components/Screens/AdminScreens/AddBatch";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Mulish, sans-serif",
          primaryColor: "yellow",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <Navbar links={links.links} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="our-process" element={<OurProcess />} />
          <Route path="our-services" element={<OurServices />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<EmptyPage />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="home" element={<DashboardHome />} />
            <Route path="addbatch" element={<AddBatch />}></Route>
            <Route path="add-internship" element={<AddInternship />}></Route>
          </Route>
        </Routes>
        {window.location.pathname.toLowerCase().includes("dashboard") ? (
          <></>
        ) : (
          <Footer data={footerLinks.data} />
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
