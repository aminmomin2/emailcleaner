// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    me: (_root: any, _args: any, context: any) => {
      // Return the authenticated user from context, or null if not present
      return context.user || null;
    },
  },
}; 