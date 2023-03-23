export interface Theme {
  name: string;
  properties: any;
}

export const orange: Theme = {
  name: "orange",
  properties: {
    "--theme-color": "#EA5933",
    "--cancel-dialog-color-red": "#ED1C24",
    "--cancel-dialog-color-light-red": "#ffc1c13b",
    "--cancel-dialog-color-border": "#eeeeee",
    "--black": "#000000",
    "--text-highlighted-1": "#676767",
    "--text-highlighted-2": "#0400ff",
    "--white": "#ffffff",
    "--table-total-row-bg-color": "#2b2e46",
    "--table-tr-td-border-color": "#A0A0A0",
    "--timeline-bar-bg-color": "#a5a5a5",
    "--dark-gray-text-color": "#676767",
    "--light-blue-text-color": "#4998e2",
    "--icon-theme-color": "#2b5c41",
    "--drawer-container-bg-color": "#FDF7F6",
    "--theme-color-border-light": "#deb887",
    "--login-page-title-color": "#2B5C41",
    "--login-page-subtitle-color": "#EA5933",
    "--stroked-button-bg-color": "#ff6347"
  }
};


export const blue: Theme = {
  name: "blue",
  properties: {
    "--theme-color": "#3E6FB6",
    "--cancel-dialog-color-red": "#ED1C24",
    "--cancel-dialog-color-light-red": "#ffc1c13b",
    "--cancel-dialog-color-border": "#eeeeee",
    "--black": "#000000",
    "--text-highlighted-1": "#676767",
    "--text-highlighted-2": "#0400ff",
    "--white": "#ffffff",
    "--table-total-row-bg-color": "#2b2e46",
    "--table-tr-td-border-color": "#A0A0A0",
    "--timeline-bar-bg-color": "#a5a5a5",
    "--dark-gray-text-color": "#676767",
    "--light-blue-text-color": "#4998e2",
    "--icon-theme-color": "#2b5c41",
    "--drawer-container-bg-color": "#e8eaf6",
    "--theme-color-border-light": "#9fa8da",
    "--login-page-title-color": "#2B5C41",
    "--login-page-subtitle-color": "#3E6FB6",
    "--stroked-button-bg-color": "#4d60c9",
    "--pmr-false-icon-color": "#e7d000"
  }
};

//TODO: replace the variables in dark theme when it will be in action
export const dark: Theme = {
  name: "dark",
  properties: {
    "--mat-background": "#000000",
    "--text-dark": "#fff",

    "--foreground-default": "#5C7D99",
    "--foreground-secondary": "#A3B9CC",
    "--foreground-tertiary": "#F4FAFF",
    "--foreground-quaternary": "#E5E5E5",
    "--foreground-light": "#FFFFFF",

    "--background-default": "#797C80",
    "--background-secondary": "#41474D",
    "--background-tertiary": "#08090A",
    "--background-light": "#41474D",

    "--primary-default": "#5DFDCB",
    "--primary-dark": "#24B286",
    "--primary-light": "#B2FFE7",

    "--error-default": "#EF3E36",
    "--error-dark": "#800600",
    "--error-light": "#FFCECC",

    "--background-tertiary-shadow": "0 1px 3px 0 rgba(8, 9, 10, 0.5)"
  }
};
