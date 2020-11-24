export const onlyAuthenticatedWrapper = (resolvers) => {
    Object.keys(resolvers).forEach(key => {
        resolvers[key] = resolvers[key].wrapResolve(next => async response => {
            if(!response.context.req.isAuthenticated) {
                throw new Error('You must login to view this.');
            }
            return next(response)
        })
    })
    return resolvers
}

export const onlyAuthenticated = async (resolve, source, args, context, info) => {
  if (context.req.isAuthenticated) {
     return resolve(source, args, context, info);
  }
  throw new Error('You must be authorized');
}
