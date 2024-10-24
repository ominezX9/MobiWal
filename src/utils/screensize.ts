function isMobile() {
    const width = window.innerWidth;
  
    if (width <= 767) {
      return 'phone';
    } else if (width >= 768 && width <= 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
}
export const deviceType = isMobile();

  