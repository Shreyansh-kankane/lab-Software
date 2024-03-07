// import {withAuth,NextRequestWithAuth} from "next-auth/middleware";
export { default } from 'next-auth/middleware';

export const config = { matcher: ["/", "/dashboard" ,"/dashboard/:path*"]}