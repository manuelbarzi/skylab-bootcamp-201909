import React from 'react'
import '../../template/index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'


export default function({user, onAddLesson, teams, onBack, error}) {

return <section className="add-lesson">
    <h4 className="add-lesson__user">user: {user}</h4>
    <h3 className="add-lesson__title">ADD LESSON NAME</h3>
    <Link className="add-lesson__back" to="/lessonlist">back to TEAM LIST</Link>
    <form className="add-lesson__form" onSubmit={function (event) {
        event.preventDefault()

        const { date: { value: date }, timeStart: { value: timeStart }, timeEnd: { value: timeEnd },  teamName: {value: teamId } } = event.target


        onAddLesson(date, timeStart, timeEnd, teamId )

    }}>
        <input className="add-lesson__field" type="text" name="date" placeholder="date"/>
        <input className="add-lesson__field" type="text" name="timeStart" placeholder="starting time"/>
        <input className="add-lesson__field" type="text" name="timeEnd" placeholder="ending time"/>
        <select className="add-lesson__field-select" name="teamName">
            {teams.map(team => <option className="add-lesson__field" key={team.id} value={team.id}>{team.teamName}</option>)}
        </select>  
        <button className="add-lesson__button">Submit</button>
    </form>

        {error && <Feedback message={error} />}
</section>    

}
{/* <select>
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="mercedes">Mercedes</option>
<option value="audi">Audi</option>
</select>  */}





/* <h2 className="add-lesson__goback"><a href="/" onClick={event => {
        event.preventDefault()

        onBack()

}}>Go Back</a></h2> */