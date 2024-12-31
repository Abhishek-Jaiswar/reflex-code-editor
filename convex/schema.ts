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
        title: v.string(),
        code: v.string(),
        username: v.string(),
        language: v.string(),
    }).index("by_user_id", ["userId"]), //we could find things by using this alias

    snippetComments: defineTable({
        snippetId: v.id("snippets"), //clerkId,
        userId: v.string(),
        username: v.string(),
        content: v.string(), //This will store html contnet maybe for structure
    }).index("by_snippet_id", ["snippetId"]),

    stars: defineTable({
        snippetId: v.id("snippets"), //clerkId,
        userId: v.id("users"), //clerkId,
    })
    .index("by_user_id", ["userId"])
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});

