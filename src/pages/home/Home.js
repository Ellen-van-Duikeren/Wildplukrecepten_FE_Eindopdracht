import garlic from "../../assets/garlic.jpg";

function Home() {

    return (
        <article className="page page--flex">
            <section className="left-side">
                <h1>Wildplukrecepten</h1>

                <p className="margin-bottom1">Op deze website vind je recepten met wildpluk, ofwel bladeren, bloemen, wortels, die je zelf in de
                    natuur kan plukken of uitgraven. Hiermee kan je dan natuurlijk heerlijke dingen maken,
                    zoals bramenjam, zevenbladpesto, brandnetelsoep of nog beter port en sloegin.</p>

                <p className="margin-bottom1">Waarom nog een receptenwebsite? De meerwaarde van deze website is, dat je kan selecteren op de
                    maand waarin de wildpluk beschikbaar is. Is het mei en wil je iets bereiden, dan zoek je op mei en
                    alle recepten met de wildpluk die je in mei kan plukken, verschijnen.</p>

                <p className="margin-bottom1">Waar vind ik die wildpluk dan? Die wildpluk vind je eigenlijk overal, zelfs middenin de stad. Op de website <a
                    href="http://wildplukwijzer.nl/blog/overdewildplukwijzer/" target="_blank">wildplukwijzer</a> vind je alle openbare planten, bomen, struiken in jouw buurt of waar je dan ook maar wilt gaan wildplukken in Nederland.</p>

                   <p className="margin-bottom1">Hoe leer ik wildpluk herkennen? Er
                       worden vele workshops, excursies gegeven, verspreid over het land, waar je van een wildplukker kan leren welke planten eetbaar zijn. Een paar voorbeelden van wildplukkers met wie ik zelf zeer goede ervaringen heb:</p>
                <ul className="margin-left1 margin-bottom1">
                    <li>Wildplukjaaropleiding, workshops eetbate planten, dutch oven, kaas maken door Danielle Berghmans
                        van <a href="https://natuurkok.nl/" target="_blank">de Natuurkok</a></li>
                    <li>Wildplukwandelingen, kookworkshops, naturecamp door chef-kok <a
                        href="https://jeroennielen.com/" target="_blank">Jeroen Nielen</a></li>
                    <li>Wandelingen met natuurgids Pieter Vos</li>
                </ul>



                <p className="margin-bottom1">Is wildplukken legaal? Formeel mag wildplukken niet, maar.... in de praktijk krijg je, in de openbare
                    ruimte, zelden een boete en is de ongeschreven regel dat je kleine hoeveelheden, voor eigen gebruik,
                    mag meenemen. Buiten de openbare ruimte is het netjes als je vooraf toestemming vraagt aan de
                    eigenaar. Uiteraard pluk je niet de hele boom of struik leeg; je laat ook wat achter voor de dieren
                    of voor collega wildplukkers.</p>
                <p className="margin-bottom1">Veel plezier met plukken, koken en eet smakelijk. </p>
            </section>

            <section className="right-side">
                <img src={garlic} alt="wild garlic" className="photo"/>
                <p className="photo-caption">Daslook, &copy; <a
                    href='https://unsplash.com/es/@garyellisphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Gary
                    Ellis</a> on <a
                    href='https://unsplash.com/s/photos/wild-garlic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a>
                </p>
            </section>
        </article>
    );
}

export default Home;