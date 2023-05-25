import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

export default NextAuth(authOptions);


// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth";
// import { authOptions } from "~/server/auth";

// const Auth = (req: NextApiRequest, res: NextApiResponse) => {
//     const authOpts = authOptions({req})

//     const isDefaultSigninPage = req.method === 'GET' && req?.query?.nextauth?.includes('signin')

//     if (isDefaultSigninPage) {
//         authOpts.providers.pop()
//     }

//     return NextAuth(req, res, authOpts)

// }

// export default Auth;