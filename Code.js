/**
 * Create a open linter menu item.
 * @param {Event} event The open event.
 */
function onOpen(event) {
  SlidesApp.getUi()
    .createAddonMenu()
    .addItem("Open Linter", "showSidebar")
    .addToUi();
}

/**
 * Open the Add-on upon install.
 * @param {Event} event The install event.
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile("sidebar").setTitle(
    "Slide Linter"
  );
  SlidesApp.getUi().showSidebar(ui);
}

function longTitle() {
  var selection = SlidesApp.getActivePresentation().getSelection();
  var currentPage = selection.getCurrentPage();
  var slide = currentPage.asSlide();
  var placeholder = slide.getPlaceholder(
    SlidesApp.PlaceholderType.CENTERED_TITLE
  );
  var shape = placeholder.asShape();
  var text = shape.getText();

  Logger.log("Selected text " + text.asString());

  var messages = [];
  var rawText = text.asString();
  if (rawText.length > 45) {
    messages.push("Title too long");
  }

  var imageMsg = tooManyPics();
  for(var i = 0; i < imageMsg.length; i++)
    messages.push(imageMsg[i]);
  return messages;
}

function tooManyPics(){

    var selection = SlidesApp.getActivePresentation().getSelection();
    var currentPage = selection.getCurrentPage();
    var images = currentPage.getImages();

    var messages = [];

    if (images.length > 4){
      messages.push("There are too many pictures on this slide.");
    }

    return messages;
}
