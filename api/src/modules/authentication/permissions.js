export const onlyAuthenticated = async (resolve, source, args, context, info) => {
  if (context.request.isAuthenticated) return resolve(source, args, context, info);
  throw new Error('You must login to view this.');
};
