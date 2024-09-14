let activeFilters = [];
let allRecipes = [];

$(document).ready(function() {
    baseUrl = 'https://raw.githubusercontent.com/noahzarro/recipes-data/main'
    const apiUrl = baseUrl + '/data.json';

    $.getJSON(apiUrl, function(data) {
        let recipes = data.recipes;
        allRecipes = recipes;
        let tags = data.tags;

        const recipesContainer = $('#recipes-container');
        const tagsContainer = $('#tags-container');

        let buttonParent = $(`<div class="col-auto"><div class="d-flex flex-wrap gap-2"></div></div>`);

        tags.forEach(function(tag) {
            const tagButton = $(`
                    <button id="${tag.id}" class="btn btn-light rounded-pill mx-1">${tag.displayName}</button>
            `);
            tagButton.on('click', function() {
                toggleFilter(tag);
            });
            buttonParent.append(tagButton);
        });

        tagsContainer.append(buttonParent)

        recipes.forEach(function(recipe, index) {
            const card = $(`
            <div class="col-md-4 mb-4">
            <div class="card recipe-card" data-recipe-id="${index}">
            <img src="${baseUrl}/images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <div class="recipe-details">
                <h6>Personen: <span style="display: inline;">${recipe.numberOfPersons}</span></h6>
                <h6>Dauer: <span style="display: inline;">${formatTime(recipe.minutesToPrepare)}</span></h6>
                <h6>Zutaten:</h6>
                <ul>
                ${recipe.ingredients.map(ingredient => `
                <li>${ingredient.amount} ${ingredient.product}</li>
                `).join('')}
                </ul>
                <h6>Zubereitung:</h6>
                <ol>
                ${recipe.preparation.map(step => `
                <li>${step}</li>
                `).join('')}
                </ol>
                ${recipe.notes ? `<p><strong>Notes:</strong> ${recipe.notes}</p>` : ''}
                ${recipe.url ? `<p><a href="${recipe.url}" target="_blank">Original</a></p>` : ''}
                </div>
            </div>
            </div>
            </div>
            `);

            recipesContainer.append(card);
        });

        function formatTime(minutes) {
            if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} h ${remainingMinutes} min`;
            } else {
            return `${minutes} min`;
            }
        }

        $('.recipe-card').click(function() {
            $(this).find('.recipe-details').slideToggle();
        });
    });
});

 // change visibily of recipes based on active filters
function filterRecipes() {
    console.log(activeFilters)

    let activeTags = activeFilters.map(filter => filter.id);
    let recipesCards = $('.recipe-card');

    allRecipes.forEach(function(recipe, index) {
        let recipeTags = recipe.tags;
        let recipeCard = recipesCards[index];
        let isVisible = activeTags.length === 0 || recipeTags.some(tag => activeTags.includes(tag));
        $(recipeCard).toggle(isVisible);
    });
}

function toggleFilter(tag) {
    let containedTag = activeFilters.find(filter => filter.id === tag.id) !== undefined;
    if (containedTag) {
        activeFilters = activeFilters.filter(filter => filter.id !== tag.id);
    } else {
        activeFilters.push(tag);
    }

    // change button style
    let button = $(`#${tag.id}`);
    button.toggleClass('btn-light');
    button.toggleClass('btn-secondary');

    filterRecipes();
}


// example response
/*
{
    "tags": [
        {
            "id": "dessert",
            "displayName": "Dessert"
        },
        {
            "id": "mainMeal",
            "displayName": "Hauptmalzeit"
        },
        {
            "id": "aperitif",
            "displayName": "Apero"
        },
        {
            "id": "mezze",
            "displayName": "Mezze"
        }
    ],
    "recipes": [
        {
            "name": "Palak Paneer",
            "tags": ["mainMeal"],
            "numberOfPersons": 2,
            "minutesToPrepare": 30,
            "ingredients": [
                {
                    "amount": "250g",
                    "product": "frischer Spinat, gehackt"
                },
                {
                    "amount": "1/2",
                    "product": "Chilli"
                },
                {
                    "amount": "1/2 TL",
                    "product": "Ingwer, fein gehackt"
                },
                {
                    "amount": "1 Prise",
                    "product": "Bockshornkleesamen"
                },
                {
                    "amount": "1",
                    "product": "Zwiebel"
                },
                {
                    "amount": "1",
                    "product": "Knoblauch"
                },
                {
                    "amount": "1/4 TL",
                    "product": "Kreuzkümmel"
                },
                {
                    "amount": "1 TL",
                    "product": "Garam Masala"
                },
                {
                    "amount": "250g",
                    "product": "Tomaten, gehackt"
                },
                {
                    "amount": "100g",
                    "product": "Paneer, gewürfelt"
                },
                {
                    "amount": "240g",
                    "product": "Reis"
                }
            ],
            "preparation": [
                "Reis kochen",
                "Spinat, Chilli, Ingwer erwärmen, zusammenfallen lassen und pürieren",
                "Bockshornkleesamen 30s anbräunen",
                "Zwiebel und Knoblauch zugeben und andünsten",
                "Gewürze und Tomaten zugeben und 5min kochen",
                "Pürierter Spinat und Paneer dazugeben",
                "Evtl. mit Zitronensaft oder Jogurt ergänzen"
            ],
            "image": "palak_paneer.jpg",
            "url": "https://drive.google.com/file/d/1aV350xFkJQCQCxh4pHuGM7sDrbMnmPxb/view?usp=sharing",
            "notes": ""
        },
        {
            "name": "Foccacia",
            "tags": ["mainMeal"],
            "numberOfPersons": 4,
            "minutesToPrepare": 180,
            "ingredients": [
                {
                    "amount": "7g",
                    "product": "Trockenhefe"
                },
                {
                    "amount": "eine Prise",
                    "product": "Salz"
                },
                {
                    "amount": "1 EL",
                    "product": "Olivenöl"
                },
                {
                    "amount": "410ml",
                    "product": "Wasser"
                },
                {
                    "amount": "500g",
                    "product": "Mehl"
                }
            ],
            "preparation": [
                "alle Zutaten mischen",
                "1/2h stehen lassen",
                "4x 4 mal falten und 1/2h zugedeckt stehen lassen",
                "evtl. über Nacht zugedeckt in Kühlschrank",
                "Auflaufform ölen und Teil hineinfüllen. Löcher mit den Fingern eindrücken und würzen",
                "20min bei 200° mit Umluft backen"
            ],
            "image": "focaccia-no-knead-1156x1536.jpg",
            "url": "https://www.youtube.com/watch?v=O1WQTKuWWfM&t=79s",
            "notes": ""
        },
        {
            "name": "Riz Casimier",
            "tags": ["mainMeal"],
            "numberOfPersons": 2,
            "minutesToPrepare": 40,
            "ingredients": [
                {
                    "amount": "240g",
                    "product": "Reis"
                },
                {
                    "amount": "1/2 TL",
                    "product": "Salz"
                },
                {
                    "amount": "1 EL",
                    "product": "Butter"
                },
                {
                    "amount": "1 EL",
                    "product": "Curry"
                },
                {
                    "amount": "1 EL",
                    "product": "Mehl"
                },
                {
                    "amount": "4 dl",
                    "product": "Wasser"
                },
                {
                    "amount": "1 EL",
                    "product": "Kokosraspel"
                },
                {
                    "amount": "1",
                    "product": "Apfel"
                },
                {
                    "amount": "1 EL",
                    "product": "Weinbeeren"
                },
                {
                    "amount": "1",
                    "product": "Tofuwüfel"
                },
                {
                    "amount": "1",
                    "product": "Banane"
                }
            ],
            "preparation": [
                "Reis kochen",
                "Butter schmelzen",
                "Curry und Mehl hinzufügen",
                "Wasser hinzufügen und 1 EL Kokosraspel",
                "Apfel und Weinbeeren hinzufügen",
                "Tofuwüfel 1h in Sojasaue marinieren ohne Salz",
                "Tofuwüfel anbraten",
                "Banane in Butter braten"
            ],
            "image": "riz-casimir.jpg",
            "url": "https://docs.google.com/document/d/0B858_TpGStzPT2RpY0V3bXpTZG8/edit?usp=sharing&ouid=117684296261368439127&resourcekey=0-EeGHbFJ_vyDjyATsQ4Nv3w&rtpof=true&sd=true",
            "notes": ""
        },
        {
            "name": "Sachertorte",
            "tags": ["dessert"],
            "numberOfPersons": 12,
            "minutesToPrepare": 60,
            "ingredients": [
                {
                    "amount": "7",
                    "product": "Eidotter"
                },
                {
                    "amount": "150g",
                    "product": "weiche Butter"
                },
                {
                    "amount": "125g",
                    "product": "Staubzucker"
                },
                {
                    "amount": "200g",
                    "product": "dunkle Schokolade"
                },
                {
                    "amount": "1 Pkg.",
                    "product": "Vanillezucker"
                },
                {
                    "amount": "7",
                    "product": "Eiklar"
                },
                {
                    "amount": "125g",
                    "product": "Kristallzucker"
                },
                {
                    "amount": "Prise",
                    "product": "Salz"
                },
                {
                    "amount": "150g",
                    "product": "Mehl"
                },
                {
                    "amount": "für die Form",
                    "product": "Butter und Mehl"
                },
                {
                    "amount": "150-200g",
                    "product": "Marillenmarmelade zum Bestreichen"
                },
                {
                    "amount": "Rum",
                    "product": "nach Belieben"
                },
                {
                    "amount": "Schlagobers",
                    "product": "für die Garnitur"
                },
                {
                    "amount": "1 Packung",
                    "product": "Kuchenglasur"
                }
            ],
            "preparation": [
                "Reis kochen",
                "Butter mit Staub- und Vanillezucker schaumig rühren",
                "Dotter nach und nach einrühren",
                "Eiklar mit einer Prise Salz aufschlagen, Kristallzucker zugeben und zu steifem Schnee schlagen",
                "Geschmolzene Schokolade in die Dottermasse einrühren und den Schnee abwechselnd mit dem Mehl unterziehen",
                "Teig in die Form füllen und etwa 1 Stunde backen",
                "Torte herausheben und auskühlen lassen",
                "Torte der Quere nach einmal durchschneiden",
                "Teigboden mit Marmelade bestreichen, zweite Hälfte daraufsetzen und obenauf sowie rundum mit Marillenmarmelade bestreichen",
                "Glasur wärmen und über die Torte giessen",
                "Torte bei Zimmertemperatur trocknen lassen",
                "Mit geschlagenem Obers garniert servieren"
            ],
            "image": "sachertorte.jpg",
            "url": "https://www.ichkoche.at/sachertorte-rezept-100",
            "notes": "Sachertorte nach Möglichkeit nicht im Kühlschrank lagern, da sie sonst „schwitzt“."
        },
        {
            "name": "Linsen Curry",
            "tags": ["mainMeal"],
            "numberOfPersons": 4,
            "minutesToPrepare": 30,
            "ingredients": [
                {
                    "amount": "480g",
                    "product": "Basmatireis"
                },
                {
                    "amount": "1 EL",
                    "product": "Kokosöl"
                },
                {
                    "amount": "1 TL",
                    "product": "Kreuzkümmel"
                },
                {
                    "amount": "1 TL",
                    "product": "Kardamomkapsel"
                },
                {
                    "amount": "1 EL",
                    "product": "Garam Masala"
                },
                {
                    "amount": "1 TL",
                    "product": "gemahlene Koriandersamen"
                },
                {
                    "amount": "1 TL",
                    "product": "Kurkuma"
                },
                {
                    "amount": "1 TL",
                    "product": "Ingwer, fein gerieben"
                },
                {
                    "amount": "2",
                    "product": "Knoblauchzehen, fein gehackt"
                },
                {
                    "amount": "1",
                    "product": "Zwiebel, fein gehackt"
                },
                {
                    "amount": "1 EL",
                    "product": "Tomatenmark"
                },
                {
                    "amount": "2",
                    "product": "Lorbeerblätter"
                },
                {
                    "amount": "2",
                    "product": "Karotten, gewürfelt"
                },
                {
                    "amount": "200g",
                    "product": "festkochende Kartoffeln, gewürfelt"
                },
                {
                    "amount": "100g",
                    "product": "rote Linsen"
                },
                {
                    "amount": "400g",
                    "product": "Tomaten, gehackt"
                },
                {
                    "amount": "1/2",
                    "product": "Zitrone, nur den Saft"
                },
                {
                    "amount": "3 dl",
                    "product": "Wasser"
                },
                {
                    "amount": "100g",
                    "product": "Baby-Spinat"
                },
                {
                    "amount": "3 EL",
                    "product": "Kokosmilch"
                },
                {
                    "amount": "1 1/2 TL",
                    "product": "Salz"
                },
                {
                    "amount": "zum Garnieren",
                    "product": "Kokosmilch"
                },
                {
                    "amount": "1/2 Bund",
                    "product": "Koriander, grob gehackt"
                }
            ],
            "preparation": [
                "Kokosöl in einer Pfanne erhitzen, Kreuzkümmel und Kardamom anrösten, bis das Aroma freigesetzt wird",
                "Garam Masala, Koriander, Kurkuma, Ingwer, Knoblauch und Zwiebel beigeben, ca. 3 Min. andünsten",
                "Tomatenmark, Lorbeerblätter, Karotten und Kartoffeln beigeben, kurz anbraten",
                "Linsen und Tomaten beigeben, Zitronensaft und Wasser dazugiessen, aufkochen, Hitze reduzieren, zudecken und ca. 20 Min. köcheln",
                "Spinat beigeben, weitere 5 Min. köcheln",
                "Kokosmilch unterrühren, mit Salz abschmecken"
            ],
            "image": "linsen-curry.jpg",
            "url": "https://fooby.ch/en/recipes/17604/lentil-curry",
            "notes": ""
        }
    ]
}
*/