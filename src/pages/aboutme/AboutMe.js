import React from 'react';
import './AboutMe.css';
import raspberry from '../../assets/raspberry.png';

function AboutMe() {
    return (
        <article className="page about-me-page">
            <div className="left-side" id="text-why">
                <h1>Ellen van Duikeren</h1>
                <p>Ik heb deze website wildplukrecepten ontwikkeld als eindopdracht voor mijn
                    opleiding tot full stack
                    developer, ofwel websitebouwer. Deze opleiding is voor mij mijn tweede carriereswitch, na 10 jaar
                    als civiel
                    ingenieur en vervolgens 13 jaar als klinisch verloskundige gewerkt te hebben.</p>
                <p> Een van mijn hobbies is, zoals je al bedacht had, wildplukken. Wildplukken zorgt ervoor dat ik weer
                    eens buiten kom, na lange uren achter de pc. In de natuur kom ik
                    tot rust, kom ik tot mezelf en daar kan ik mijn hoofd, dat soms overuren draait, weer resetten.</p>
                <p>Het herkennen van de planten heb ik met name geleerd op de opleiding <a
                    href={"https://natuurkok.nl/"}>Natuurkok</a>.
                    Een geweldige jaaropleiding, die ik iedereen aanraad. Je leert landschappen lezen, planten
                    herkennen, koken op vuur en met de dutch oven. Je trekt een heel jaar op met 20 geweldige,
                    gezellige, enthousiaste, gemotiveerde mensen. Een hoop humor en veel warmte van het vuur en iedereen
                    eromheen.</p>
                <p>Liefs, Ellen </p>
            </div>


            <div className="right-side">
                <img src={raspberry} alt="raspberries" className="photo"/>
                <p className="photo-caption">Frambozen, &copy; <a
                    href="https://www.freepik.com/free-photo/close-up-view-pattern-raspberries-leaves-white-surface-with-copy-space_9478495.htm#query=raspberry%20plant&position=25&from_view=search&track=sph">Image
                    by stockking on Freepik</a>
                </p>
            </div>
        </article>
    )
        ;
}

export default AboutMe;