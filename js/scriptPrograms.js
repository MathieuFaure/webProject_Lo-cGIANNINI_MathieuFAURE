document.addEventListener('DOMContentLoaded', () => {
    // FILTER
    const catBtns = document.querySelectorAll('.cat-btn');
    const yearRows = document.querySelectorAll('.year-row');

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const year = btn.dataset.year;

            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            yearRows.forEach(row => {
                if (year === 'all' || row.dataset.year === year) {
                    row.style.display = 'block';
                    setTimeout(() => { row.style.opacity = '1'; }, 10);
                } else {
                    row.style.opacity = '0';
                    setTimeout(() => { row.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // PLANNING
    let currentWeek = 1;
    const btnPrev = document.getElementById('prevWeek');
    const btnNext = document.getElementById('nextWeek');
    const label = document.getElementById('weekLabel');
    const week1 = document.getElementById('week1');
    const week2 = document.getElementById('week2');

    function updatePlanningDisplay() {

        if (!week1 || !week2 || !label) return;

        if (currentWeek === 1) {

            week1.style.display = "block";
            week2.style.display = "none";
            label.textContent = "Week 1 (Oct 20 - 24)";

            btnPrev.style.opacity = "0.3";
            btnPrev.style.pointerEvents = "none";
            btnNext.style.opacity = "1";
            btnNext.style.pointerEvents = "auto";
        } else {

            week1.style.display = "none";
            week2.style.display = "block";
            label.textContent = "Week 2 (Oct 27 - 31)";

            btnNext.style.opacity = "0.3";
            btnNext.style.pointerEvents = "none";
            btnPrev.style.opacity = "1";
            btnPrev.style.pointerEvents = "auto";
        }
    }

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            currentWeek = 2;
            updatePlanningDisplay();
        });

        btnPrev.addEventListener('click', () => {
            currentWeek = 1;
            updatePlanningDisplay();
        });
    }

    updatePlanningDisplay();

    // MODAL
    const modal = document.getElementById('courseModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";

            // Optionnel : Reset à la semaine 1 pour la prochaine ouverture
            currentWeek = 1;
            updatePlanningDisplay();
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            currentWeek = 1;
            updatePlanningDisplay();
        }
    };
});

// OPEN MODAL
function openCourseModal(title, sem, year, desc) {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalCourseTitle');
    const modalDesc = document.getElementById('modalCourseDesc');

    if (modal && modalTitle && modalDesc) {
        modalTitle.textContent = title;
        modalDesc.textContent = `${year} - ${sem} | ${desc}`;

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}