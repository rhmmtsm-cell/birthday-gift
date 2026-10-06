// ============================================================
// MEDIA — every path below is a PLACEHOLDER.
// Replace the files inside /public/assets with your real media.
// ============================================================

/** Photos that fly in around the gallery scene (3 left, 5 right). */
export const galleryPhotos: string[] = [
  '/assets/images/polaroid-01.jpeg',
  '/assets/images/polaroid-02.jpeg',
  '/assets/images/polaroid-03.jpeg',
  '/assets/images/polaroid-04.jpeg',
  '/assets/images/polaroid-05.jpeg',
  '/assets/images/polaroid-06.jpeg',
  '/assets/images/polaroid-07.jpeg',
  '/assets/images/polaroid-08.jpeg',
]

/** Available memory-wall photos (8 shown per batch, wall re-flows once). */
export const memoryPhotos: string[] = Array.from({ length: 15 }, (_, i) =>
  `/assets/images/memory-${String(i + 2).padStart(2, '0')}.jpeg`,
)

/** Video played in the "A Moment For You" scene. */
export const momentVideo = '/assets/videos/moment.mp4'
