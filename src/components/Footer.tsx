import FooterColumn from './FooterColumn'
import type { IFooterColumn } from '../types'

// Data for the three-column section (Explore / Support / Stay connected)
const footerColumns: IFooterColumn[] = [
    {
        title: 'Explore',
        links: [
            { kind: 'text', label: 'Home', href: '/' },
            { kind: 'text', label: 'Questions', href: '/questions' },
            { kind: 'text', label: 'Articles', href: '/articles' },
            { kind: 'text', label: 'Tutorials', href: '/tutorials' },
        ],
    },
    {
        title: 'Support',
        links: [
            { kind: 'text', label: 'FAQs', href: '/faqs' },
            { kind: 'text', label: 'Help', href: '/help' },
            { kind: 'text', label: 'Contact Us', href: '/contact' },
        ],
    },
    {
        title: 'Stay connected',
        links: [
            { kind: 'icon', label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
            { kind: 'icon', label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
            { kind: 'icon', label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
        ],
    },
]

// Personal contact links rendered in the terminal "$ open ..." style
const contactLinks = [
    { label: 'open', text: 'github.com/timmyngn37', href: 'https://github.com/timmyngn37' },
    { label: 'open', text: 'linkedin.com/in/timmyngn', href: 'https://linkedin.com/in/timmyngn' },
    { label: 'mail', text: 'timmynguyen01062006@gmail.com', href: 'mailto:timmynguyen01062006@gmail.com' },
]

function Footer() {
    return (
        <>
            {/* Sign Up bar*/}
            <div id="sign-up" className="signup-bar">
                <form id="signup-form" action="/" method="POST" className="signup-form">
                    <label htmlFor="signup_email">SIGN UP FOR OUR DAILY INSIDER</label>
                    <input id="signup_email" type="email" name="signup_email" placeholder="Enter your email" required className="signup-email" />
                    <button type="submit" className="button-primary">Subscribe</button>
                </form>
                {/* Reserved for success/error message after submitting the form */}
                <p id="signup-message"></p>
            </div>

            {/* Main Footer*/}
            <footer id="contact" className="footer">
                <div className="footer-inner">
                    {/* Left: terminal greeting */}
                    <div className="footer-terminal">
                        <p><span className="accent">root@timmy</span><span>:~#</span>{' '}<span className="command-name">echo</span>{' '}<span>"Thanks for stopping by!"</span>
                        </p>
                        <p className="footer-greeting">Thanks for stopping by!</p>
                    </div>

                    {/* Right: contact links mapped from contactLinks */}
                    <div className="footer-links">
                        {contactLinks.map((link) => (
                            <p key={link.text}>
                                <span className="accent">$</span>{' '}<span className="command-name">{link.label}</span>{' '}
                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                                    {link.text}
                                </a>
                            </p>
                        ))}
                    </div>
                </div>

                {/* Middle row: the three footer columns (Explore / Support / Stay connected) */}
                <div className="footer-columns">
                    {footerColumns.map((column) => (
                        <FooterColumn key={column.title} title={column.title} links={column.links} />
                    ))}
                </div>

                {/* Bottom row: copyright / credit line, separated by a subtle top border */}
                <div className="footer-bottom">
                    <p>
                        <span className="footer-hash">#</span> I love Tailwind CSS! · &copy; 2026 Timmy Nguyen · exit 0
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer