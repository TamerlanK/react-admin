import { useState } from "react"
import PhotoAlbum, { Photo } from "react-photo-album"
import Lightbox, { SlideImage } from "yet-another-react-lightbox"
import {
  Fullscreen,
  Slideshow,
  Thumbnails,
  Zoom,
  Counter,
} from "yet-another-react-lightbox/plugins"

interface CustomLightboxProps {
  thumbnailImg: string
  images: string[]
}

const CustomLightbox = ({ thumbnailImg, images }: CustomLightboxProps) => {
  const photos: SlideImage[] = images.reverse().map((image) => ({ src: image }))
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [index, setIndex] = useState(-1)

  return (
    <>
      <img
        onClick={() => setIsLightboxOpen(true)}
        className="w-12 mx-auto object-cover"
        src={thumbnailImg}
      />

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={photos}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Counter]}
        counter={{
          container: {
            style: {
              top: "unset",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
            },
          },
        }}
      />
      <PhotoAlbum
        photos={photos as Photo[]}
        layout="rows"
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />
    </>
  )
}

export default CustomLightbox
