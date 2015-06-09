# CssLoader
### A media query & url driven async CSS loader
***
#### Browser Support

CssLoader depends on the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
) web API. Polyfill support can be found from [Paul Irish et al](https://github.com/paulirish/matchMedia.js/). If the matchMedia API is completely unavailable CssLoader will load all stylesheets on page load. 

#### Usage

All stylesheets will be added to the DOM in the order of the array passed to the require method.

````
CssLoader.require([
  		{
  			id : 'file1',
  			media : '(min-width: 0px)',
  			href : 'resources/core.css',
  			url  : '/test/'
  		},
  		{
  			id : 'file2',
  			media : '(min-width: 0px) and (max-width: 499px)',
  			href : 'resources/medium.css',
  			url : '/test/'
  		},
  		{
  			id : 'file3',
  			media : '(min-width: 500px) and (max-width: 999px)',
  			href : 'resources/product-detail-page-large.css',
  			url : '/productdetailpage'
  		},
  		{
  			id : 'file4',
  			media : '(min-width: 1000px)',
  			href : 'resources/product-detail-page-wide.css',
  			url : '/productdetailpage'
  		}
], { hashChange : false });
````