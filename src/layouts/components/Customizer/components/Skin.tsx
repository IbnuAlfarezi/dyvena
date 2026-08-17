import auroraImg from '@/assets/images/layouts/skin-aurora.png'

import crystalImg from '@/assets/images/layouts/skin-crystal.png'
import defaultImg from '@/assets/images/layouts/skin-default.png'

import elegantImg from '@/assets/images/layouts/skin-elegant.png'
import flatImg from '@/assets/images/layouts/skin-flat.png'
import galaxyImg from '@/assets/images/layouts/skin-galaxy.png'

import luxeImg from '@/assets/images/layouts/skin-luxe.png'
import materialImg from '@/assets/images/layouts/skin-material.png'
import matrixImg from '@/assets/images/layouts/skin-matrix.png'

import minimalImg from '@/assets/images/layouts/skin-minimal.png'
import modernImg from '@/assets/images/layouts/skin-modern.png'
import monoImg from '@/assets/images/layouts/skin-mono.png'
import neoImg from '@/assets/images/layouts/skin-neo.png'
import neonImg from '@/assets/images/layouts/skin-neon.png'
import novaImg from '@/assets/images/layouts/skin-nova.png'
import orbitImg from '@/assets/images/layouts/skin-orbit.png'
import pixelImg from '@/assets/images/layouts/skin-pixel.png'
import prismImg from '@/assets/images/layouts/skin-prism.png'
import retroImg from '@/assets/images/layouts/skin-retro.png'
import saasImg from '@/assets/images/layouts/skin-saas.png'
import silverImg from '@/assets/images/layouts/skin-silver.png'

import softImg from '@/assets/images/layouts/skin-soft.png'

import vividImg from '@/assets/images/layouts/skin-vivid.png'
import xenonImg from '@/assets/images/layouts/skin-xenon.png'
import zenImg from '@/assets/images/layouts/skin-zen.png'
import { useLayoutContext } from '@/context/useLayoutContext'
import { toTitleCase } from '@/utils/helpers'
import Image from 'next/image'
import type { CustomizationOptionType } from '../index'

const skinOptions: CustomizationOptionType[] = [
  { value: 'default', image: defaultImg },
  { value: 'minimal', image: minimalImg },
  { value: 'modern', image: modernImg },
  { value: 'material', image: materialImg },
  { value: 'saas', image: saasImg },
  { value: 'flat', image: flatImg },
  { value: 'galaxy', image: galaxyImg },
  { value: 'luxe', image: luxeImg },
  { value: 'retro', image: retroImg },
  { value: 'neon', image: neonImg },
  { value: 'pixel', image: pixelImg },
  { value: 'soft', image: softImg },
  { value: 'mono', image: monoImg },
  { value: 'zen', image: zenImg },
  { value: 'silver', image: silverImg },
  { value: 'prism', image: prismImg },
  { value: 'nova', image: novaImg },
  { value: 'elegant', image: elegantImg },
  { value: 'vivid', image: vividImg },
  { value: 'matrix', image: matrixImg },
  { value: 'neo', image: neoImg },
  { value: 'xenon', image: xenonImg },
  { value: 'crystal', image: crystalImg },
  { value: 'aurora', image: auroraImg },
  { value: 'orbit', image: orbitImg },
]

const Skin = () => {
  const { updateSettings, skin } = useLayoutContext()

  const handleSkinChange = (value: string) => {
    updateSettings({ skin: value })
  }

  return (
    <div id="skin" className="p-3 border-bottom border-dashed">
      <h5 className="mb-3 fw-bold">Select Theme</h5>
      <div className="row g-3">
        {skinOptions.map((item) => (
          <div className="col-6" id={`skin-${item.value}`} key={item.value}>
            <div className="form-check card-radio">
              <input className="form-check-input" type="radio" name="data-skin" id={`demo-skin-${item.value}`} checked={skin === item.value} onChange={() => handleSkinChange(item.value)} />
              <label className="form-check-label p-0 w-100" htmlFor={`demo-skin-${item.value}`}>
                <Image src={item.image} alt="layout-img" className="img-fluid" />
              </label>
            </div>
            <h5 className="text-center text-muted mt-2 mb-0">{toTitleCase(item.value)}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skin
