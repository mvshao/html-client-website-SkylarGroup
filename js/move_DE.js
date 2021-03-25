jQuery(document).ready(function ($) {

 // homeclick
 $('.home-menu').click(function () {
  window.location.hash = '#Main-container';
  $('#Main-container').load('parts_DE/home.html');
});
//about click
$('.about-menu').click(function () {
  window.scrollTo(0, 0);
  $('#Main-container').load('parts_DE/about.html');    
});
 //contact menu
 $('.contact-menu').click(function () {
  window.scrollTo(0, 0);
  $('#Main-container').load('parts_DE/contact.html');
});
//galllery menu - magazyn
$('.gallery-mag-menu').click(function () {
  window.scrollTo(0, 0);
  $('#Main-container').load('PART_GALLERY/gallery_mag.html');
});
//certificatesz menu
$('.certificates-menu').click(function () {
  window.scrollTo(0, 0);
  $('#Main-container').load('parts_DE/certificates.html');
});

//products menu
$('.products-menu').click(function () {
  window.scrollTo(0, 0);
  $('#Main-container').load('parts_DE/products.html');
});

});
