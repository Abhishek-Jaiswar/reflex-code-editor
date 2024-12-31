import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const syncUser = mutation({
    args: {
        userId: v.string(),
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            // Query the database for an existing user
            const existingUser = await ctx.db.query("users")
                .filter(query => query.eq(query.field("userId"), args.userId))
                .first();

            // If the user doesn't exist, insert them into the database
            if (!existingUser) {
                await ctx.db.insert("users", {
                    userId: args.userId,
                    email: args.email,
                    name: args.name,
                    isPro: false, // Default value for 'isPro'
                });
            }

            // Return success response
            return { success: true };
        } catch (error) {
            // Log the error for debugging
            console.error("Error in syncUser mutation:", error);

            // Return error response
            return { success: false, error: error };
        }
    }
});
