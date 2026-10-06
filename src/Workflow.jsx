import { useState, useEffect } from 'react'

const shots = import.meta.glob('./assets/shots/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
const jsons = import.meta.glob('./workflows/*.json', { eager: true, query: '?raw', import: 'default' })

const pick = (files, id, ext) =>
  Object.entries(files)
    .filter(([k]) => new RegExp(`/${id}(-\\d+)?\\.(${ext})$`).test(k))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v)

export default function Workflows({ items }) {
  const [big, setBig] = useState(null)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    if (!big) return
    const onKey = e => e.key === 'Escape' && setBig(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [big])

  if (!items.length) return null

  const download = (id, text, make) => {
    const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = make ? `${id}.blueprint.json` : `${id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  const copy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(''), 2000)
    } catch {}
  }

  return (
    <>
      <h2>{items.length > 1 ? 'The workflows' : 'The workflow'}</h2>
      {items.map(w => {
        const images = pick(shots, w.id, 'png|jpe?g|webp')
        const json = pick(jsons, w.id, 'json')[0]
        const make = w.tool === 'Make'
        return (
          <div className="wf" key={w.id}>
            <h3>{w.name} <span className="badge">{w.tool || 'n8n'}</span></h3>
            {w.note && <p className="wfnote">{w.note}</p>}
            {images.map((src, i) => (
              <button key={src} className="shot-btn" onClick={() => setBig(src)} aria-label={`Enlarge screenshot ${i + 1} of ${w.name}`}>
                <img className="shot" src={src} alt={`${w.name} in ${w.tool || 'n8n'}`} />
              </button>
            ))}
            {json && (
              <>
                <div className="btns jsonbtns">
                  <button className="btn" onClick={() => download(w.id, json, make)}>{make ? 'Download Make blueprint' : 'Download workflow JSON'}</button>
                  {!make && <button className="btn" onClick={() => copy(w.id, json)}>{copied === w.id ? 'Copied' : 'Copy JSON'}</button>}
                </div>
                <p className="note">
                  {make
                    ? 'In Make, create a scenario, open the menu at the bottom and choose Import Blueprint, then connect your own accounts.'
                    : 'Paste the JSON onto an empty n8n canvas, then connect your own credentials.'}
                </p>
              </>
            )}
          </div>
        )
      })}
      {big && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Workflow screenshot" onClick={() => setBig(null)}>
          <button className="lb-close btn main" onClick={() => setBig(null)}>Close</button>
          <img src={big} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
