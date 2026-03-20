import "../styles/footer.css"

export default function ShowFooter() {
    return (
        <footer>
        <div className="footer-divider"></div>
        <div className="footer-inner">
            <p>© 2014-2026 Klook. All rights reserved.</p>
            <div className="footer-social-media">
                <div><a><img src="/footerImage/facebook.webp" /></a></div>
                <div><a><img src="/footerImage/youtube.webp" /></a></div>
                <div><a><img src="/footerImage/instagram.webp" /></a></div>
                <div><a><img src="/footerImage/X.webp" /></a></div>
                <div><a><img src="/footerImage/TikTok.webp" /></a></div>
            </div>
        </div>
    </footer>
    )
}