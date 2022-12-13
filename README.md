# Clap app

Sosiaalisen median sovellus jossa voi tehdä postauksia kuvalla tai ilman ja selata postauksia paikkakunta kohtaisesti.
Olen kehittänyt projektin täysin itse ( projekti on vielä kehitys vaiheessa vaikka paljon toiminnallisuuksia jo on )

Käy testailemassa painamalla oheista linkkiä: [clap-app](https://clap-app.net/)
(Käyttäjän luomis vaiheessa vahvistus koodi saattaa mennä roskapostiin)

# Teknologiat
Natiivit cloudformation templatet jolla luotu IaC AWS palveluihin.
Angular, PWA, http api gateway + lambda jossa pyörii koa.js, event pohjaisesti reagoidaan tietokanta lisäyksiin ja lähetetään esim socketin avulla notifikaatioita

## Kirjautumis näkymä

<img width="425" alt="Screen Shot 2022-06-07 at 20 12 49" src="https://user-images.githubusercontent.com/42738047/172442689-75890e39-a05a-4911-ae88-a9347ed130e2.png">

## Näkymä etusivulta

<img width="500" alt="Screen Shot 2022-06-07 at 20 15 31" src="https://user-images.githubusercontent.com/42738047/172443290-4f3d8b3d-8e31-4383-bbae-1b66c3e957e6.png">

## Ilmoitukset näkymä

<img width="504" alt="Screen Shot 2022-06-07 at 20 16 05" src="https://user-images.githubusercontent.com/42738047/172443395-d8b3c3fe-7602-4965-9b69-b03cd48f4a0c.png">


## Asetukset
<img width="501" alt="Screen Shot 2022-06-07 at 20 18 16" src="https://user-images.githubusercontent.com/42738047/172443864-61af9a15-4e09-4b51-a132-a2a8ffd3dba3.png">

## Oma profiili ja logout 
<img width="501" alt="Screen Shot 2022-06-07 at 20 19 17" src="https://user-images.githubusercontent.com/42738047/172444029-9b5c4d92-71da-46fc-9f1e-22b45466204e.png">
