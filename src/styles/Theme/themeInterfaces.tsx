export interface IBreakpoints {
    mobileS: number;
    mobileM: number;
    mobileL: number;
    tablet: number;
    laptop: number;
    laptopL: number;
    desktop: number;
}

export interface ITypography {
    fontSize: string;
    fontWeight: number;
}

export interface ITypographies {
    title: ITypography;
    subtitle: ITypography;
    body: ITypography;
    bodyAccent: ITypography;
    button: ITypography;
}

export interface IColors {
    purple: string;
    text: string;
    white: string;
}

export interface ITheme {
    colors: IColors;
    typography: ITypographies;
    breakpoints: IBreakpoints;
};