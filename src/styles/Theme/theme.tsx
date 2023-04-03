import { ITheme } from "./themeInterfaces";

const theme: ITheme = {
    "colors": {
        "purple": "#AA96DA",
        "text": "#394148",
        "white": "#FFFFFF"
    },
    "typography": {
        "title": {
            "fontSize": "2.5rem",
            "fontWeight": 700
        },
        "subtitle": {
            "fontSize": "1.5rem",
            "fontWeight": 700
        },
        "body": {
            "fontSize": "1.2rem",
            "fontWeight": 400
        },
        "bodyAccent": {
            "fontSize": "1.2rem",
            "fontWeight": 600
        },
        "button": {
            "fontSize": "1.2rem",
            "fontWeight": 500
        }
    },
    "breakpoints": {
        "mobileS": 320,
        "mobileM": 375,
        "mobileL": 425,
        "tablet": 768,
        "laptop": 1024,
        "laptopL": 1440,
        "desktop": 2560
    }
}

export default theme;