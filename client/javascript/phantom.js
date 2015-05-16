/*var slice = [].slice;

if (Meteor.isClient && /PhantomJS/.test(window.navigator.userAgent)) {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function() {
      var args, oThis;
      oThis = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return _.bind.apply(_, [this, oThis].concat(slice.call(args)));
    };
  }
}*/

if(Meteor.isClient) {
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
          // closest thing possible to the ECMAScript 5
          // internal IsCallable function
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
              return fToBind.apply(this instanceof fNOP
                     ? this
                     : oThis,
                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }
}
