document.getElementById('search-input').addEventListener('keyup', function() {
    // 1. On récupère ce qui est tapé et on le met en minuscule
    let filter = this.value.toLowerCase();
    
    // 2. On récupère toutes les cartes de projets
    let cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        // 3. On récupère le texte du titre et des tags
        let title = card.querySelector('h4').textContent.toLowerCase();
        let tags = card.querySelector('.tags').textContent.toLowerCase();

        // 4. Si le mot tapé est dans le titre OU dans les tags, on affiche
        if (title.includes(filter) || tags.includes(filter)) {
            card.style.display = ""; // Affiche la carte
        } else {
            card.style.display = "none"; // Cache la carte
        }
    });
});