
export const paths = {
  page403: "/error/403",
  page404: "/error/404",
  page500: "/error/500",
  employee: {
    root: `/employee`,
    details: (id: string) => `/employee/${id}`,
  },
  
};
