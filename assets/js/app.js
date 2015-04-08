function MenuSlide(el) {
    this.el = el;
    this.container = $(this.el).parent();
    this.init();
    this.svgElem = new Snap(this.el);
    this.svgPath = "Hey Buddy";
    this.animating = false;
    this.visible = false;
    this.playHead = new TimelineMax({paused: true, yoyo: true, onReverseComplete: self.animateSVGOut});
    var elems = this.container.find("li");
    //(new TimelineMax()).set(this.container, {display: 'none'});
    this.playHead.set(this.container, {display: "block"} );
    this.playHead.staggerFrom(elems, 4, {yPercent: "10%", delay: 1, color: "#FFF", autoAlpha: 0, force3D: true, ease:mina.easeOutExpo}, 0.1, -0.1);

    //console.log(this.svgPath);
    //this.svgPath.animate({transform: 's100,100', fill: blue})

    this.paths = {
        bulge: 'M841.9,595.3H50c0,0-50-66.3-50-324C0,56.8,50,0,50,0h791.9V595.3',
        repress: 'M841.9,595.3H0c0,0,30-66.3,30-324C30,56.8,0,0,0,0h841.9V595.3z',
        flat: 'M841.9,595.3H0c0,0,0-66.3,0-324C0,56.8,0,0,0,0h841.9V595.3z'
    };
}

MenuSlide.prototype.loadSVG = function() {
    self = this;

    // Load SVG from file
    Snap.load("/assets/img/menu-bg.svg", function(f) {
        self.svgElem.append(f);
        self.svgPath = self.svgElem.select("path");
        self.svgPath.attr({transform: 'S0,1,2000,0'});        
    });
};

MenuSlide.prototype.open = function() {
    if (this.animating === false) {
        this.animating = true;

        if (this.visible === false) {
            this.playHead.timeScale(1);
            this.playHead.play();
            this.animateSVGIn();
        }
    }
};

MenuSlide.prototype.animateSVGIn = function(){
    self.svgPath.stop().animate({d: self.paths.bulge, transform: 'S1,1,0,0'}, 1000, mina.easeInOutExpo, function(){
        self.svgPath.stop().animate({d: self.paths.flat}, 500, mina.easeOutElastic, function(){
            self.visible = true;
            self.animating = false;
          });
    });
};

MenuSlide.prototype.animateSVGOut = function() {
    self.svgPath.stop().attr({d:self.paths.repress});
    self.svgPath.stop().animate({transform: 'S0,1,2000,0'}, 600, mina.easeOutQuad);
};

MenuSlide.prototype.close = function() {
    this.playHead.timeScale(4);
    this.playHead.reverse();
    this.visible = false;
};


MenuSlide.prototype.init = function() {
    this.loadSVG();
};

MenuSlide.prototype.isAnimating = function() {
    return this.animating;
};

MenuSlide.prototype.isVisible = function() {
    return this.visible;
};

$(function(){
    var m, $navIcon, $nav;

    m = new MenuSlide(".svg");


    // Navigation Indicator State. Chagnes to close button and back to hamburger menu when toggled.
    $navIcon = $('.nav-icon');
        
    $navIcon.on('click', function(){
       $(this).toggleClass('open');
       if (!m.isAnimating() && !m.isVisible()) {
            m.open();
            console.log(m.animating);
            console.log(m.visible);
       }
       if (!m.isAnimating() && m.isVisible()) {
            m.close();
            console.log(m.animating);
            console.log(m.visible);
       }

    });


    $("[data-customScroll='").mCustomScrollbar({
        scrollInertia: 300,
        autoHideScrollbar: true,
        contentTouchScroll: 25
    });

    /*var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
        duration: 10000,
        offset: 200
    })
    .setTween(".hp-section", {backgroundColor: "blue", scale: 0.7})
    .addTo(controller);*/

    if ($(".gallery").length > 0) {
        $(".gallery").royalSlider({
            fullscreen: {
                  enabled: true,
                  nativeFS: true
                },
            keyboardNavEnabled: true,
            autoScaleSlider: true, 
            autoScaleSliderWidth: 1300,     
            autoScaleSliderHeight: 600,
            imageScaleMode: 'fit',
            numImagesToPreload:6,
            imageAlignCenter: true,
            imageScalePadding: 0,
            controlNavigation: 'thumbnails',
            fadeinLoadedSlide: true,
            autoHeight: false,
            globalCaption: true,

            thumbs: {
                spacing: 5,
                //arrowsAutoHide: true
                fitInViewport: false,
                paddingBottom: 4,
                appendSpan: true,
                firstMargin: true,
            }
        });
    }
});