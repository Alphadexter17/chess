$(document).ready(function() {
    $(".header").click(function() {
      // Toggle the content of the clicked section
      $(this).next(".content").slideToggle();
  
      // Optionally, close other open sections
      $(".content").not($(this).next()).slideUp();
    });
  });