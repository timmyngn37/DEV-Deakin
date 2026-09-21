// Content Types
export interface IContent {
    image: string;
    name: string;
    title: string;
    description: string;
    rating: number;
    author: string;
}

// Footer Types
export interface ITextLink {
    kind: 'text'
    label: string
    href?: string
}

export interface IIconLink {
    kind: 'icon'
    label: string
    href: string
    icon: 'facebook' | 'twitter' | 'instagram'
}

export type FooterLink = ITextLink | IIconLink

export interface IFooterColumn {
    title: string
    links: FooterLink[]
}

// Milestone Types
export interface IMilestone {
    commitHash: string;
    term: string;
    title: string;
    description: string;
}

// Project Types
export interface IProject {
    image: string;
    name: string;
    description: string;
    link: string;
}