var menuObject = {
  bigger_cursor: false,
  show_images: false,
  show_mask: false,
  show_line: false,
  show_changefont: false,
  increase_font: false,
  decrease_font: false,
  is_inverted: false,
  hide_animation: false,
  initialState: {
    font: 28,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscaleValue: 0,
    lineheight: 1.5,
    backgroundColor: "white",
    fontColor: "black",
    fontFamily: "'Zilla Slab', serif",
  }
};

let tempstate = { ...menuObject.initialState };

function toggleReadingMask() {
  const myDivTop = $(".accessibly-app-reading-mask-top");
  const myDivBottom = $(".accessibly-app-reading-mask-bottom");
  const readingMask = $(".accessibly-app-reading-mask");
  const windowHeight = $(window).height();

  $(document).off("mousemove");

  if (menuObject.show_mask) {
    $(document).on("mousemove", function (e) {
      const newTop = e.clientY - myDivTop.height() - 30;
      const newBottom = windowHeight - e.clientY - 30;

      readingMask.css({
        "background-color": "rgba(0, 0, 0, 0.5)",
        "z-index": 100000000000000020000,
      });

      myDivTop.css({
        top: newTop + "px",
        height: e.clientY + "px",
      });

      myDivBottom.css({
        height: newBottom + "px",
      });
    });
    $(".appreadingmask").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Remove Mask`);
  } else {
    $(".appreadingmask").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>App Reading Mask`);
    myDivTop.css({ top: "0px", height: "0px" });
    myDivBottom.css({ height: "0px" });
    readingMask.css({ "z-index": -9999999 });
  }
}

function updateFontStyles() {
  $("body, h1, p").attr("style", `font-family: ${tempstate.fontFamily}; font-size: ${tempstate.font}px !important;`);
}

function toggleFontSize() {
  const targetTags = $("h1, h2, h4, p, span, button:not(.modal-dialog button)");
  const fontChangeStep = 4;
  const maxClicks = 3;
  let clickCount = 0;

  $(".modal-btn1").on("click", function () {
    targetTags.each(function () {
      const currentFontSize = parseInt($(this).css("font-size")) || 16;

      if (clickCount < maxClicks) {
        $(this).css("font-size", `${currentFontSize + fontChangeStep}px`);
      } else {
        $(this).css("font-size", `${currentFontSize - fontChangeStep}px`);
      }
    });

    clickCount++;
    if (clickCount === maxClicks * 2) {
      clickCount = 0;
    }

    if (clickCount < maxClicks) {
      $(".modal-btn1").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Increase Font`);
    } else {
      $(".modal-btn1").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Decrease Font`);
    }
  });
}

function toggleAnimation() {
  $(".removeanimation").on("click", function () {
    menuObject.hide_animation = !menuObject.hide_animation;

    if (menuObject.hide_animation) {
      $(".removeanimation").html(`Show Animation`);
      $('img').removeClass('animated');
      $("body, h1, p, div, header, section").removeAttr("data-aos");
    } else {
      $(".removeanimation").html(`Hide Animation`);
      $('img').addClass('animated');
    }
    updateFontStyles();
  });
}

function toggleCursor() {
  $(".modal-btn2").on("click", function () {
    menuObject.bigger_cursor = !menuObject.bigger_cursor;
    if (menuObject.bigger_cursor) {
      $(".modal-btn2").text("Default Cursor");
      $("body").css("cursor", "url('assets/img/cursor (1).png'), auto");
    } else {
      $(".modal-btn2").text("Bigger Cursor");
      $("body").css("cursor", "auto");
    }
  });
}

function toggleImages() {
  $(".modal-btn3").on("click", function () {
    menuObject.show_images = !menuObject.show_images;

    if (menuObject.show_images) {
      $(".modal-btn3").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Show Images`);
      $("img").each(function () {
        const altText = $(this).attr("alt") || "No description available";
        const placeholder = `<p style="font-size: 20px; margin: 0; border:1px solid black; padding:12px;">${altText}</p>`;
        $(this).hide().after(placeholder);
      });
    } else {
      $(".modal-btn3").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Hide Images`);
      $("img").each(function () {
        $(this).next("p").remove();
        $(this).show();
      });
    }
  });
}


function toggleReadingLine() {
  $(".reading-line").on("click", function () {
    menuObject.show_line = !menuObject.show_line;

    if (menuObject.show_line) {
      $(this).html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Remove Line`);
      $(".accessibility_line").css("display", "block");
      $(document).on("mousemove", function (e) {
        var scrollPosition = $(window).scrollTop();
        $(".accessibility_line").css("top", e.clientY + scrollPosition + "px");
      });
    } else {
      $(this).html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Reading-line`);
      $(".accessibility_line").css("display", "none");
      $(document).off("mousemove");
    }
  });
}

function toggleFontChange() {
  $(".changefont").on("click", function () {
    menuObject.show_changefont = !menuObject.show_changefont;

    if (menuObject.show_changefont) {
      $(".changefont").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Normal Font`);
      tempstate.fontFamily = "'Yuji Mai', serif";
      tempstate.font = 42;
    } else {
      $(".changefont").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Dyslexic Font`);
      tempstate = { ...menuObject.initialState };
    }
    updateFontStyles();
  });
}

