export const films = {
    name: 'films',
    title: 'Filmer',
    type: 'document',
    fields: [
     {
        title: 'Tittel',
        name: 'title',
        type: 'string',
    },
    {
        title: 'Sjanger',
        name: 'genre',
        type: 'string',
    },
    {
        title: 'Bilde',
        name: 'poster',
        type: 'image',
    },
    {
        title: 'IMDB-ID',
        name: 'imdbid',
        type: 'string',
    },
    
  ],
}