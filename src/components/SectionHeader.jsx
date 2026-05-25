export function SectionHeader({ title, headingId, meta, note, action }) {
  return (
    <div className="section-heading">
      <div>
        <h2 id={headingId}>{title}</h2>
        {note && <p className="section-note">{note}</p>}
      </div>

      <div className="section-heading-side">
        {meta && <span>{meta}</span>}
        {action}
      </div>
    </div>
  )
}
