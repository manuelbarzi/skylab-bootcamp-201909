function CharacterDetail({ item: { char_id, name, birthday, occupation, img, status, nickname, portrayed, isFav }, onBackCharacters, onBack, onFav }) {
   return <><button className="register__goback" onClick={event => { // cambiar class
      event.preventDefault()
      onBackCharacters()
   }}>Go back to Characters</button>
      <button className="register__goback" href="" onClick={event => {
         event.preventDefault()
         onBack()
      }}>Go back to Search</button>
      <article className="character-detail">
         <h3 className="character-detail__title">{name}</h3>
         <h4 className="character-detail__nickname">{nickname}</h4>
         <img className="character-detail__image" src={img} alt="character detail image" />
         <h4 className="character-detail__birthday-title">Birthday:</h4>
         <span className="character-detail__birthday-text">{birthday}</span>
         <h4 className="character-detail__status-title">Status:</h4>
         <span className="character-detail__status-text">{status}</span>
         <h4 className="character-detail__ocupation-title">Ocupation:</h4>
         <ul className="character-detail__ocupation-list">
            {occupation.map((element) => <li key={element} className="character-detail__occupation-item" >{element}</li>)}
         </ul>
         <h4 className="character-detail__portayed-title">Portayed by:</h4>
         <span className="character-detail__portrayed-text">{portrayed}</span>
         <div className="break"></div>
         <span className="character-detail__fav" onClick={event => {
            event.preventDefault()
            event.stopPropagation()

            //Skyker easter egg
            if (char_id == '3' && isFav === false) alert('WTF? Nobody loves Skyler')

            onFav(char_id, true)
         }}>{isFav ? '🧡' : '💔'}</span>

      </article>
   </>
}