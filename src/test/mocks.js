export const mockAlbums = {
  2: {
    id: 2,
    name: 'Album Name',
    released: '2012',
    band: 5
  },
  3: {
    id: 3,
    name: 'Another Album Name',
    released: '2014',
    band: 6
  }
};

export const mockBands = {
  5: {
    id: 5,
    name: 'Band Name',
    bio: 'Blah',
    formed: '2010'
  },
  6: {
    id: 6,
    name: 'Another Band Name',
    bio: 'Blah Blah Blah',
    formed: '2012'
  }
};

export const mockAlbum = mockAlbums[2];
export const mockBand = mockBands[5];

export const mockState = {
  data: {
    bands: {
      ...mockBands,
      totalNumBands: 10
    },
    albums: {
      ...mockAlbums
    }
  },
  features: {
    home: {
      page: 1,
      loading: false,
      bands: [5]
    },
    band: {
      bandId: 5,
      loading: true,
      albums: [2, 3]
    },
    album: {
      albumId: 3,
      loading: false
    }
  },
  notify: {
    message: ''
  }
};
