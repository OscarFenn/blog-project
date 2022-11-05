import Nav from './Nav';

export default function Layout({children}){
    return(
        <div className="mx-6 md:mx-w-2x1 md-mx-auto font-lato scroll-smooth">
            <Nav />
            <main>{children}</main>
        </div>
    )
}