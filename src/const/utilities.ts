export const loadScripts = (dynamicScripts: string[]) => {
  let isFound = false;
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; ++i) {
    if (
      scripts[i].getAttribute('src') != null &&
      scripts[i].getAttribute('src')?.includes('loader')
    ) {
      isFound = true;
    }
  }

  if (!isFound) {
    for (const script of dynamicScripts) {
      const node = document.createElement('script');
      node.src = script;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
};
