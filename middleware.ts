import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk", "/api/uploadthing"], // Routes accessible to both signed-in and signed-out users
  ignoredRoutes: ["/api/webhook/clerk", "/api/uploadthing"], // Routes ignored by the authentication middleware
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // Matcher for routes or pages
};
