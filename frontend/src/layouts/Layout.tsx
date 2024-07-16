import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50 bg-white">
                <Header />
            </div>
            <div className="container mx-auto pt-7">
                <SearchBar />
            </div>
            <Hero />

            <div className="container mx-auto py-10 flex-1">{children}</div>
            <Footer />
        </div>
    )
}
export default Layout
