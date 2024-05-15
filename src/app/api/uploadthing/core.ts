import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    // Set permissions and file types for this FileRoute
    .middleware(({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file", file);
      console.log("metadata", metadata);
      const { configId } = metadata.input;
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { configId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
