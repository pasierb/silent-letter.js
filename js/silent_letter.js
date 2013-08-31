var SilentLetter = (function(){
  var wrap = function (text, tag, cssClass) {
    return "<"+tag+" class=\""+cssClass+"\">"+text+"</"+tag+">";
  };

  var api = {
    set: function(option, value){
      this.options[option] = value;
      return this;
    },
    reveal: function(){
      var msg = this.options.message;
      var temp = this.options.container.innerHTML;
      var lastIndex = -1;
      var i, regexp, letter, matched;

      for(i = 0; i < msg.length; i++){
        if(msg[i].match(/\s/)) continue;
        regexp = new RegExp(msg[i], "g");

        do { matched = regexp.test(temp); }
        while(matched && regexp.lastIndex < lastIndex);

        if(!matched) return;

        lastIndex = regexp.lastIndex;

        temp = temp.slice(0,lastIndex-1)+wrap(temp[lastIndex-1], this.options.tag, this.options.cssClass)+temp.slice(lastIndex);
        lastIndex += (this.options.tag.length * 2) + this.options.cssClass.length + 14;
      }

      this.options.container.innerHTML = temp;
      this.options.container.className += "silent-letter-envelope";

      return this;
    }
  };

  var constructor = function(options){
    this.options = (options || {});
    this.options.tag || (this.options.tag = "span");
    this.options.cssClass || (this.options.cssClass = "silent-letter");

    return this;
  };

  constructor.prototype = api;

  return constructor;
})();
