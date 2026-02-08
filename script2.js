window.addEventListener("load", (event) => {
    const tail_flip_speed = 2;
    const tail_flip_refresh_rate = 10;
    var tail_spin_interval_id = null;

    document.querySelectorAll('[data-far]').forEach((far_element) => {
        let far = parseFloat(far_element.dataset.far);
        far_element.style.zIndex = far * 100;
    })

    function updatePositionOfAllTailSpin(left = false) {
        document.querySelectorAll('[data-js="tail_flip"][data-rotate][data-speed]').forEach((tail_flip) => {
            let rotate = parseFloat(tail_flip.dataset.rotate);
            let speed = parseFloat(tail_flip.dataset.speed);

            let rotateAmount = tail_flip_speed * speed;

            if (left) rotate -= rotateAmount;
            else rotate += rotateAmount;

            tail_flip.dataset.rotate = rotate;

            if (tail_flip.dataset.seed == "154784") {
                tail_flip.style.transform = "rotate(" + rotate + "deg)";
            } else {
                tail_flip.style.transform = "translate(-50%, -100%) rotate(" + rotate + "deg)";
            }

        })
    }

    updatePositionOfAllTailSpin(); //One time to first set item pos

    var right_rotate_box = document.querySelector('.pikachu');
    var left_rotate_box = document.querySelector('.snowbull');

    if (right_rotate_box) {

        if (tail_spin_interval_id) {
            clearInterval(tail_spin_interval_id);
            tail_spin_interval_id = null;
        }

        let intervalId = setInterval(() => {
            updatePositionOfAllTailSpin(false);
        }, tail_flip_refresh_rate);

        tail_spin_interval_id = intervalId;

    }


    /*************************/
    /* kecha_wacha js */

    var kecha_wacha = document.querySelector(".kecha_wacha");
    var oldX = 0, oldY = 0, oldMirror = false;

    if (kecha_wacha) {
        document.addEventListener("mousemove", function (e) {
            let clientX = e.clientX;
            let clientY = e.clientY;

            let movingvertical = Math.abs(e.pageY - oldY) > 5;
            let movinghorizontal = Math.abs(e.pageX - oldX) > 5;

            let mirror = movinghorizontal ? e.pageX < oldX : oldMirror

            let angleDeg = movinghorizontal ? 45 : 90;
            let angle = movingvertical ? angleDeg : 0

            if (e.pageY > oldY) angle = angle * -1;
            if (!mirror) angle = angle * -1;

            oldMirror = mirror;
            mirror = mirror ? '' : 'scale(-1, 1)';

            /* console.log(`translate(calc(${clientX}px), calc(${clientY}px)), rotate(${angle}deg)`, kecha_wacha) */

            kecha_wacha.style.top = `${clientY}px`;
            kecha_wacha.style.left = `${clientX}px`;
            kecha_wacha.style.transform = `translate(-50%, -50%) rotate(${angle}deg) ${mirror}`;

            oldX = e.pageX;
            oldY = e.pageY;
        });
    }

    function generateStars() {
        const galaxy = document.querySelector(".galaxy");
        const galaxyWidth = galaxy.clientWidth;
        const galaxyHeight = galaxy.clientHeight;
        let iterator = 0;

        while (iterator <= 50) {
            const xPosition = Math.random() * galaxyWidth;
            const yPosition = Math.random() * galaxyHeight;
            const starType = Math.floor(Math.random() * 3) + 1;

            const star = document.createElement("div");
            star.classList.add("star", `star-type${starType}`);
            star.style.top = `${yPosition}px`;
            star.style.left = `${xPosition}px`;

            galaxy.appendChild(star);
            iterator++;
        }
    }

    generateStars();

    function boombox() {

        document.querySelector("body").addEventListener('click', (e) => {

            if (e.target.classList.contains('planet')) {
                e.target.style.backgroundImage = "url('../200w.gif')";
                setTimeout(() => {
                    e.target.closest(".rathian").style.display = "none";
                }, "1000");


            }

            let boombox = e.target.closest('img');
            if (!boombox) boombox = e.target.querySelector('img');

            if (boombox) {

                boombox.src = "200w.gif";
                boombox.style.transform = 'scale(15)';
                setTimeout(() => {
                    boombox.src = "";
                    e.target.closest(".rathian").style.display = "none";
                    boombox.style.transform = 'scale(1)';
                }, "1000");
            }
        });
    }

    boombox();



    /*************************/
    /* wavy text*/
    /* https://codepen.io/sam959/pen/LYojLBm */
    function applyToEveryLetter(effect, id) {
        let delay = 200;

        document.querySelectorAll('.' + id).forEach((h1) => {
            h1.innerHTML = h1.innerHTML
                .split("")
                .map((letter) => {
                    console.log(letter);
                    return `<span>` + letter + `</span>`;
                })
                .join("");

            Array.from(h1.children).forEach((span, index) => {
                setTimeout(() => {
                    span.classList.add(effect);
                }, index * 60 + delay);
            });
        });


    }

    applyToEveryLetter("selta", "reine_selta");


});