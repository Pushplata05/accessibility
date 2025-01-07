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
    // grayscaleValue: 0,
    lineheight: 1.5,
    backgroundColor: "white",
    // fontColor: "white",
    fontFamily: "'Poppins', sans-serif",
  }
};

let tempstate = { ...menuObject.initialState };

function toggleReadingMask(show = true) {
  menuObject.show_mask = show;
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

// Toggle font size
function toggleFontSize(increase = true) {
  const targetTags = $("h1, h2, h4, p, span, button:not( .modal-btn, .reset-btn, .btn-secondary, .btn-close)");
  const fontChangeStep = 4;
  targetTags.each(function () {
    const currentFontSize = parseInt($(this).css("font-size")) || 16;

    if (currentFontSize > 52 && increase) {
      return;
    }
    if (currentFontSize <= 18 && !increase) {
      return;
    }
    if (increase) {
      $(this).css("font-size", `${currentFontSize + fontChangeStep}px`);
    } else {
      $(this).css("font-size", `${currentFontSize - fontChangeStep}px`);
    }
  });
}

function toggleAnimation(show = true) {
  menuObject.hide_animation = !show;

  if (menuObject.hide_animation) {
    // $(".removeanimation").html(`Show Animation`);
    $('img').removeClass('animated');
    $("body, h1, p, div, header, section").removeAttr("data-aos");
  } else {
    // $(".removeanimation").html(`Hide Animation`);
    $('img').addClass('animated');
  }
}

function toggleCursor(show = true) {
  menuObject.bigger_cursor = show;
  if (menuObject.bigger_cursor) {
    // $(".modal-btn2").text("Default Cursor");
    $("body").css("cursor", "url('assets/img/cursor (1).png'), auto");
  } else {
    // $(".modal-btn2").text("Bigger Cursor");
    $("body").css("cursor", "auto");
  }
}

$(".modal-btn2").on("click", function () {
  toggleCursor(!menuObject.bigger_cursor);
});

function toggleImages(show = true) {
  menuObject.show_images = show;

  if (menuObject.show_images) {
    $(".modal-btn3").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Show Images`);
    $("img").each(function () {
      const altText = $(this).attr("alt");
      $(this).hide().after(`<span class="image-alt-text">${altText}</span>`);
    });
  } else {
    $(".modal-btn3").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Hide Images`);
    $("img").show();
    $(".image-alt-text").remove();
  }
}

$(".modal-btn3").on("click", function () {
  toggleImages(!menuObject.show_images);
});


function toggleReadingLine(show = true) {
  menuObject.show_line = show;

  if (menuObject.show_line) {
    $(".reading-line").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Remove Line`);
    $(".accessibility_line").css("display", "block");
    $(document).on("mousemove", function (e) {
      var scrollPosition = $(window).scrollTop();
      $(".accessibility_line").css("top", e.clientY + scrollPosition + "px");
    });
  } else {
    $(".reading-line").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Reading-line`);
    $(".accessibility_line").css("display", "none");
    $(document).off("mousemove");
  }
}

$(".reading-line").on("click", function () {
  toggleReadingLine(!menuObject.show_line);
});

function toggleFontChange(fontFamily = "'Yuji Mai', serif", fontSize = 42) {
  menuObject.show_changefont = !menuObject.show_changefont;

  if (menuObject.show_changefont) {
    $(".changefont").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Normal Font`);
    tempstate.fontFamily = fontFamily;
    tempstate.font = fontSize;
  } else {
    $(".changefont").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Dyslexic Font`);
    tempstate = { ...menuObject.initialState };
  }
  updateFontStyles();
}

$(".changefont").on("click", function () {
  toggleFontChange();
});

function toggleInvertColors(invert = true) {
  menuObject.is_inverted = invert;
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
}

$(".invert").on("click", function () {
  toggleInvertColors(!menuObject.is_inverted);
});

function resetChanges(removeToggles = true) {
  tempstate = { ...menuObject.initialState };

  $("body").attr("style", `font-family: ${tempstate.fontFamily}; `);
  $("h1, p").attr("style", `font-family: ${tempstate.fontFamily}; `);

  menuObject.bigger_cursor = false;
  menuObject.show_images = false;
  menuObject.show_mask = false;
  menuObject.show_line = false;
  menuObject.show_changefont = false;
  menuObject.is_inverted = false;
  menuObject.hide_animation = false;
  
  toggleReadingMask(false);
  $(".accessibility_line").css("display", "none");
  $("body").css("cursor", "auto");
  $("img").show();

  $(".toggle-switch").prop("checked", false);

  $("html").css("filter", `brightness(100%)`);
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

  $(".reset-btn").on("click", function () {
    resetChanges();
  });
});

function toggleBrightness(increase = true) {
  const brightnessStep = 20;
  // $(".brightness").on("click", function () {
    if (increase) {
      $("html").css("filter", `brightness(120%)`);
    } else {
      $("html").css("filter", `brightness(100%)`);
    }
    
}
 

function toggleLineHeight(increase = true) {
  const lineHeightStep = 0.1;
  if (increase) {
    tempstate.lineheight += lineHeightStep;
  } else {
    tempstate.lineheight -= lineHeightStep;
  }
  $("body").css("line-height", tempstate.lineheight);
}

function toggleContrast(increase = true) {
  const contrastStep = 20;
  if (increase) {
    tempstate.contrast += contrastStep;
  } else {
    tempstate.contrast -= contrastStep;
  }
  $("html").css("filter", `contrast(${tempstate.contrast}%)`);
}

function toggleSaturation(increase = true) {
  const saturationStep = 20;
  if (increase) {
    tempstate.saturation += saturationStep;
  } else {
    tempstate.saturation -= saturationStep;
  }
  $("html").css("filter", `saturate(${tempstate.saturation}%)`);
}

function toggleGrayscale(shouldShow) {
  if (shouldShow) {
    tempstate.grayscaleValue = 100;
    $(".grayscale").html("Decrease Grayscale");
    $("#elementToToggle").show(); // Show the element
  } else {
    tempstate.grayscaleValue = 0;
    $(".grayscale").html("Increase Grayscale");
    $("#elementToToggle").hide(); // Hide the element
  }
  $("html").css("filter", `grayscale(${tempstate.grayscaleValue}%)`);
}



toggleBrightness();
toggleLineHeight();
toggleContrast();
toggleSaturation();
toggleGrayscale();