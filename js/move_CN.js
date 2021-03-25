jQuery(document).ready(function ($) {

  // homeclick
  $('.home-menu').click(function () {
   window.location.hash = '#Main-container';
   $('#Main-container').load('parts_CN/home.html');
 });
 //about click
 $('.about-menu').click(function () {
   window.scrollTo(0, 0);
   $('#Main-container').load('parts_CN/about.html');    
 });
  //contact menu
  $('.contact-menu').click(function () {
   window.scrollTo(0, 0);
   $('#Main-container').load('parts_CN/contact.html');
 });
 //galllery menu - magazyn
 $('.gallery-mag-menu').click(function () {
   window.scrollTo(0, 0);
   $('#Main-container').load('PART_GALLERY/gallery_mag.html');
 });
 //certificatesz menu
 $('.certificates-menu').click(function () {
   window.scrollTo(0, 0);
   $('#Main-container').load('parts_CN/certificates.html');
 });
 
 //products menu
 $('.products-menu').click(function () {
   window.scrollTo(0, 0);
   $('#Main-container').load('parts_CN/products.html');
 });
 
 });
 