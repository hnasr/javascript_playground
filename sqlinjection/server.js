const {Client} = require('pg')
const app = require("express")()
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "husseinmac",
    port: 5432,
    database: "husseindb"
})
client.connect();

app.get("/", async (req, res) => {
    let results = {}
    results.rows = []
    try {
        const id = req.query.id;

        
        results = await client.query(`select * from profiles where id = $1`, [id])
        
       
    }
    catch (e) {
        console.log("Error")
    }
    finally {
        res.setHeader("content-type",  "application/json")
        res.send(JSON.stringify(results.rows))
        
    }
    
    
})
app.listen(8080, e => console.log("Listening on 8080"))









/*

const names = {"names":["Emma","Olivia","Ava","Sophia","Isabella","Mia","Charlotte","Abigail","Emily","Harper","Amelia","Evelyn","Elizabeth","Sofia","Madison","Avery","Ella","Scarlett","Grace","Chloe","Victoria","Riley","Aria","Lily","Aubrey","Zoey","Penelope","Lillian","Addison","Layla","Natalie","Camila","Hannah","Brooklyn","Zoe","Nora","Leah","Savannah","Audrey","Claire","Eleanor","Skylar","Ellie","Samantha","Stella","Paisley","Violet","Mila","Allison","Alexa","Anna","Hazel","Aaliyah","Ariana","Lucy","Caroline","Sarah","Genesis","Kennedy","Sadie","Gabriella","Madelyn","Adeline","Maya","Autumn","Aurora","Piper","Hailey","Arianna","Kaylee","Ruby","Serenity","Eva","Naomi","Nevaeh","Alice","Luna","Bella","Quinn","Lydia","Peyton","Melanie","Kylie","Aubree","Mackenzie","Kinsley","Cora","Julia","Taylor","Katherine","Madeline","Gianna","Eliana","Elena","Vivian","Willow","Reagan","Brianna","Clara","Faith","Ashley","Emilia","Isabelle","Annabelle","Rylee","Valentina","Everly","Hadley","Sophie","Alexandra","Natalia","Ivy","Maria","Josephine","Delilah","Bailey","Jade","Ximena","Alexis","Alyssa","Brielle","Jasmine","Liliana","Adalynn","Khloe","Isla","Mary","Andrea","Kayla","Emery","London","Kimberly","Morgan","Lauren","Sydney","Nova","Trinity","Lyla","Margaret","Ariel","Adalyn","Athena","Lilly","Melody","Isabel","Jordyn","Jocelyn","Eden","Paige","Teagan","Valeria","Sara","Norah","Rose","Aliyah","Mckenzie","Molly","Raelynn","Leilani","Valerie","Emerson","Juliana","Nicole","Laila","Makayla","Elise","Mariah","Mya","Arya","Ryleigh","Adaline","Brooke","Rachel","Eliza","Angelina","Amy","Reese","Alina","Cecilia","Londyn","Gracie","Payton","Esther","Alaina","Charlie","Iris","Arabella","Genevieve","Finley","Daisy","Harmony","Anastasia","Kendall","Daniela","Catherine","Adelyn","Vanessa","Brooklynn","Juliette","Julianna","Presley","Summer","Destiny","Amaya","Hayden","Alana","Rebecca","Michelle","Eloise","Lila","Fiona","Callie","Lucia","Angela","Marley","Adriana","Parker","Alexandria","Giselle","Alivia","Alayna","Brynlee","Ana","Harley","Gabrielle","Dakota","Georgia","Juliet","Tessa","Leila","Kate","Jayla","Jessica","Lola","Stephanie","Sienna","Josie","Daleyza","Rowan","Evangeline","Hope","Maggie","Camille","Makenzie","Vivienne","Sawyer","Gemma","Joanna","Noelle","Elliana","Mckenna","Gabriela","Kinley","Rosalie","Brynn","Amiyah","Melissa","Adelaide","Malia","Ayla","Izabella","Delaney","Cali","Journey","Maci","Elaina","Sloane","June","Diana","Blakely","Aniyah","Olive","Jennifer","Paris","Miranda","Lena","Jacqueline","Paislee","Jane","Raegan","Lyric","Lilliana","Adelynn","Lucille","Selena","River","Annie","Cassidy","Jordan","Thea","Mariana","Amina","Miriam","Haven","Remi","Charlee","Blake","Lilah","Ruth","Amara","Kali","Kylee","Arielle","Emersyn","Alessandra","Fatima","Talia","Vera","Nina","Ariah","Allie","Addilyn","Keira","Catalina","Raelyn","Phoebe","Lexi","Zara","Makenna","Ember","Leia","Rylie","Angel","Haley","Madilyn","Kaitlyn","Heaven","Nyla","Amanda","Freya","Journee","Daniella","Danielle","Kenzie","Ariella","Lia","Brinley","Maddison","Shelby","Elsie","Kamila","Camilla","Alison","Ainsley","Ada","Laura","Kendra","Kayleigh","Adrianna","Madeleine","Joy","Juniper","Chelsea","Sage","Erin","Felicity","Gracelyn","Nadia","Skyler","Briella","Aspen","Myla","Heidi","Katie","Zuri","Jenna","Kyla","Kaia","Kira","Sabrina","Gracelynn","Gia","Amira","Alexia","Amber","Cadence","Esmeralda","Katelyn","Scarlet","Kamryn","Alicia","Miracle","Kelsey","Logan","Kiara","Bianca","Kaydence","Alondra","Evelynn","Christina","Lana","Aviana","Dahlia","Dylan","Anaya","Ashlyn","Jada","Kathryn","Jimena","Elle","Gwendolyn","April","Carmen","Mikayla","Annalise","Maeve","Camryn","Helen","Daphne","Braelynn","Carly","Cheyenne","Leslie","Veronica","Nylah","Kennedi","Skye","Evie","Averie","Harlow","Allyson","Carolina","Tatum","Francesca","Aylin","Ashlynn","Sierra","Mckinley","Leighton","Maliyah","Annabella","Megan","Margot","Luciana","Mallory","Millie","Regina","Nia","Rosemary","Saylor","Abby","Briana","Phoenix","Viviana","Alejandra","Frances","Jayleen","Serena","Lorelei","Zariah","Ariyah","Jazmin","Avianna","Carter","Marlee","Eve","Aleah","Remington","Amari","Bethany","Fernanda","Malaysia","Willa","Liana","Ryan","Addyson","Yaretzi","Colette","Macie","Selah","Nayeli","Madelynn","Michaela","Priscilla","Janelle","Samara","Justice","Itzel","Emely","Lennon","Aubrie","Julie","Kyleigh","Sarai","Braelyn","Alani","Lacey","Edith","Elisa","Macy","Marilyn","Baylee","Karina","Raven","Celeste","Adelina","Matilda","Kara","Jamie","Charleigh","Aisha","Kassidy","Hattie","Karen","Sylvia","Winter","Aleena","Angelica","Magnolia","Cataleya","Danna","Henley","Mabel","Kelly","Brylee","Jazlyn","Virginia","Helena","Jillian","Madilynn","Blair","Galilea","Kensley","Wren","Bristol","Emmalyn","Holly","Lauryn","Cameron","Hanna","Meredith","Royalty","Sasha","Lilith","Jazmine","Alayah","Madisyn","Cecelia","Renata","Lainey","Liberty","Brittany","Savanna","Imani","Kyra","Mira","Mariam","Tenley","Aitana","Gloria","Maryam","Giuliana","Skyla","Anne","Johanna","Myra","Charley","Tiffany","Beatrice","Karla","Cynthia","Janiyah","Melany","Alanna","Lilian","Demi","Pearl","Jaylah","Maia","Cassandra","Jolene","Crystal","Everleigh","Maisie","Anahi","Elianna","Hallie","Ivanna","Oakley","Ophelia","Emelia","Mae","Marie","Rebekah","Azalea","Haylee","Bailee","Anika","Monica","Kimber","Sloan","Jayda","Anya","Bridget","Kailey","Julissa","Marissa","Leona","Aileen","Addisyn","Kaliyah","Coraline","Dayana","Kaylie","Celine","Jaliyah","Elaine","Lillie","Melina","Jaelyn","Shiloh","Jemma","Madalyn","Addilynn","Alaia","Mikaela","Adley","Saige","Angie","Dallas","Braylee","Elsa","Emmy","Hayley","Siena","Lorelai","Miah","Royal","Tiana","Elliot","Kori","Greta","Charli","Elliott","Julieta","Alena","Rory","Harlee","Rosa","Ivory","Guadalupe","Jessie","Laurel","Annika","Clarissa","Karsyn","Collins","Kenia","Milani","Alia","Chanel","Dorothy","Armani","Emory","Ellen","Irene","Adele","Jaelynn","Myah","Hadassah","Jayde","Lilyana","Malaya","Kenna","Amelie","Reyna","Teresa","Angelique","Linda","Nathalie","Kora","Zahra","Aurelia","Kalani","Rayna","Jolie","Sutton","Aniya","Jessa","Laylah","Esme","Keyla","Ariya","Elisabeth","Marina","Mara","Meadow","Aliza","Zelda","Lea","Elyse","Monroe","Penny","Lilianna","Lylah","Liv","Scarlette","Kadence","Ansley","Emilee","Perla","Annabel","Alaya","Milena","Karter","Avah","Amirah","Leyla","Livia","Chaya","Wynter","Jaycee","Lailah","Amani","Milana","Lennox","Remy","Zariyah","Clare","Hadlee","Kiera","Rosie","Alma","Kaelyn","Eileen","Jayden","Martha","Noa","Christine","Ariadne","Natasha","Emerie","Tatiana","Joselyn","Joyce","Salma","Amiya","Audrina","Kinslee","Jaylene","Analia","Erika","Lexie","Mina","Patricia","Dulce","Poppy","Aubrielle","Clementine","Lara","Amaris","Milan","Aliana","Kailani","Kaylani","Maleah","Belen","Simone","Whitney","Elora","Claudia","Gwen","Rylan","Antonella","Khaleesi","Arely","Princess","Kenley","Itzayana","Karlee","Paulina","Laney","Bria","Chana","Kynlee","Astrid","Giovanna","Lindsey","Sky","Aryanna","Ayleen","Azariah","Joelle","Nala","Tori","Noemi","Breanna","Emmeline","Mavis","Amalia","Mercy","Tinley","Averi","Aiyana","Alyson","Corinne","Leanna","Madalynn","Briar","Jaylee","Kailyn","Kassandra","Kaylin","Nataly","Amia","Yareli","Cara","Taliyah","Thalia","Carolyn","Estrella","Montserrat","Zaylee","Anabelle","Deborah","Frida","Zaria","Kairi","Katalina","Nola","Erica","Isabela","Jazlynn","Paula","Faye","Louisa","Alessia","Courtney","Reign","Ryann","Stevie","Heavenly","Lisa","Roselyn","Raina","Adrienne","Celia","Estelle","Marianna","Brenda","Kathleen","Paola","Hunter","Ellis","Hana","Lina","Raquel","Aliya","Iliana","Kallie","Emmalynn","Naya","Reina","Wendy","Landry","Barbara","Casey","Karlie","Kiana","Rivka","Kenya","Aya","Carla","Dalary","Jaylynn","Sariah","Andi","Romina","Dana","Danica","Ingrid","Kehlani","Zaniyah","Alannah","Avalynn","Evalyn","Sandra","Veda","Hadleigh","Paityn","Abril","Ciara","Holland","Lillianna","Kai","Bryleigh","Emilie","Carlee","Judith","Kristina","Janessa","Annalee","Zoie","Maliah","Bonnie","Emmaline","Louise","Kaylynn","Monserrat","Nancy","Noor","Vada","Aubriella","Maxine","Nathalia","Tegan","Aranza","Emmie","Brenna","Estella","Ellianna","Kailee","Ailani","Caylee","Zainab","Zendaya","Jana","Julianne","Ellison","Sariyah","Lizbeth","Susan","Alyvia","Jewel","Marjorie","Marleigh","Nathaly","Sharon","Yamileth","Zion","Mariyah","Lyra","Belle","Yasmin","Kaiya","Maren","Marisol","Vienna","Calliope","Hailee","Rayne","Tabitha","Anabella","Blaire","Giana","Milania","Paloma","Amya","Novalee","Harleigh","Ramona","Rhea","Aadhya","Miya","Desiree","Frankie","Sylvie","Jasmin","Moriah","Rosalyn","Kaya","Joslyn","Tinsley","Farrah","Aislinn","Halle","Madyson","Micah","Arden","Bexley","Ari","Aubri","Ayana","Cherish","Davina","Anniston","Riya","Adilynn","Ally","Amayah","Harmoni","Heather","Saoirse","Azaria","Alisha","Nalani","Maylee","Shayla","Briley","Elin","Lilia","Ann","Antonia","Aryana","Chandler","Esperanza","Lilyanna","Alianna","Luz","Meilani"],"year":"2016"}
const states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}
addProfiles();
async function addProfiles() {
try{
    await client.connect();
 
    for (let k = 0; k < names.names.length; k++) 
        await client.query(`insert into profiles (id, name, address, email) values (${k}, '${names.names[k]}', '${states.CA}', '${names.names[k]}@gmail.com')`)

    

}
catch (e) {
    console.log(`error${e}`)
}
finally {
    client.end()
}
}*/