export const user = {
  name: 'user',
  title: 'Bruker',
  type: 'document',
  fields: [
    {
        title: 'Navn',
        name: 'name',
        type: 'string',
    },
    {
      title: 'Ønskeliste',
      name: 'wishlist',
      type: 'array',
      of: [{type: 'string'}]
    }
  ,
  {
    title: 'Favoritter',
    name: 'favorites',
    type: 'array',
    of: [{type: 'string'}]
  },
  {
    name: 'favoriteGenres',
    type: 'array',
    title: 'Favoritt sjanger',
    of: [{ type: 'string', to: { type: 'genre' } }]
  }
  ],
}