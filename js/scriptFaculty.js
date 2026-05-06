document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const roleFilter = document.getElementById('roleFilter');
    const cards = document.querySelectorAll('.person-card');

    const modal = document.getElementById('memberModal');
    const closeModal = document.querySelector('.close-modal');

    // FILTER AND RESEARCH
    function performFiltering() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedRole = roleFilter.value;

        cards.forEach(card => {
            const name = card.querySelector('.name').textContent.toLowerCase();
            const role = card.getAttribute('data-role');
            const matchesSearch = name.includes(query);
            const matchesRole = (selectedRole === 'all' || role === selectedRole);
            card.style.display = (matchesSearch && matchesRole) ? 'block' : 'none';
        });
        searchInput.value = '';
    }

    searchBtn.addEventListener('click', performFiltering);
    roleFilter.addEventListener('change', performFiltering);

    // MODALE
    cards.forEach(card => {
        card.addEventListener('click', () => {

            const name = card.querySelector('.name').textContent;
            const role = card.querySelector('.role').textContent;
            const bio = card.getAttribute('data-bio') || "No biography available.";
            const edu = card.getAttribute('data-edu') || "Education details coming soon.";

            document.getElementById('modalName').textContent = name;
            document.getElementById('modalRole').textContent = role;
            document.getElementById('modalBio').textContent = bio;
            document.getElementById('modalEdu').textContent = edu;

            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});