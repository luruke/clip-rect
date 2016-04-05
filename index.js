(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ClipRect = factory();
  }
}(this, function () {
  var ClipRect = function(el, obj) {
    if (typeof TweenLite === 'undefiend') {
      return console.error('need GSAP to work.');
    }

    this.el = el;
    this.vars = this.extend({
      duration: 0.4,
      ease: TweenLite.defaultEase,
      from: ClipRect.RIGHT,
      to: ClipRect.LEFT,
      clearProps: true,
      reverse: false
    }, obj);

    this.isStarted = false;

    return this.tween();
  };

  ClipRect.TOP = 1;
  ClipRect.RIGHT = 2;
  ClipRect.BOTTOM = 3;
  ClipRect.LEFT = 4;

  ClipRect.prototype.extend = function(a, b) {
    for(var key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  };

  ClipRect.prototype.getSize = function() {
    return this.el.getBoundingClientRect();
  };

  ClipRect.prototype.getRect = function(end) {
    end = end || false;

    if (this.vars.reverse) {
      end = !end;
    }

    var c = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

    var s = this.getSize();

    if (this.vars.from === ClipRect.TOP && this.vars.to === ClipRect.BOTTOM) {
      c.right = s.width;

      if (end) {
        c.bottom = s.height;
      }
    }

    if (this.vars.from === ClipRect.BOTTOM && this.vars.to === ClipRect.TOP) {
      c.top = s.height;
      c.right = s.width;
      c.bottom = s.height;

      if (end) {
        c.top = 0;
      }
    }

    if (this.vars.from === ClipRect.RIGHT && this.vars.to === ClipRect.LEFT) {
      c.right = s.width;
      c.bottom = s.height;
      c.left = s.width;

      if (end) {
        c.left = 0;
      }
    }

    if (this.vars.from === ClipRect.LEFT && this.vars.to === ClipRect.RIGHT) {
      c.bottom = s.height;

      if (end) {
        c.right = s.width;
      }
    }

    return 'rect(' + c.top + 'px ' + c.right + 'px ' + c.bottom + 'px ' + c.left + 'px)';
  };

  ClipRect.prototype.prepare = function() {
    TweenLite.set(this.el, { clip: this.getRect() });
  };

  ClipRect.prototype.tween = function() {
    var _this = this;

    return TweenLite.to({}, this.vars.duration, {
      onUpdate: function() {
        // Using onUpdate because onStart
        // is not called if the tween is 0 duration.
        if (this.isStarted) {
          return;
        }

        this.isStarted = true;
        this.prepare();

        TweenLite.to(this.el, this.vars.duration, {
          ease: this.vars.ease,
          clip: this.getRect(true),
          immediateRender: true,
          onComplete: function() {
            this.vars.clearProps && this.clear();
          },
          onCompleteScope: this
        });
      },
      onUpdateScope: _this,
    });
  };

  ClipRect.prototype.clear = function() {
    TweenLite.set(this.el, { clearProps: 'clip' });
  };

  return ClipRect;
}));
