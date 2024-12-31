import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(), //clerkId,
        email: v.string(),
        name: v.string(),
        isPro: v.boolean(),
        proSinceBuilt: v.optional(v.number()),
        lemonSqueezyCustomerId: v.optional(v.string()),
        lemonSqueezyOrderId: v.optional(v.string())
    }).index("by_user_id", ["userId"]),

    codeExecutions: defineTable({
        userId: v.string(), //clerkId,
        language: v.string(),
        code: v.string(),
        output: v.boolean(),
        error: v.optional(v.number()),
    }).index("by_user_id", ["userId"]),

    snippets: defineTable({
        userId: v.string(), //clerkId,
        email: v.string(),
        name: v.string(),
        isPro: v.boolean(),
        proSinceBuilt: v.optional(v.number()),
        lemonSqueezyCustomerId: v.optional(v.string()),
        lemonSqueezyOrderId: v.optional(v.string())
    }).index("by_user_id", ["userId"]),
});

