import React from 'react';
import './Home.css';
import garlic from "../../assets/garlic.jpg";

function Home(props) {
    return (
        <div className="homepage">
            <div className="left-side">
                <h2>Wildplukrecepten</h2>
                <div id="text-why">
                    <p>Ik heb deze app wildplukrecepten ontwikkeld als eindopdracht voor mijn opleiding tot full stack
                        developer, ofwel websitebouwer. Mijn andere hobby is, zoals je al bedacht had, wildplukken. Wildplukken is buiten eetbare vruchten, zaden, blaadjes, wortels, bloemen e.d. plukken of uitgraven. En
                        daar dan natuurlijk heerlijke dingen mee maken, zoals frambozenjam of nog beter port en sloegin.</p>
                    <p> Wildplukken zorgt ervoor dat ik weer
                        eens buiten
                        kom, na lange uren achter de pc. In de natuur kom ik tot rust, kom ik tot mezelf. En kan ik mijn hoofd, dat soms overuren draait, weer resetten.</p>
                    <p>Het herkennen
                        van de planten en het
                        bereiden heb ik met name geleerd op de opleiding <a href={"https://natuurkok.nl/"}>Natuurkok</a>.
                        Een geweldige jaaropleiding, die ik iedereen aanraad. We hebben in deze opleiding veel recpeten met elkaar gedeeld op de chat. Het is uiteraard fijner als deze recepten bij elkaar staan en makkelijk te doorzoeken zijn. Et voila, vandaar deze app. Een handig snufje op deze app is dat je  kan selecteren op maand, zodat je precies kan zien wat je kan plukken en bereiden in die maand.</p>
                    <p> Veel plezier met plukken en eet
                        smakelijk. </p>
                    <p>Ellen van Duikeren</p>

                </div>
            </div>
                <div className="right-side">
                    <img src={garlic} alt="wild garlic" id="wild-garlic"/>
                    <p id="text-photo">Daslook, &copy <a
                        href='https://unsplash.com/es/@garyellisphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Gary
                        Ellis</a> on <a
                        href='https://unsplash.com/s/photos/wild-garlic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a>
                    </p>
                </div>
        </div>
    );
}

export default Home;