function toggleInvertColors() {
  $(".invert").on("click", function () {
    menuObject.is_inverted = !menuObject.is_inverted;
    if (menuObject.is_inverted) {
      $(".invert").html(`Normal Color`);
      $("body").css("background-color", "#000000");
      $("body").css("color", "#ffffff");
      $("h1, h2, h3, h4, h5, h6").css("color", "#feb45d");
      $("li").css("color", "#ffffff");
      $("p").css("color", "#ffffff");
      $("a").css("color", "#231c98");
    } else {
      $(".invert").html(`Invert`);
      $("body").css("background-color", "#ffffff");
      $("body").css("color", "#000000");
      $("h1, h2, h3, h4, h5, h6").css("color", "#000000");
      $("li").css("color", "#000000");
      $("p").css("color", "#000000");
    }
  });
}

function resetChanges() {
  $(".modal-btn1").html(`Increase Font`);
  $(".modal-btn2").html(`Bigger Cursor`);
  $(".modal-btn3").html(`Hide Images`);
  $(".reading-line").html(`Reading Line`);
  $(".changefont").html(`Dyslexic Font`);
  $(".brightness").html(`Brightness`);
  $(".contrast").html(`Contrast`);
  $(".saturation").html(`Saturation`);
  $(".grayscale").html(`Grayscale`);
  $(".appreadingmask").html(`App Reading Mask`);

  tempstate = { ...menuObject.initialState };

  $("body").attr("style", `font-family: ${tempstate.fontFamily}; font-size: ${tempstate.font}px !important;`);
  $("h1, p").attr("style", `font-family: ${tempstate.fontFamily}; font-size: ${tempstate.font}px !important;`);

  menuObject.bigger_cursor = false;
  menuObject.show_images = false;
  menuObject.show_mask = false;
  menuObject.show_line = false;
  menuObject.show_changefont = false;
  menuObject.is_inverted = false;
  menuObject.hide_animation = false;

  toggleReadingMask();
  $(".accessibility_line").css("display", "none");
  $("body").css("cursor", "auto");
  $("img").show();

  $("html").css("filter", `brightness(${tempstate.brightness}%) contrast(${tempstate.contrast}%) saturate(${tempstate.saturation}%) grayscale(${tempstate.grayscaleValue}%)`);
  $("body").css("line-height", tempstate.lineheight);
  $("body").css("background-color", tempstate.backgroundColor);
  $("body").css("color", tempstate.fontColor);
  $("h1, li, p").css("color", tempstate.fontColor);
}

$(document).ready(function () {
  $(".appreadingmask").on("click", function () {
    menuObject.show_mask = !menuObject.show_mask;
    toggleReadingMask();
  });

  toggleFontSize();
  toggleAnimation();
  toggleCursor();
  toggleImages();
  // toggleReadingLine(); // Duplicate call removed
  toggleFontChange();
  toggleInvertColors();
  toggleReadingLine();

  $(".reset-btn").on("click", function () {
    resetChanges();
  });
});

function toggleBrightness() {
  $(".brightness").on("click", function () {
    if (tempstate.brightness === menuObject.initialState.brightness) {
      tempstate.brightness += 50;
      $(".brightness").html(`Decrease Brightness`);
    } else {
      tempstate.brightness = menuObject.initialState.brightness;
      $(".brightness").html(`Increase Brightness`);
    }
    $("html").css("filter", `brightness(${tempstate.brightness}%)`);
  });
}

function toggleLineHeight() {
  $(".lineheight").on("click", function () {
    if (tempstate.lineheight === menuObject.initialState.lineheight) {
      tempstate.lineheight += 0.1;
      $(".lineheight").html(`Decrease Line Height`);
    } else {
      tempstate.lineheight = menuObject.initialState.lineheight;
      $(".lineheight").html(`Increase Line Height`);
    }
    $("body").css("line-height", tempstate.lineheight);
  });
}

function toggleContrast() {
  $(".contrast").on("click", function () {
    if (tempstate.contrast === menuObject.initialState.contrast) {
      tempstate.contrast += 50;
      $(".contrast").html(`Decrease Contrast`);
    } else {
      tempstate.contrast = menuObject.initialState.contrast;
      $(".contrast").html(`Increase Contrast`);
    }
    $("html").css("filter", `contrast(${tempstate.contrast}%)`);
  });
}

function toggleSaturation() {
  $(".saturation").on("click", function () {
    if (tempstate.saturation === menuObject.initialState.saturation) {
      tempstate.saturation += 50;
      $(".saturation").html(`Decrease Saturation`);
    } else {
      tempstate.saturation = menuObject.initialState.saturation;
      $(".saturation").html(`Increase Saturation`);
    }
    $("html").css("filter", `saturate(${tempstate.saturation}%)`);
  });
}

function toggleGrayscale() {
  $(".grayscale").on("click", function () {
    if (tempstate.grayscaleValue === menuObject.initialState.grayscaleValue) {
      tempstate.grayscaleValue += 50;
      $(".grayscale").html(`Decrease Grayscale`);
    } else {
      tempstate.grayscaleValue = menuObject.initialState.grayscaleValue;
      $(".grayscale").html(`Increase Grayscale`);
    }
    $("html").css("filter", `grayscale(${tempstate.grayscaleValue}%)`);
  });
}

toggleBrightness();
toggleLineHeight();
toggleContrast();
toggleSaturation();
toggleGrayscale();