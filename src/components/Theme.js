function Theme ({themes, themeSelected, setThemeSelected}) {
  return (
    <>
      <section className="theme-container">
        <h2 className="theme-title">THEME</h2>
        <div className="theme-content">
          <p>
            {themes.map( ({id}) => {
              return <span key={id}>{id}</span>
            })}
          </p>
          <div className="themes-container">
            {
              themes.map( ({id,name}) => {
                return (
                  <label className={themeSelected === id ? "theme-label is-checked" : 'theme-label' }>
                    <input 
                    type="radio"
                    key={id}
                    id={`theme-${id}`}
                    name={name} 
                    checked={themeSelected === id}
                    onChange={() => {setThemeSelected(id)}}
                    />
                  </label>
                )
              } )
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Theme;
