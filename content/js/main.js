$(function() {
    //Content Height Fixer
    var headerHeight = $('header').innerHeight(),
        footerHeight = $('footer').innerHeight(),
        contentHeight = $('article.content').innerHeight(),
        windowHeight = $(window).innerHeight(),
        totalHeight = headerHeight + footerHeight + contentHeight;
    if (totalHeight < windowHeight) {
        $('article.content').css('min-height', windowHeight - totalHeight + contentHeight);
    }
    //Background-changer
    switch (Math.floor(Math.random() * 4 + 1)) {
        case 1:
            {
                $("header").addClass("bg-1");
                break;
            }
        case 2:
            {
                $("header").addClass("bg-2");
                break;
            }
        case 3:
            {
                $("header").addClass("bg-3");
                break;
            }
        case 4:
            {
                $("header").addClass("bg-4");
                break;
            }
        default:
            break;
    }

    var hash = window.location.hash;
    if (hash === "#thank-you")
        $("#thank-you").css("display", "block");
    if (hash === "#problem-sending-mail")
        $("#problem-sending-mail").css("display", "block");
});

//RECAPTCHA
var onloadCallback = function() {
    grecaptcha.render('g-recaptcha', {
        'sitekey': '6LfEaAsTAAAAAFK2izJ7c6Y7PhVxrXRaFhkvObwJ',
        'size': 'normal',
        'type': 'image',
        'theme': 'light'
    });
};

//Google Analytics
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-66405292-1', 'auto');
ga('send', 'pageview');


//Yandex Metrica
(function(d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter32003111 = new Ya.Metrika({
                id: 32003111,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
        } catch (e) {}
    });
    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function() {
            n.parentNode.insertBefore(s, n);
        };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";
    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "yandex_metrika_callbacks");


// HEADER 3JS
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, document.getElementsByTagName("header")[0].offsetWidth / document.getElementsByTagName("header")[0].offsetHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({
    alpha: true
});
camera.position.z = 500;
controls = new THREE.TrackballControls(camera, document.getElementsByTagName("header")[0]);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [65, 83, 68];
controls.addEventListener('change', render);
renderer.setSize(document.getElementsByTagName("header")[0].offsetWidth, document.getElementsByTagName("header")[0].offsetHeight);
document.getElementById("headerCanvasYo").appendChild(renderer.domElement);
var color = new THREE.Color("rgba(255,0,0,50%)");
switch (Math.floor(Math.random() * 5 + 1)) {
    case 1:
        {
            var geometry = new THREE.BoxGeometry(200, 200, 200, 10, 10, 10);
            camera.position.y = -50;
            camera.position.z = 50;
            controls.maxDistance = 500;
            break;
        }
    case 2:
        {
            var geometry = new THREE.SphereGeometry(5, 32, 32);
            camera.position.x = 0;
            camera.position.y = -5;
            camera.position.z = 0;
            controls.maxDistance = 20;
            break;
        }
    case 3:
        {

            var geometry = new THREE.TorusKnotGeometry(10, 3, 100, 5);
            camera.position.x = 0;
            camera.position.y = -24;
            camera.position.z = 0;
            controls.maxDistance = 50;
            break;
        }
    case 4:
        {
            var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = -5;
            controls.maxDistance = 50;
            break;

        }
    case 5:
        {
            var geometry = new THREE.BoxGeometry(200, 100, 50, 10, 10, 10);
            camera.position.x = 0;
            camera.position.y = -30;
            camera.position.z = 30;
            controls.maxDistance = 140;
            break;
        }
    default:
        break;
}
var material = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true
});
var obj = new THREE.Mesh(geometry, material);
scene.add(obj);
var incZ = true;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    obj.rotation.x -= 0.002;
    obj.rotation.y -= 0.002;
    controls.update();
}
render();
animate();
