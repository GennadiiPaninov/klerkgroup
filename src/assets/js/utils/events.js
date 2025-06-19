
(function () {
  const throttle = (type, name, obj) => {
    obj = obj || window;
    let running = false;

    const handler = () => {
      if (running) return;

      running = true;

      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    
    obj.addEventListener(type, handler);
  };

  throttle("resize", "optimizedResize");
})();
