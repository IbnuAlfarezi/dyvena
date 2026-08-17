'use client'
import Icon from '@/components/wrappers/Icon'
import { useMemo, useState } from 'react'
import { Button, CardBody, CardHeader, FormControl } from 'react-bootstrap'
import { RowsPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'

import gallery1 from '@/assets/images/gallery/1.jpg'
import gallery10 from '@/assets/images/gallery/10.jpg'
import gallery11 from '@/assets/images/gallery/11.jpg'
import gallery12 from '@/assets/images/gallery/12.jpg'
import gallery13 from '@/assets/images/gallery/13.jpg'
import gallery14 from '@/assets/images/gallery/14.jpg'
import gallery2 from '@/assets/images/gallery/2.jpg'
import gallery3 from '@/assets/images/gallery/3.jpg'
import gallery4 from '@/assets/images/gallery/4.jpg'
import gallery5 from '@/assets/images/gallery/5.jpg'
import gallery6 from '@/assets/images/gallery/6.jpg'
import gallery7 from '@/assets/images/gallery/7.jpg'
import gallery8 from '@/assets/images/gallery/8.jpg'
import gallery9 from '@/assets/images/gallery/9.jpg'

const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128]

const slides = [
  { asset: gallery1.src, width: 640, height: 427, category: 'machine-learning' },
  { asset: gallery5.src, width: 640, height: 960, category: 'machine-learning' },
  { asset: gallery6.src, width: 640, height: 360, category: 'machine-learning' },
  { asset: gallery11.src, width: 640, height: 427, category: 'machine-learning' },
  { asset: gallery2.src, width: 640, height: 854, category: 'computer-vision' },
  { asset: gallery7.src, width: 640, height: 425, category: 'computer-vision' },
  { asset: gallery12.src, width: 640, height: 359, category: 'computer-vision' },
  { asset: gallery3.src, width: 640, height: 640, category: 'nlp' },
  { asset: gallery8.src, width: 640, height: 800, category: 'nlp' },
  { asset: gallery13.src, width: 640, height: 359, category: 'nlp' },
  { asset: gallery14.src, width: 640, height: 960, category: 'nlp' },
  { asset: gallery4.src, width: 640, height: 480, category: 'robotics' },
  { asset: gallery9.src, width: 640, height: 960, category: 'robotics' },
  { asset: gallery10.src, width: 640, height: 962, category: 'robotics' },
].map(({ asset, width, height, category }) => ({
  src: asset,
  width,
  height,
  srcSet: breakpoints.map((breakpoint) => ({
    src: asset,
    width: breakpoint,
    height: Math.round((height / width) * breakpoint),
  })),
  category,
}))

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredItems = useMemo(() => {
    return selectedCategory === 'All' ? slides : slides.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const [index, setIndex] = useState(-1)
  return (
    <>
      <CardHeader className="flex-wrap justify-content-between w-100 gap-3">
        <div className="flex-grow-1">
          <div className="app-search">
            <FormControl type="search" name="search" placeholder="Search ..." />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-1 filter-buttons">
          <Button size="sm" className={`btn-ghost-primary ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => setSelectedCategory('All')}>
            All
          </Button>
          <Button size="sm" className={`btn-ghost-primary ${selectedCategory === 'machine-learning' ? 'active' : ''}`} onClick={() => setSelectedCategory('machine-learning')}>
            Machine Learning
          </Button>
          <Button size="sm" className={`btn-ghost-primary ${selectedCategory === 'computer-vision' ? 'active' : ''}`} onClick={() => setSelectedCategory('computer-vision')}>
            Computer Vision
          </Button>
          <Button size="sm" className={`btn-ghost-primary ${selectedCategory === 'nlp' ? 'active' : ''}`} onClick={() => setSelectedCategory('nlp')}>
            NLP
          </Button>
          <Button size="sm" className={`btn-ghost-primary ${selectedCategory === 'robotics' ? 'active' : ''}`} onClick={() => setSelectedCategory('robotics')}>
            Robotics
          </Button>
        </div>
      </CardHeader>

      <CardBody>
        <div className="w-100">
          <RowsPhotoAlbum photos={filteredItems} onClick={({ index: current }) => setIndex(current)} />

          <Lightbox index={index} slides={filteredItems} open={index >= 0} close={() => setIndex(-1)} controller={{ closeOnBackdropClick: true }} />
        </div>
      </CardBody>
    </>
  )
}

export default Gallery
