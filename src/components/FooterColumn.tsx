import type { ReactElement } from 'react'
import type { IFooterColumn, IIconLink, FooterLink } from '../types'

type IconProps = { size?: number; className?: string }
const Facebook = ({ size = 16, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.0228 5.65685 21.1284 10.4375 21.8789V14.8906H7.89844V12H10.4375V9.79785C10.4375 7.29004 11.9307 5.9375 14.2158 5.9375C15.2977 5.9375 16.4219 6.13281 16.4219 6.13281V8.59375H15.0586C13.7188 8.59375 13.3125 9.38867 13.3125 10.2031V12H16.2891L15.8203 14.8906H13.3125V21.8789C18.0932 21.1284 22 17.0228 22 12Z" fill="currentColor" />
    </svg>
)

const Twitter = ({ size = 16, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M22 5.92C21.17 6.27 20.28 6.5 19.34 6.59C20.3 6.03 21.02 5.14 21.34 4.09C20.44 4.6 19.45 4.98 18.38 5.22C17.54 4.32 16.28 3.75 14.9 3.75C12.14 3.75 10 5.89 10 8.65C10 9.03 10.04 9.39 10.12 9.74C7.01 9.55 4.26 8.03 2.36 5.6C1.95 6.28 1.73 7.05 1.73 7.88C1.73 9.44 2.58 10.83 3.86 11.62C3.13 11.6 2.44 11.38 1.83 11.02V11.08C1.83 13.34 3.35 15.2 5.38 15.63C4.97 15.75 4.53 15.8 4.07 15.8C3.76 15.8 3.46 15.77 3.17 15.7C3.77 17.53 5.4 18.86 7.34 18.9C5.85 20.12 3.98 20.85 1.92 20.85C1.53 20.85 1.15 20.83 0.77 20.78C2.72 22.08 4.98 22.85 7.4 22.85C14.89 22.85 18.96 16.04 18.96 9.44C18.96 9.24 18.96 9.05 18.95 8.85C19.86 8.22 20.63 7.44 21.25 6.55C20.37 6.94 19.43 7.22 18.44 7.36C19.45 6.81 20.27 6.02 21 5.08L22 5.92Z" fill="currentColor" />
    </svg>
)

const Instagram = ({ size = 16, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M7 2H17C20.3137 2 23 4.68629 23 8V16C23 19.3137 20.3137 22 17 22H7C3.68629 22 1 19.3137 1 16V8C1 4.68629 3.68629 2 7 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15.5C14.4853 15.5 16.5 13.4853 16.5 11C16.5 8.51472 14.4853 6.5 12 6.5C9.51472 6.5 7.5 8.51472 7.5 11C7.5 13.4853 9.51472 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const iconMap: Record<string, (props: IconProps) => ReactElement> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
}

function isIconLink(link: FooterLink): link is IIconLink {
    return link.kind === 'icon'
}

function FooterColumn({ title, links }: Readonly<IFooterColumn>) {
    const hasIcons = links.some(isIconLink)

    return (
        <div>
            <h3 className="footer-column-title">{title}</h3>

            {hasIcons ? (
                <div className="footer-social">
                    {links.map((link) => {
                        const iconLink = link as IIconLink
                        const Icon = iconMap[iconLink.icon]
                        return (
                            <a
                                key={iconLink.label}
                                href={iconLink.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={iconLink.label}
                                className="social-link"
                            >
                                <Icon size={16} />
                            </a>
                        )
                    })}
                </div>
            ) : (
                <ul className="footer-link-list">
                    {links.map((link) => (
                        <li key={link.label}>
                            {link.href ? (
                                <a href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ) : (
                                <span>{link.label}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FooterColumn