export function StatusMessage({ title, text, tone = 'neutral' }) {
  return (
    <section
      className={`status-message status-message--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  )
}
