import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen bg-[#F0F3F7]">
            <div
                className="relative bg-banner-image"
                style={{ minHeight: '650px' }}
            >
                <Header />
                <Hero />
                <div className="container mx-auto my-6">
                    <SearchBar />
                </div>
            </div>
            <div className="px-4 sm:px-6 md:px-12 lg:px-18 xl:px-36 2xl:px-40 py-5 flex-1">
                {children}
            </div>

            <Footer />
        </div>
    )
}

export default Layout
