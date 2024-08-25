$(document).ready(function() {
    baseUrl = 'https://raw.githubusercontent.com/noahzarro/recipes-data/main'
    const apiUrl = baseUrl + '/data.json';

    $.getJSON(apiUrl, function(data) {
        const recipesContainer = $('#recipes-container');

        data.forEach(function(recipe, index) {
            const card = $(`
                <div class="col-md-4 mb-4">
                    <div class="card recipe-card" data-recipe-id="${index}">
                        <img src="${baseUrl}/images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.name}</h5>
                            <div class="recipe-details">
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

        $('.recipe-card').click(function() {
            $(this).find('.recipe-details').slideToggle();
        });
    });
});