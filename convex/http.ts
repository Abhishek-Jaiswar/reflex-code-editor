import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-web-hook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET env!");
    }

    const svixId = request.headers.get("svix-id");
    const svixSignature = request.headers.get("svix-signature");
    const svixTimestamp = request.headers.get("svix-timestamp");

    if (!svixId || !svixSignature || !svixTimestamp) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const body = await request.text(); // Use raw body for svix verification

    const webhook = new Webhook(webhookSecret);
    let event: WebhookEvent;

    try {
      event = webhook.verify(body, {
        "svix-id": svixId,
        "svix-signature": svixSignature,
        "svix-timestamp": svixTimestamp,
      }) as WebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook: ", error);
      return new Response("Invalid webhook signature", { status: 400 });
    }

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = event.data;

      const email = email_addresses?.[0]?.email_address;
      const name = `${first_name || "Reflex"} ${last_name || "Anonymous"}`;

      if (!email) {
        return new Response("Missing email in webhook payload", { status: 400 });
      }

      try {
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.error("Error syncing user: ", error);
        return new Response("Error syncing user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
