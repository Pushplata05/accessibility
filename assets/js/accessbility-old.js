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

// Initial state
const initialState = {
  font: 28,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscaleValue: 0,
  lineheight: 1.5,
  backgroundColor: "white",
  fontColor: "black",
  fontFamily: "'Zilla Slab', serif",
};
let tempstate = initialState;

function showReadingMask() {
  const myDivTop = $(".accessibly-app-reading-mask-top");
  const myDivBottom = $(".accessibly-app-reading-mask-bottom");
  const readingMask = $(".accessibly-app-reading-mask");
  const windowHeight = $(window).height();

  // Unbind the previous event listener to avoid multiple bindings
  $(document).off("mousemove");

  if (menuObject.show_mask) {

    $(document).on("mousemove", function (e) {
      console.log(menuObject.show_mask);
      // Calculate the new top and bottom positions
      const newTop = e.clientY - myDivTop.height() - 30;
      const newBottom = windowHeight - e.clientY - 30;

      // Set the background color and z-index for the reading mask
      readingMask.css({
        "background-color": "rgba(0, 0, 0, 0.5)",
        "z-index": 100000000000000020000,
      });

      // Apply the new heights to the top and bottom parts of the reading mask
      myDivTop.css({
        top: newTop + "px",
        height: e.clientY + "px",
      });

      myDivBottom.css({
        height: newBottom + "px",
      });
    });
    $(".appreadingmask").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Remove-mask`);
  } else {
    $(".appreadingmask").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>App reading-mask`);
    myDivTop.css({ top: "0px", height: "0px" });
    myDivBottom.css({ height: "0px" });
    readingMask.css({ "z-index": -9999999 });
  }
}

// Function to update font style  s
function updateFontStyles() {
  $("body, h1, p").attr("style", `font-family: ${tempstate.fontfamily}; font-size: ${tempstate.font}px !important;`);
}
let clickCount = 0; // Tracks the number of button clicks
const maxClicks = 3; // Maximum number of increments or decrements
const fontChangeStep = 4; // Font size change step in pixels

$(".modal-btn1").on("click", function () {
  // Select all target tags excluding buttons inside .modal-body
  const targetTags = $("h1, h2, h4, p, span, button:not(.modal-dialog button)");

  targetTags.each(function () {
    // Get the current font size of the element
    const currentFontSize = parseInt($(this).css("font-size")) || 16; // Default font size to 16px if undefined

    if (clickCount < maxClicks) {
      // Increase font size
      $(this).css("font-size", `${currentFontSize + fontChangeStep}px`);
    } else {
      // Decrease font size
      $(this).css("font-size", `${currentFontSize - fontChangeStep}px`);
    }
  });

  // Update the click count
  clickCount++;
  if (clickCount === maxClicks * 2) {
    clickCount = 0; // Reset the cycle after 6 clicks
  }

  // Update button text based on the current state
  if (clickCount < maxClicks) {
    $(".modal-btn1").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Increase Font`);
  } else {
    $(".modal-btn1").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Decrease Font`);
  }
});



$(".removeanimation").on("click", function () {
  menuObject.hide_animation = !menuObject.hide_animation;

  if (menuObject.hide_animation) {
    $(".removeanimation").html(`Show Animation `);
    $('img').removeClass('animated');
    $("body, h1, p, div, header, section ").removeAttr("data-aos");
  } else {
    $(".removeanimation").html(`Hide Animation`);
    $('img').addClass('animated');
    // $("h1, p, div, header, section ").attr("data-aos", 'zoom-out');
  }
  updateFontStyles();
});
//   $(".removeanimation").on("click", function () {
//     menuObject.hide_animation = !menuObject.hide_animation;

