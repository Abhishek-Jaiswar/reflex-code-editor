import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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


export const getUser = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    if (!args.userId) {
      return null; // Return early if userId is not provided
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) return null;

    return user;
  },
});
