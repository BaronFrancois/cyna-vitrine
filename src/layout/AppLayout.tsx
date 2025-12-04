import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";

export default function AppLayout({children}: {children: React.ReactNode}) {
    <>
        <AppHeader />
        <main>{children}</main>
        <AppFooter />
    </>
}