//     if (menuObject.hide_animation) {
//         $(".removeanimation").html(`Show Animation `);
//         $('img').removeClass('animated');
//         $("body, h1, p, div, header, section ").removeAttr("data-aos");
//       } else {
//         $(".removeanimation").html(`Hide Animation`);
//         $('img').addClass('animated');
//         // $("h1, p, div, header, section ").attr("data-aos", 'zoom-out');
//       }
//     updateFontStyles();
//   });
// ------------------------------Currsor-btn-2-------- bigger_curso : true/ false-----------------------
$(".modal-btn2").on("click", function () {
  menuObject.bigger_cursor = !menuObject.bigger_cursor;
  if (menuObject.bigger_cursor) {
    $(".modal-btn2").text("Default cursor")
    $("body").css("cursor", "url('assets/img/cursor (1).png'), auto");
  } else {
    $(".modal-btn2").text("Bigger cursor")
    $("body").css("cursor", "auto");
  }
});
// ------------------------------modal-btn-3------ Images: true/false-------------------------
$(".modal-btn3").on("click", function () {
  menuObject.show_images = !menuObject.show_images;

  if (menuObject.show_images) {
    $(".modal-btn3").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Show Images`);
    
    $("img").each(function () {
      // Hide the image and replace it with alt text or a dummy description
      const altText = $(this).attr("alt") || "No description available";
      const placeholder = `<p style="font-size: 20px; margin: 0; border:1px solid black; padding:12px;">${altText}</p>`;
      $(this).hide().after(placeholder);
    });
  } else {
    $(".modal-btn3").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Hide Images`);
    
    $("img").each(function () {
      // Remove the placeholder text and show the image
      $(this).next("p").remove();
      $(this).show();
    });
  }
});


$(".reading-line").on("click", function () {
  $(".accessibility_line").css("display", "block");
  $(document).on("mousemove", function (e) {
    var scrollPosition = $(window).scrollTop();
    $(".accessibility_line").css("top", e.clientY + "px");
  });
});
$(".reading-line").on("click", function () {
  menuObject.show_line = !menuObject.show_line;

  if (menuObject.show_line) {
    // Show the reading line
    $(this).html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Reading Line`);
  } else {
    // Hide the reading line
    $(this).html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Remove Line`);
  }

  // Toggle the visibility of the accessibility_line
  $(".accessibility_line").toggle(menuObject.show_line);

  if (menuObject.show_line) {
    // Set up the reading line position on mousemove
    $(document).on("mousemove", function (e) {
      var scrollPosition = $(window).scrollTop();
      $(".accessibility_line").css("top", e.clientY + "px");
    });
  } else {
    // Unbind the mousemove event if line is removed
    $(document).off("mousemove");
  }
});
// -------------------------------changefont--------------------------------------

$(".changefont").on("click", function () {
  menuObject.show_changefont = !menuObject.show_changefont;

  if (menuObject.show_changefont) {
    // Change to normal font
    $(".changefont").html(`<iconify-icon icon="ion:image-sharp"></iconify-icon>Normal Font`);
    tempstate.fontfamily = "'Yuji Mai', serif";
    tempstate.font = 42;

    $("body, h1, p").attr("style", `font-family: ${tempstate.fontfamily}; font-size: ${tempstate.font}px !important;`);
  } else {
    // Change to dyslexic font
    $(".changefont").html(`<iconify-icon icon="fluent:line-horizontal-1-24-filled"></iconify-icon>Dyslexic Font`);
    console.log(initialState)
    $("body, h1, p").attr("style", `font-family: ${menuObject.initialState.fontfamily}; font-size: ${menuObject.initialState.font}px !important;`);
  }
});

// ---------------------------------change-fontend-------------
$(".brightness").on("click", function () {
  const maxBrightness = 200;  // Maximum brightness
  const minBrightness = 50;   // Minimum brightness

  if (tempstate.brightness === maxBrightness) {
    tempstate.brightness = minBrightness; // Reset to minimum brightness
    $(".brightness").html(`<iconify-icon icon="ion:sunny-outline"></iconify-icon>Increase Brightness`);
  } else {
    tempstate.brightness = maxBrightness; // Set to maximum brightness
    $(".brightness").html(`<iconify-icon icon="ion:sunny"></iconify-icon>Decrease Brightness`);
  }

  $("html").attr(
    "style",
    `filter: brightness(${tempstate.brightness}%) !important;`
  );
});

