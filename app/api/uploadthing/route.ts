import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
interface RouteHandlerConfig {
  router: typeof ourFileRouter;
  onError: (error: Error) => void;
  // config?: { [key: string]: any };
}

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  onError: (error: Error) => {
    console.error("Error in route handler:", error);
  },
  // Apply an (optional) custom config:
  // config: { ... },
} as RouteHandlerConfig);