module.exports = {
  rules: {
    'enforce-locale-links': {
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'Link') {
              const hrefAttribute = node.attributes.find(
                attr => attr.name && attr.name.name === 'href'
              );
              
              if (
                hrefAttribute && 
                hrefAttribute.value && 
                hrefAttribute.value.type === 'Literal'
              ) {
                const href = hrefAttribute.value.value;
                
                // Si c'est un lien interne sans locale
                if (
                  typeof href === 'string' &&
                  href.startsWith('/') &&
                  !/^\/[a-z]{2}\//.test(href) &&
                  !href.startsWith('/#') &&
                  href !== '/'
                ) {
                  context.report({
                    node: hrefAttribute,
                    message: 'Les liens internes doivent utiliser LocaleLink ou inclure la locale'
                  });
                }
              }
            }
          }
        };
      }
    }
  }
};