$(".lineheight").on("click", function () {
  tempstate.lineheight += 0.1;
  $("body").css("line-height", tempstate.lineheight);
});

$(".contrast").on("click", function () { tempstate.contrast += 50; $("html").css("filter", `contrast(${tempstate.contrast}%)`); });
$(".saturation").on("click", function () { tempstate.saturation += 50; $("html").css("filter", `saturate(${tempstate.saturation}%)`); });
$(".grayscale").on("click", function () { tempstate.grayscaleValue += 50; $("html").css("filter", `grayscale(${tempstate.grayscaleValue}%)`); });

$(document).ready(function () {
  $(".appreadingmask").on("click", function () {
    menuObject.show_mask = !menuObject.show_mask;
    showReadingMask()
  })
});

function resetChanges() {

  $(".modal-btn1").html(`Increase Font`);
  $(".modal-btn2").html(`Bigger Cursor`);
  $(".modal-btn3").html(`Hide-Images`);
  $(".reading-line").html(`Reading Line`);
  $(".changefont").html(`Dyslexic Font`);
  $(".brightness").html(`Brightness`);
  $(".contrast").html(`Contrast`);
  $(".saturation").html(`Saturation`);
  $(".grayscale").html(`Grayscale`);
  $(".appreadingmask").html(`App Reading Mask`);

  let initialState = {
    font: 28,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscaleValue: 0,
    lineheight: 1.5,
    backgroundColor: "white",
    fontColor: "black",
    fontFamily: "'Zilla Slab', serif",
  };
  console.log(initialState, tempstate)
  $("body").attr("style", `font-family: ${initialState.fontFamily}; font-size: ${initialState.font}px !important;`);
  $("h1").attr("style", `font-family: ${initialState.fontFamily}; font-size: ${initialState.font}px !important;`);
  $("p").attr("style", `font-family: ${initialState.fontFamily}; font-size: ${initialState.font}px !important;`);

  // Reset cursor
  menuObject.bigger_cursor = false;
  menuObject.show_images = false;
  menuObject.show_mask = false;
  showReadingMask()
  $(".accessibility_line").css("display", "none");
  $("body").css("cursor", "auto");
  $("img").attr("style", `display: inline-block !important;`);
  // Reset brightness, contrast, saturation, grayscale, line height
  $("html").css(
    "filter", 0
    `brightness(${initialState.brightness}%) contrast(${initialState.contrast}%) saturate(${initialState.saturation}%) grayscale(${initialState.grayscaleValue}%)`
  );
  $("body").css("line-height", initialState.lineheight);

  // Reset background and font color
  $("body").css("background-color", initialState.backgroundColor);
  $("body").css("color", initialState.fontColor);
  $("h1").css("color", initialState.fontColor);
  $("li").css("color", initialState.fontColor);
  $("p").attr("style", `color: ${initialState.fontColor};`);
}
$(".reset-btn").on("click", function () {
  resetChanges();
});


$(".invert").on("click", function () {
  menuObject.is_inverted = !menuObject.is_inverted;
  if (menuObject.is_inverted) {
    $(".invert").html(`Normal color`);
    let darkColor = "#000000"; // Change this to the dark color of your choice
    $("body").css("background-color", darkColor);
    $("body").css("color", darkColor); // Optional: change text color to contrast with background
    $("h1,h2,h3,h4,h5,h6").css("color", "#feb45d");
    // $("").css("color", "#feb45d");
    $("li").css("color", "#ffffff");
    $("p").attr("style", `color: #ffffff;`);
    $("a").attr("style", `color: #231c98;`);
  } else {
    $(".invert").html(`Invert`);
    let darkColor = "#fff"; // Change this to the dark color of your choice
    $("body").css("background-color", darkColor);
    $("body").css("color", darkColor); // Optional: change text color to contrast with background
    $("h1").css("color", "#000");
    $("li").css("color", "#000");
    $("p").attr("style", `color: #000;`);
  }

});




// --------------------------------------------------------------------

