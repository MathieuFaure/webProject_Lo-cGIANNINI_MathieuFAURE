document.addEventListener('DOMContentLoaded', () => {
    const pubList = document.getElementById('publicationsList');
    const cards = Array.from(document.querySelectorAll('.pub-card'));

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const catBtns = document.querySelectorAll('.cat-btn');
    const dateSort = document.getElementById('dateSort');

    searchInput.value = '';

    // FILTER AND RESEARCH
    function filterPubs(forcedQuery = null) {
        const query = forcedQuery !== null ? forcedQuery : searchInput.value.toLowerCase().trim();

        const activeBtn = document.querySelector('.cat-btn.active');
        const activeCat = activeBtn ? activeBtn.dataset.filter : 'all';

        cards.forEach(card => {
            const title = card.querySelector('.pub-title').textContent.toLowerCase();
            const type = card.dataset.type; // Ex: "Article"

            const matchesSearch = title.includes(query);
            const matchesCat = (activeCat === 'all' || type === activeCat);

            card.style.display = (matchesSearch && matchesCat) ? 'flex' : 'none';
        });
    }

    // Click
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPubs();
        });
    });

    searchBtn.addEventListener('click', () => {
        const currentSearch = searchInput.value.toLowerCase().trim();
        filterPubs(currentSearch);
        searchInput.value = '';
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const currentSearch = searchInput.value.toLowerCase().trim();
            filterPubs(currentSearch);
            searchInput.value = '';
        }
    });

    // SORT BY DATE
    dateSort.addEventListener('change', () => {
        const sorted = cards.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateSort.value === 'latest' ? dateB - dateA : dateA - dateB;
        });

        sorted.forEach(card => pubList.appendChild(card));
    });

    // MODAL
    const modal = document.getElementById('pubModal');
    const closeModal = document.querySelector('.close-modal');

    cards.forEach(card => {
        const readBtn = card.querySelector('.read-btn');
        if (readBtn) {
            readBtn.addEventListener('click', () => {
                document.getElementById('modalPubTitle').textContent = card.querySelector('.pub-title').textContent;
                document.getElementById('modalPubMeta').textContent = card.querySelector('.pub-meta').textContent;
                document.getElementById('modalAuthorName').textContent = card.dataset.author;
                document.getElementById('modalFullText').textContent = card.dataset.fulltext;
                document.getElementById('modalImage').src = card.querySelector('.pub-image').src;
                document.getElementById('modalPhoto').src = card.dataset.photo;

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            });
        }
    });

    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});