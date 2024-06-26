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
        title: 'Bilde',
        name: 'poster',
        type: 'image',
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
    of: [{type: 'string', to: { type: 'genre'}}]
  },
  {
    name: 'favoriteGenres',
    type: 'array',
    title: 'Favoritt Sjanger', 
    of: [{type: 'string', to: { type: 'genre'}}]
  }
  ],
}