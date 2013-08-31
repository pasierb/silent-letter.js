describe("SilentLetter", function(){
  var silentLetter;
  var textContainer;
  var text;
  var silentMessage;

  beforeEach(function(){
    textContainer = document.createElement("div");
    silentMessage = "silly";
    text = "adssasiasdlasdlsadsdy";
    textContainer.innerHTML = text;
    document.body.appendChild(textContainer);

    silentLetter = new SilentLetter({
      container: textContainer
    });
  });

  afterEach(function(){
    document.body.removeChild(textContainer);
  });

  describe("set", function(){
    it("should set an option", function(){
      expect(undefined).toEqual(silentLetter.options.message);
      silentLetter.set("message", "silly");
      expect("silly").toEqual(silentLetter.options.message);
    });
  });

  describe("mark", function(){
    describe("single letter", function () {
      beforeEach(function(){
        silentLetter.set("message", "s");
      });

      it("should perform markup", function(){
        silentLetter.reveal();
        expect(textContainer.innerHTML).toEqual("ad<span class=\"silent-letter\">s</span>sasiasdlasdlsadsdy");
      });
    });

    describe("single word", function () {
      beforeEach(function(){
        silentLetter.set("message", "silly");
      });

      it("should perform markup", function(){
        silentLetter.reveal();
        expect(textContainer.innerHTML).toEqual("ad<span class=\"silent-letter\">s</span>sas<span class=\"silent-letter\">i</span>asd<span class=\"silent-letter\">l</span>asd<span class=\"silent-letter\">l</span>sadsd<span class=\"silent-letter\">y</span>");
      });
    });

    describe("multiple words", function () {
      beforeEach(function(){
        textContainer.innerHTML = "mweaf dsm asdn"
        silentLetter.set("message", "mad man");
      });

      it("should perform markup", function(){
        silentLetter.reveal();
        expect(textContainer.innerHTML).toEqual("<span class=\"silent-letter\">m</span>we<span class=\"silent-letter\">a</span>f <span class=\"silent-letter\">d</span>s<span class=\"silent-letter\">m</span> <span class=\"silent-letter\">a</span>sd<span class=\"silent-letter\">n</span>");
      });
    });

    describe("unmarkable message", function(){
      beforeEach(function(){
        silentLetter.set("message", "zero");
      });

      it("should fail gracefully", function(){
        silentLetter.reveal();
        expect(textContainer.innerHTML).toEqual(textContainer.innerHTML);
      });
    });
  });
});
